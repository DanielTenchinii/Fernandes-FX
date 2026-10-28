const whatsappNumber = "5521982039900";
const contactForm = document.querySelector("#whatsapp-form");
const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

document.querySelector("#year").textContent = new Date().getFullYear();

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

const floatingWhatsapp = document.querySelector(".floating-whatsapp");
const contactSection = document.querySelector("#contato");
const updateFloatingWhatsapp = () => {
  const bounds = contactSection.getBoundingClientRect();
  const contactIsVisible = bounds.top < window.innerHeight && bounds.bottom > 0;
  floatingWhatsapp.classList.toggle("contact-form-visible", contactIsVisible);
};

window.addEventListener("scroll", updateFloatingWhatsapp, { passive: true });
window.addEventListener("resize", updateFloatingWhatsapp);
updateFloatingWhatsapp();

menuToggle.addEventListener("click", () => {
  const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isExpanded));
  menuToggle.setAttribute("aria-label", isExpanded ? "Abrir menu" : "Fechar menu");
  mainNav.classList.toggle("open", !isExpanded);
  document.body.classList.toggle("menu-open", !isExpanded);
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    mainNav.classList.remove("open");
    document.body.classList.remove("menu-open");
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!contactForm.reportValidity()) return;

  const formData = new FormData(contactForm);
  const message = [
    `Olá! Meu nome é ${formData.get("name")}.`,
    `Tenho interesse em: ${formData.get("project")}.`,
    `Sobre o projeto: ${formData.get("message")}`,
  ].join("\n");

  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
});
