// ---------- Mobile menu ----------
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
menuToggle.addEventListener("click", () => navLinks.classList.toggle("open"));

// ---------- Theme ----------
const themeToggle = document.querySelector("#themeToggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") document.body.classList.add("light");
themeToggle.textContent = document.body.classList.contains("light") ? "☾" : "☀";
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const light = document.body.classList.contains("light");
  localStorage.setItem("theme", light ? "light" : "dark");
  themeToggle.textContent = light ? "☾" : "☀";
});

// ---------- Scroll reveal ----------
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ---------- Project modal ----------
const projects = {
  ball: {
    title: "Ball Balancing System",
    type: "Control Systems",
    text: "A feedback-control project where an Arduino measures ball position and continuously adjusts an actuator to keep the ball near the target position.",
    bullets: ["Sensor feedback loop", "PID controller tuning", "Real-time actuator control", "Mechanical + electrical integration"]
  },
  pacman: {
    title: "Pac-Man Maze",
    type: "Data Structures",
    text: "A maze-based project used to understand how stacks, graphs and depth-first search can be applied to navigation and game logic.",
    bullets: ["Stack ADT", "Depth-first search", "Maze traversal", "Game-state logic"]
  },
  gray: {
    title: "Gray Code Counter",
    type: "Digital Logic",
    text: "A synchronous 4-bit Gray Code counter designed so adjacent states differ by only one bit.",
    bullets: ["Synchronous counter design", "Gray-code sequence", "Programmable logic", "Digital timing"]
  }
};

const modal = document.querySelector("#modal");
const modalContent = document.querySelector("#modalContent");
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const p = projects[card.dataset.project];
    modalContent.innerHTML = `
      <p class="eyebrow">${p.type}</p>
      <h2>${p.title}</h2>
      <p>${p.text}</p>
      <ul>${p.bullets.map(x => `<li>${x}</li>`).join("")}</ul>
    `;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
  });
});
function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}
document.querySelector("#closeModal").addEventListener("click", closeModal);
document.querySelector(".modal-backdrop").addEventListener("click", closeModal);
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });

// ---------- Animated particles ----------
const canvas = document.createElement("canvas");
canvas.style.cssText = "position:absolute;inset:0;width:100%;height:100%";
document.querySelector("#particles").appendChild(canvas);
const ctx = canvas.getContext("2d");
let dots = [];
function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  dots = Array.from({length: Math.min(70, Math.floor(window.innerWidth / 18))}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - .5) * .25,
    vy: (Math.random() - .5) * .25,
    r: Math.random() * 1.7 + .5
  }));
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const light = document.body.classList.contains("light");
  ctx.fillStyle = light ? "rgba(70,70,100,.35)" : "rgba(150,140,255,.45)";
  dots.forEach(d => {
    d.x += d.vx; d.y += d.vy;
    if (d.x < 0 || d.x > canvas.width) d.vx *= -1;
    if (d.y < 0 || d.y > canvas.height) d.vy *= -1;
    ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
  });
  requestAnimationFrame(animate);
}
resize(); animate();
window.addEventListener("resize", resize);

// ---------- Contact form guard ----------
const form = document.querySelector("#contactForm");
form.addEventListener("submit", e => {
  if (form.action.includes("YOUR_FORM_ID")) {
    e.preventDefault();
    alert("Your design is ready! To receive messages, create a free Formspree form and replace YOUR_FORM_ID in index.html.");
  }
});
