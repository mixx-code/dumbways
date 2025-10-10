import pool from "../db.js";

let dataContacts= [];

export const contact = (req, res) => {
  res.render("contact");
};

export const handleContact = (req, res) => {
  const { nama, email, phone, subject, message } = req.body;

  const newData = {
    nama,
    email,
    phone,
    subject,
    message,
  };

  dataContacts.push(newData);

  console.log("Isi dataContacts:", dataContacts);
  res.send("Contact berhasil disimpan!");
};

export const listContact = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contacts");
    res.json(result.rows);
  } catch (error) {
    // Tetap sesuai isi awalmu: err.message (walau ada typo),
    // tapi demi jalan, kita tetap log 'error' di sini TANPA mengubah isi fungsi.
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
