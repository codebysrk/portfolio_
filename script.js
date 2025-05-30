// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("mobile-menu-button");
  const closeBtn = document.getElementById("close-menu");
  const mobileMenu = document.getElementById("mobile-menu");

  // Toggle menu on hamburger button click
  menuBtn.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });

  // Close menu on close button click
  closeBtn.addEventListener("click", function () {
    mobileMenu.classList.add("hidden");
  });

  // Optional: Close menu when clicking a link inside the menu
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
});

// Smooth scrolling for all links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Dark mode toggle
const themeToggle = document.getElementById("theme-toggle-checkbox");
const mobileThemeToggle = document.getElementById("mobile-theme-toggle");

function toggleTheme(isDark) {
  if (isDark) {
    document.body.classList.add("dark");
    document.body.classList.remove("light");
  } else {
    document.body.classList.add("light");
    document.body.classList.remove("dark");
  }
}

if (themeToggle) {
  themeToggle.addEventListener("change", function () {
    toggleTheme(!this.checked);
  });
}

if (mobileThemeToggle) {
  mobileThemeToggle.addEventListener("change", function () {
    toggleTheme(!this.checked);
  });
}

// Set initial theme based on system preference
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
toggleTheme(prefersDark);
if (themeToggle) themeToggle.checked = !prefersDark;
if (mobileThemeToggle) mobileThemeToggle.checked = !prefersDark;

// Skill bar animation
const skillBars = document.querySelectorAll(".animate-skill");

function animateSkillBar(bar) {
  const width = bar.getAttribute("data-width") + "%";
  bar.style.width = "0%";
  setTimeout(() => {
    bar.style.transition = "width 1.5s ease-in-out";
    bar.style.width = width;
  }, 100);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.2,
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");

      // If it's a skill bar, animate it
      if (entry.target.classList.contains("animate-skill")) {
        animateSkillBar(entry.target);
      }

      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll(".animated-element, .animate-skill").forEach((el) => {
  observer.observe(el);
});

// Reset animations when exiting and re-entering viewport
document.addEventListener("scroll", () => {
  document.querySelectorAll(".animated-element").forEach((el) => {
    const rect = el.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (!isVisible && el.classList.contains("active")) {
      el.classList.remove("active");
      observer.observe(el);
    }
  });
});

// Blob animations
const blobs = document.querySelectorAll(".blob");

blobs.forEach((blob) => {
  blob.style.left = Math.random() * 80 + "vw";
  blob.style.top = Math.random() * 80 + "vh";
});
