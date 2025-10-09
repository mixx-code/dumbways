// controllers/projectController.js
import pool from "../db.js";


const dateID = (d) =>
  new Date(d).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const hitungHari = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const selisihMs = end - start;
    return `${selisihMs / (1000 * 60 * 60 * 24)} hari`;
};

export const myProject = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM my_projects");
    const myProjects = result.rows;

    const viewProjects = myProjects.map((data) => ({
      ...data,
      startDate: dateID(data.start_date),
      endDate: dateID(data.end_date),
    }));

    res.render("myProject", { viewProjects });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
};


export const insertProject = async (req, res) => {
  try {
    const { projectName, startDate, endDate, description } = req.body;
    const techInput = req.body.checkbox;
    const techs = Array.isArray(techInput)
      ? techInput
      : techInput
      ? [techInput]
      : [];

    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .send("Gambar wajib diupload (field name: 'image').");
    }

    const sql = `
      INSERT INTO my_projects
        (project_name, start_date, end_date, description, techs, "imageUrl")
      VALUES
        ($1, $2, $3, $4, $5::text[], $6)
      RETURNING *;
    `;

    const values = [
      projectName,
      startDate,
      endDate,
      description,
      techs,
      `/uploads/${file.filename}`,
    ];

    const result = await pool.query(sql, values);
    res.status(201).json({
      message: "User berhasil ditambahkan",
      data: result.rows[0],
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Terjadi kesalahan server" });
  }
};


export const detailProject = async (req, res) => {
  try {
    const { id } = req.params; // ambil id dari URL
    console.log("id > ", id)
    const sql = `
      SELECT id, project_name, start_date, end_date, description, techs, "imageUrl"
      FROM my_projects
      WHERE id = $1
    `;
    const { rows } = await pool.query(sql, [id]);
    console.log("isi >", rows.length)
    console.log("data >", rows)

    if (rows.length === 0) {
      return res.status(404).send("Project tidak ditemukan");
    }

    const project = rows[0];

    // format tanggal
    const projectView = {
      ...project,
      startDate: dateID(project.start_date),
      endDate: dateID(project.end_date),
      durasi: hitungHari(project.start_date, project.end_date),
    };

    res.render("detailProject", { projectView });
  } catch (error) {
    console.error("[detailProject] error:", error.message);
    res.status(500).send("Server error");
  }
};
