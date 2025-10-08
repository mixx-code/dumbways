export const home = (req, res) => {
  const datas = {
    nama: "rizki febriansyah",
    desk: "Saya adalah lulusan Program Studi Informatika Universitas Pamulang yang memiliki ketertarikan besar dalam dunia teknologi, khususnya di bidang pengembangan perangkat lunak, kecerdasan buatan, serta sistem berbasis web dan mobile. Selama menempuh pendidikan, saya membekali diri dengan berbagai keterampilan teknis, mulai dari pemrograman, pengelolaan basis data, pengembangan aplikasi, hingga penerapan metode deep learning. Dengan landasan akademik yang kuat dan pengalaman praktis dalam mengasah kemampuan, saya siap berkontribusi dalam menghadirkan solusi digital yang inovatif, efisien, dan relevan dengan kebutuhan masyarakat maupun industri.",
    job: "Fullstack Developer",
    title: "day 8  intro expressjs",
  };
  res.render("index", datas);
};

