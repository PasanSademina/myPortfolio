// Theme toggle functionality
const themeToggle = document.getElementById("themeToggle");
const themeToggleMobile = document.getElementById("themeToggleMobile");
const html = document.documentElement;

function toggleTheme() {
  html.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    html.classList.contains("dark") ? "dark" : "light"
  );
}

// Initialize theme
const savedTheme =
  localStorage.getItem("theme") ||
  (window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light");
if (savedTheme === "dark") html.classList.add("dark");

themeToggle?.addEventListener("click", toggleTheme);
themeToggleMobile?.addEventListener("click", toggleTheme);

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuBtn?.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Close mobile menu when clicking on links
mobileMenu?.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    mobileMenu.classList.add("hidden");
  }
});

// Typewriter effect
const typewriter = document.getElementById("typewriter");
const texts = [
  "Undergraduate Software Engineer",
  "Java & React Native Developer",
  "Database Management Specialist",
  "10+ Projects Delivered",
  "Problem Solver & Innovator",
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentText = texts[textIndex];

  if (isDeleting) {
    typewriter.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriter.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 100 : 150;

  if (!isDeleting && charIndex === currentText.length) {
    typeSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % texts.length;
    typeSpeed = 500;
  }

  setTimeout(type, typeSpeed);
}

type();

// Reveal animation on scroll
const revealElements = document.querySelectorAll(".reveal");

function reveal() {
  revealElements.forEach((element) => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      element.classList.add("show");
    }
  });
}

window.addEventListener("scroll", reveal);
reveal(); // Run on load

// Skill bars animation
function SkillBar(label, value) {
  const template = document.getElementById("skillbar");
  const clone = template.content.cloneNode(true);

  clone.querySelector("[data-label]").textContent = label;
  clone.querySelector("[data-value]").textContent = value + "%";

  const bar = clone.querySelector("[data-bar]");
  setTimeout(() => {
    bar.style.width = value + "%";
  }, 100);

  return clone;
}

// Initialize skill bars
document.addEventListener("DOMContentLoaded", () => {
  const skillsSection = document.querySelector("#skills");
  const skillBars = skillsSection.querySelectorAll("SkillBar");

  skillBars.forEach((skillBarElement) => {
    const label = skillBarElement.getAttribute("label");
    const value = skillBarElement.getAttribute("value");
    const skillBar = SkillBar(label, value);
    skillBarElement.parentNode.replaceChild(skillBar, skillBarElement);
  });
});

// Project filtering
const projectFilters = document.getElementById("projectFilters");
const projectCards = document.querySelectorAll(".project-card");

projectFilters?.addEventListener("click", (e) => {
  if (e.target.hasAttribute("data-filter")) {
    // Update active filter
    projectFilters.querySelectorAll("button").forEach((btn) => {
      btn.classList.remove("bg-primary", "text-white");
      btn.classList.add("border-slate-300", "dark:border-slate-600");
    });

    e.target.classList.add("bg-primary", "text-white");
    e.target.classList.remove("border-slate-300", "dark:border-slate-600");

    const filter = e.target.getAttribute("data-filter");

    projectCards.forEach((card) => {
      const tags = card.getAttribute("data-tags");
      if (filter === "all" || tags.includes(filter)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
});

// Set active filter on load
document.querySelector('[data-filter="all"]')?.click();

// Back to top button
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTop?.classList.remove("hidden");
  } else {
    backToTop?.classList.add("hidden");
  }
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Download CV functionality
const downloadCV = document.getElementById("downloadCV");
downloadCV?.addEventListener("click", () => {
  // Create a simple CV download - in production, you'd link to an actual PDF
  const link = document.createElement("a");
  link.href = "resource/Pasn Abeywardhna.pdf"; // Replace with actual CV file path
  link.download = "Pasan_Abeywardhna_CV.pdf";
  link.click();

  // For demo purposes, show an alert
  alert("CV download would start here. Please replace with actual PDF file.");
});

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

function downloadCV1() {
  // Path to your PDF file in the project folder
  const pdfPath = "resource/Pasn Abeywardhna.pdf"; // Adjust path as needed
  // Create a link element
  const a = document.createElement("a");
  a.href = pdfPath;
  a.download = "Pasn_Abeywardhna.pdf"; // Name for the downloaded file
  a.target = "_blank"; // Optional: open in new tab if direct download fails

  // Trigger the download
  document.body.appendChild(a); // Add to DOM temporarily
  a.click();
  document.body.removeChild(a); // Remove from DOM
}

// Alternative method using fetch (more robust for larger files)
