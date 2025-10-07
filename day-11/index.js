// const express = require("express");
import express from "express";
import multer from "multer";
import pool from "./db.js";


const upload = multer({ dest: "uploads/" });

const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", "src/views");

app.use(express.urlencoded({extended: false}))

app.use("/assets", express.static("src/assets"));
app.use("/uploads", express.static("uploads"));



app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

// state
let myProjects = [];
let dataContacts = [];

const home = (req, res) => {
  const datas = {
    nama: "rizki febriansyah",
    desk: "Saya adalah lulusan Program Studi Informatika Universitas Pamulang yang memiliki ketertarikan besar dalam dunia teknologi, khususnya di bidang pengembangan perangkat lunak, kecerdasan buatan, serta sistem berbasis web dan mobile. Selama menempuh pendidikan, saya membekali diri dengan berbagai keterampilan teknis, mulai dari pemrograman, pengelolaan basis data, pengembangan aplikasi, hingga penerapan metode deep learning. Dengan landasan akademik yang kuat dan pengalaman praktis dalam mengasah kemampuan, saya siap berkontribusi dalam menghadirkan solusi digital yang inovatif, efisien, dan relevan dengan kebutuhan masyarakat maupun industri.",
    job: "Fullstack Developer",
    title: "day 8  intro expressjs",
  };
  res.render("index", datas);
}

const detailProject = (req, res) => {
  res.render("detailProject");
};


// kumpulan fungsi untuk contact
const contact = (req, res) => {
  res.render("contact");  
}
const handleContact = (req, res) => {
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

// kumpulan fungsi untuk myProjects
const myProject = (req, res) => {
  res.render("myProject", { myProjects });
};

const handleAddProject = (req, res) => {
  const { projectName, startDate, endDate, description } = req.body;
  const techInput = req.body.checkbox;
  const techs = Array.isArray(techInput)
    ? techInput
    : techInput
    ? [techInput]
    : [];

  const file = req.file;
  if (!file) {
    return res.status(400).send("Gambar wajib diupload (field name: 'image').");
  }

  const project = {
    id: Date.now(),
    projectName,
    startDate,
    endDate,
    description,
    techs,
    imageUrl: `/uploads/${file.filename}`,
  };

  myProjects.push(project);

  return res.redirect("/myProject");
};


// coba select contacts

const listContact = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM contacts")
    res.json(result.rows)
  } catch (error) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}

//kumpulan route yang saya punya

//route home
app.get("/home", home);

//route contact
app.get("/contact", contact);
app.post("/contact", handleContact)

//route detailProject
app.get("/detailProject", detailProject);

//route myProject
app.get("/myProject", myProject);
app.post("/myProject", upload.single("image"), handleAddProject);

app.get('/listContacts', listContact)
