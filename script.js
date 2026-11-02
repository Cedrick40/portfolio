// Responsive menu
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
navLinks.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

// Highlight current section in the nav
const sections = document.querySelectorAll("main section[id]");
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.querySelectorAll("a").forEach(a =>
        a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id)
      );
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => observer.observe(s));

// Contact form validation
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

function setError(id, msg) {
  const input = document.getElementById(id);
  document.getElementById(id + "Error").textContent = msg;
  input.closest(".field").classList.toggle("invalid", Boolean(msg));
  return !msg;
}

form.addEventListener("submit", e => {
  e.preventDefault();
  status.textContent = "";
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const results = [
    setError("name", name.length < 2 ? "Enter your name (at least 2 characters)." : ""),
    setError("email", emailOk ? "" : "Enter a valid email, like name@example.com."),
    setError("message", message.length < 10 ? "Write a message of at least 10 characters." : "")
  ];

  if (results.every(Boolean)) {
    status.textContent = "Message sent. Thank you, I'll reply soon.";
    form.reset();
  }
});

document.getElementById("year").textContent = new Date().getFullYear();