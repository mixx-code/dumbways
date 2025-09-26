const datas = [
  {
    img: '../assets/project.jpeg',
    title: 'belajar bootstrap',
    desk: 'Bootstrap bikin kita gampang nyusun tampilan web. Tinggal pakai class bawaan, udah rapi dan responsif.',
    tech: '<i class="fa-brands fa-bootstrap"></i>',
    durasi: '3 bulan',
  },
  {
    img: '../assets/project.jpeg',
    title: 'belajar javascript',
    desk: 'Javascript itu kunci biar web bisa interaktif. Mulai dari ngatur tombol, animasi, sampe koneksi ke server.',
    tech: '<i class="fa-brands fa-square-js"></i>',
    durasi: '6 bulan',
  },
  {
    img: '../assets/project.jpeg',
    title: 'belajar react',
    desk: 'React enak banget buat bikin komponen yang bisa dipakai ulang. Jadi lebih cepat ngerjain project front-end.',
    tech: '<i class="fa-brands fa-react"></i>',
    durasi: '2 bulan',
  },
  {
    img: '../assets/project.jpeg',
    title: 'belajar nodejs',
    desk: 'Kalau udah paham Node.js, kita bisa bikin backend sendiri. Cocok buat bikin API atau aplikasi real-time.',
    tech: '<i class="fa-brands fa-node-js"></i>',
    durasi: '1 bulan',
  },
];

const conatiner = document.getElementById("card-container");

datas.forEach((data) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.style.width = "18rem";
  card.innerHTML = `
        <img src="${data.img}"  height="200px" class="card-img-top object-fit-cover" alt="foto project">
        <div class="card-body">
            <a href="detailProject.html" class="card-title text-capitalize fs-3 fw-bold link-underline link-underline-opacity-0">${data.title}</a>
            <p class="card-subtitle mb-2 text-muted fs-6">Durasi : ${data.durasi}</p>
            <p class="card-text fs-6 " style="text-align: justify; min-height: 100px;">${data.desk}</p>
            <div class="mb-3 fs-4 text-secondary">
                ${data.tech}
            </div>
            <div class="d-flex gap-2">
                <a href="#" class="btn btn-warning w-50">edit</a>
                <a href="#" class="btn btn-danger w-50">delete</a>
            </div>
        </div>
    `;
  conatiner.appendChild(card);
});
