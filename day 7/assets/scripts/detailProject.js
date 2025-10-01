document.addEventListener("DOMContentLoaded", () => {
  const title = document.getElementById("title");
  const tgl = document.getElementById("tgl");
  const durasi = document.getElementById("durasi");
  const desk = document.getElementById("desk");
  const techContainer = document.getElementById("containerTech");
  const imageProject = document.getElementById("imageProject");

  const getIdProject = () => {
    const url = new URLSearchParams(window.location.search);
    const raw = url.get("id");
    const id = Number.parseInt(raw, 10);
    return id;
  };

  const getDataProjectById = (id) => {
    const dataProjects = JSON.parse(localStorage.getItem("dataProjects")) || [];
    if (id < 0 || id >= dataProjects.length) return null;
    return dataProjects[id];
  };
  console.log("dataProjects:", getDataProjectById(getIdProject()));

  const hitungHari = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const selisihMs = end - start;
    return `${selisihMs / (1000 * 60 * 60 * 24)} hari`;
  };

  const renderTechnologies = (techs = []) =>
    techs.length === 0
      ? `
        <div class="col-12">
            <p class="text-muted fs-6 mb-0">No technologies selected</p>
        </div>
        `
      : techs.map((tech) => `
        <div class="col-6">
            <div class="badge bg-light text-dark border px-3 py-2 w-100">
            ${tech}
            </div>
        </div>
        `
        ).join("");

  const renderDetailProject = (data) => {
    title.textContent = data.projectName;
    tgl.innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${data.startDate} – ${data.endDate}`;
    durasi.innerHTML = `<i class="fa-solid fa-clock"></i> ± ${hitungHari(
      data.startDate,
      data.endDate
    )}`;
    desk.textContent = data.description;
    imageProject.src = data.imageBase64 || "https://placehold.co/600x400?text=No+Image";
    techContainer.innerHTML = renderTechnologies(data.technologies);
  };

  const id = getIdProject();
  const project = getDataProjectById(id);

  if (!project) {
    title.textContent = "Project tidak ditemukan";
    tgl.innerHTML = `<i class="fa-solid fa-calendar-days"></i> —`;
    durasi.innerHTML = `<i class="fa-solid fa-clock"></i> ± — hari`;
    desk.textContent = "Parameter id tidak valid atau project tidak tersedia.";
    techContainer.innerHTML = `
      <div class="col-12">
        <p class="text-muted fs-6 mb-0">—</p>
      </div>
    `;
    imageProject.src = "https://placehold.co/600x400?text=Not+Found";
    return;
  }

  console.log("Project:", project);
  renderDetailProject(project);
});
