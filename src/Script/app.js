// Menú móvil
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => navLinks.classList.remove("open"));
});

// Animación de contadores en la sección de estadísticas
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animarContador(el) {
  const target = parseInt(el.dataset.target, 10);

  if (prefersReducedMotion) {
    el.textContent = target;
    return;
  }

  const duracion = 1400;
  const inicio = performance.now();

  function paso(ahora) {
    const progreso = Math.min((ahora - inicio) / duracion, 1);
    const valor = Math.floor(progreso * target);
    el.textContent = valor;
    if (progreso < 1) requestAnimationFrame(paso);
    else el.textContent = target;
  }

  requestAnimationFrame(paso);
}

const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animarContador(entry.target);
        statObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll(".stat-num").forEach((el) => statObserver.observe(el));

// Formulario de agendamiento → arma un mensaje y abre WhatsApp con el texto prellenado
// IMPORTANTE: reemplazá WHATSAPP_NUMERO por el número real del gimnasio,
// en formato internacional y sin espacios ni símbolos. Ej: "5215512345678"
const WHATSAPP_NUMERO = "522212893014";

const ctaForm = document.getElementById("ctaForm");

ctaForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("ctaNombre").value.trim();
  const plan = document.getElementById("ctaPlan").value;
  const dia = document.getElementById("ctaDia").value;

  const mensaje =
    `Hola, soy ${nombre}. Me interesa el plan ${plan} ` +
    `y prefiero agendar mi evaluación para el día ${dia}.`;

  const url = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(mensaje)}`;

  window.open(url, "_blank");
});