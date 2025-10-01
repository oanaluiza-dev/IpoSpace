// Scroll suave e menu ativo
const navLinks = document.querySelectorAll(".nav-link");

function setActiveLink() {
  let fromTop = window.scrollY + 70;

  navLinks.forEach((link) => {
    const section = document.querySelector(link.hash);

    if (
      section.offsetTop <= fromTop &&
      section.offsetTop + section.offsetHeight > fromTop
    ) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", setActiveLink);

// Inicializar mapa Leaflet
const map = L.map("map").setView([-24.5227, -48.6312], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// Marcadores fixos
const points = [
  {
    lat: -24.525,
    lng: -48.636,
    title: "Cachoeira do Alto",
    description: "Atração natural imperdível no PETAR.",
  },
  {
    lat: -24.5235,
    lng: -48.63,
    title: "Pousada Petar",
    description: "Hospedagem confortável na região.",
  },
];

// Adicionar marcadores
points.forEach(({ lat, lng, title, description }) => {
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(`<b>${title}</b><br>${description}`);
});

// Geolocalização do usuário
map.locate({ setView: true, maxZoom: 16 });

map.on("locationfound", (e) => {
  const radius = e.accuracy;

  L.marker(e.latlng)
    .addTo(map)
    .bindPopup("Você está aqui")
    .openPopup();

  L.circle(e.latlng, radius).addTo(map);
});

map.on("locationerror", () => {
  alert("Não foi possível obter sua localização.");
});

// Formulário (dummy)
const form = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formStatus.textContent = "Mensagem enviada! (Simulação)";
  form.reset();
  setTimeout(() => {
    formStatus.textContent = "";
  }, 4000);
});
