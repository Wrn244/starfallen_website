const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const menuButton = document.querySelector("[data-menu-button]");
const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function setHeaderState() {
  header.classList.toggle("scrolled", window.scrollY > 18);
}

function closeMenu() {
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuButton.setAttribute("aria-expanded", "false");
}

menuButton.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  },
  { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
);

sections.forEach((section) => sectionObserver.observe(section));

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();

const tabButtons = Array.from(document.querySelectorAll("[data-tab]"));
const tabPanels = Array.from(document.querySelectorAll("[data-panel]"));

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const target = button.dataset.tab;

    tabButtons.forEach((tab) => {
      const isActive = tab === button;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    tabPanels.forEach((panel) => {
      const isActive = panel.dataset.panel === target;
      panel.classList.toggle("active", isActive);
      panel.hidden = !isActive;
    });
  });
});

const form = document.querySelector("[data-contact-form]");
const formStatus = document.querySelector("[data-form-status]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const name = data.get("name").trim();
  const email = data.get("email").trim();
  const message = data.get("message").trim();
  const subject = encodeURIComponent(`Message for Will Starfallen from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);

  formStatus.textContent = "Opening your email app...";
  window.location.href = `mailto:will.starfallen@gmail.com?subject=${subject}&body=${body}`;
});
