import bcrypt, { hash } from "bcrypt"
import pool from "../db.js";

const hashPassword = (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds)
}

const comparePassword = (passwrod, hashPass) => {
    return bcrypt.compare(passwrod, hashPass);
}



export const login = (req, res) => {
    const msg = req.query.msg;
    const logMsg = req.query.logMsg;

    res.render('login', {msg, logMsg})
}

export const prosesLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // cek dulu email atau password kosong gak
    if (!email || !password) {
      console.error("Email / password tidak boleh kosong");
      return res.redirect("/?msg=email dan password tidak boleh kosong");
    }

    // cek user berdasarkan email
    const sql = `SELECT * FROM users WHERE email = $1`;
    const values = [email];
    const result = await pool.query(sql, values);

    if (result.rows.length === 0) {
      console.error("user tidak ditemukan");
       return res.redirect("/?msg=email atau password salah");
    }

    //simpan data user
    const user = result.rows[0];


    // bandingin password yang user masukan sama gak dengan yang di db
    const passwordValid = await comparePassword(password, user.password);
    console.log("Password valid >", passwordValid);

    if (!passwordValid) {
      console.error("Email / password salah");
      return res.redirect("/?msg=email atau password salah");
    }

    req.session.user = { id: user.id, nama: user.nama, email: user.email, imageUrl: user.imageUrl };

    // kalo berhasil login masuk ke home
    console.log("Login berhasil untuk user:", user.email);
    return res.redirect("/home");
  } catch (error) {
    console.error("Login error:", error.message);
    return res.status(500).send("Terjadi kesalahan server");
  }
};


export const register = (req, res) => {
    res.render('register')
}

export const registerUser = async(req, res) => {
    try {
        const {nama, email, password} = req.body;

        const file = req.file;
        if (!file) {
          return res
            .status(400)
            .send("Gambar wajib diupload (field name: 'image').");
        }


        //hash password dulu sebelum di insert ke database users
        const passHash = await hashPassword(password)
        const sql = `
          INSERT INTO users
              (nama, email, password, "imageUrl")
          VALUES
              ($1, $2, $3, $4)
          RETURNING *;
        `;

        //simpan values yang ingin di insert ke DB
        const values = [nama, email, passHash, `/uploads/${file.filename}`];

        //testing aja
        console.log('compare >', await comparePassword(password, passHash))

        //proses insert
        const result = await pool.query(sql, values);
        console.log("add data > ", result.rows[0])
        res.redirect("/");
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Terjadi kesalahan server" });
    }
}

export const logout = (req, res) => {
    //hapus session
    req.session.destroy();
    return res.redirect("/?logMsg=kamu berhasil logout");
}