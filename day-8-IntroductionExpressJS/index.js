// const express = require("express");
import express from "express";

const app = express();
const port = 3000;

app.set("view engine", "hbs");
app.set("views", "src/views");

app.use("/assets", express.static("src/assets"));

//route home
app.get("/home", (req, res) => {
  const datas = {
    nama: "rizki febriansyah",
    desk: "Saya adalah lulusan Program Studi Informatika Universitas Pamulang yang memiliki ketertarikan besar dalam dunia teknologi, khususnya di bidang pengembangan perangkat lunak, kecerdasan buatan, serta sistem berbasis web dan mobile. Selama menempuh pendidikan, saya membekali diri dengan berbagai keterampilan teknis, mulai dari pemrograman, pengelolaan basis data, pengembangan aplikasi, hingga penerapan metode deep learning. Dengan landasan akademik yang kuat dan pengalaman praktis dalam mengasah kemampuan, saya siap berkontribusi dalam menghadirkan solusi digital yang inovatif, efisien, dan relevan dengan kebutuhan masyarakat maupun industri.",
    job: "Fullstack Developer",
    title: "day 8  intro expressjs"
  };
  res.render("index", datas);
});

//route contact
app.get("/contact", (req, res) => {
  res.render("contact");
});

//route detailProject
app.get("/detailProject", (req, res) => {
  res.render("detailProject");
});

//route myProject
app.get("/myProject", (req, res) => {
  res.render("myProject");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
