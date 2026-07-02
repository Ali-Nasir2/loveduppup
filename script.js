const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  document.body.classList.toggle("menu-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    document.body.classList.remove("menu-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
  });
});

const cleanPageUrl = () => {
  if (window.location.hash) {
    window.history.replaceState(null, document.title, `${window.location.pathname}${window.location.search}`);
  }
};

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;

    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    cleanPageUrl();
  });
});

if (window.location.hash) {
  window.history.scrollRestoration = "manual";
  cleanPageUrl();
  window.scrollTo({ top: 0, behavior: "auto" });
}

window.addEventListener("hashchange", () => {
  cleanPageUrl();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector("#year").textContent = new Date().getFullYear();

document.body.classList.add("motion-ready");

const aboutSection = document.querySelector(".about");
if (aboutSection && "IntersectionObserver" in window) {
  const aboutObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  aboutObserver.observe(aboutSection);
} else if (aboutSection) {
  aboutSection.classList.add("is-visible");
}
