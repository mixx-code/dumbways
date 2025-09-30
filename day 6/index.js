const formProject = document.getElementById("projectForm");

function getDataProjects() {
  console.log("getDataProjects berhasil dipanggil");
  const dataProjects = JSON.parse(localStorage.getItem("dataProjects")) || [];
  console.log("getDataProjects:", dataProjects);
  return dataProjects;
}

const rawDatas = getDataProjects();
console.log("rawDatas:", rawDatas);



function imageToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      console.log("reader.result:", reader.result);
      resolve(reader.result);
    }
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}


function hitungHari(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const selisihMs = end - start;
  return selisihMs / (1000 * 60 * 60 * 24);
}


async function saveDataProject() {
  const projectName = document.getElementById("projectName").value.trim();
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const description = document.getElementById("description").value.trim();
  const imageInput = document.getElementById("formFile");


  const tech = [];
  ["nodejs", "reactjs", "bootstrap"].forEach((id) => {
    const chackBox = document.getElementById(id);
    if (chackBox && chackBox.checked) tech.push(chackBox.value);
  });
  console.log("Technologies:", tech);


  let imageBase64 = null;
  if (imageInput.files && imageInput.files.length > 0) {
    imageBase64 = await imageToBase64(imageInput.files[0]);
  }


  const newDataProject = {
    projectName,
    startDate,
    endDate,
    description,
    technologies: tech,
    imageBase64,
  };

  console.log("Project Data:", newDataProject);


  const dataProjects = JSON.parse(localStorage.getItem("dataProjects")) || [];
  dataProjects.push(newDataProject);
  localStorage.setItem("dataProjects", JSON.stringify(dataProjects));

  alert("Data project berhasil disimpan!");
}

formProject.addEventListener("submit", saveDataProject);


const container = document.getElementById("card-container");

if (rawDatas.length === 0) {
  container.innerHTML = "<p class='fs-4'>Belum ada data project.</p>";
} else {
  rawDatas.forEach((data) => {

    let iconTach = "";
    if (data.technologies.length === 0) {
      iconTach = "<p class='text-muted fs-6'>No technologies selected</p>";
    } else {
      data.technologies.forEach((tech) => {
        iconTach += tech;
      });
    }

    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";

    card.innerHTML = `
      <img src="${data.imageBase64}" height="200px" 
           class="card-img-top object-fit-cover" alt="foto project">
      <div class="card-body">
        <a href="detailProject.html" 
           class="card-title text-capitalize fs-3 fw-bold link-underline link-underline-opacity-0">
           ${data.projectName}
        </a>
        <p class="card-subtitle mb-2 text-muted fs-6">
          Durasi : ${hitungHari(data.startDate, data.endDate)} Hari
        </p>
        <p class="card-text fs-6" 
           style="text-align: justify; min-height: 100px;">
           ${data.description}
        </p>
        <div class="mb-3 fs-4 text-secondary">
          ${iconTach}
        </div>
        <div class="d-flex gap-2">
          <a href="#" class="btn btn-warning w-50">edit</a>
          <a href="#" class="btn btn-danger w-50">delete</a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}
