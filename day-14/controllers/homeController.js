export const home = (req, res) => {
  
  
  // res.render("index", datas);

  if (req.session.user) {
    const { nama, imageUrl } = req.session.user;
    const datas = {
      nama: nama,
      desk: "Saya adalah lulusan Program Studi Informatika Universitas Pamulang yang memiliki ketertarikan besar dalam dunia teknologi, khususnya di bidang pengembangan perangkat lunak, kecerdasan buatan, serta sistem berbasis web dan mobile. Selama menempuh pendidikan, saya membekali diri dengan berbagai keterampilan teknis, mulai dari pemrograman, pengelolaan basis data, pengembangan aplikasi, hingga penerapan metode deep learning. Dengan landasan akademik yang kuat dan pengalaman praktis dalam mengasah kemampuan, saya siap berkontribusi dalam menghadirkan solusi digital yang inovatif, efisien, dan relevan dengan kebutuhan masyarakat maupun industri.",
      job: "Fullstack Developer",
      title: "day 8  intro expressjs",
      imageUrl: imageUrl,
    };
     res.render("index", datas);
  } else {
    const datas = {
      nama: "rizki febriansyah",
      desk: "Saya adalah lulusan Program Studi Informatika Universitas Pamulang yang memiliki ketertarikan besar dalam dunia teknologi, khususnya di bidang pengembangan perangkat lunak, kecerdasan buatan, serta sistem berbasis web dan mobile. Selama menempuh pendidikan, saya membekali diri dengan berbagai keterampilan teknis, mulai dari pemrograman, pengelolaan basis data, pengembangan aplikasi, hingga penerapan metode deep learning. Dengan landasan akademik yang kuat dan pengalaman praktis dalam mengasah kemampuan, saya siap berkontribusi dalam menghadirkan solusi digital yang inovatif, efisien, dan relevan dengan kebutuhan masyarakat maupun industri.",
      job: "Fullstack Developer",
      title: "day 8  intro expressjs",
      imageUrl: "https://placehold.co/400x600",
    };
    res.render("index", datas);
  }
};

