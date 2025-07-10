const sidebarToggleBtns = document.querySelectorAll(".sidebar-toggle");
const sidebar = document.querySelector(".sidebar");
const searchForm = document.querySelector(".search-form");
const themeToggleBtn = document.querySelector(".theme-toggle");
const themeIcon = themeToggleBtn.querySelector(".theme-icon");
const menuLinks = document.querySelectorAll(".menu-link");

// Updates the theme icon based on current theme and sidebar state
const updateThemeIcon = () => {
  const isDark = document.body.classList.contains("dark-theme");
  themeIcon.textContent = sidebar.classList.contains("collapsed") ? (isDark ? "light_mode" : "dark_mode") : "dark_mode";
};

// Apply dark theme if saved or system prefers, then update icon
const savedTheme = localStorage.getItem("theme");
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const shouldUseDarkTheme = savedTheme === "dark" || (!savedTheme && systemPrefersDark);

document.body.classList.toggle("dark-theme", shouldUseDarkTheme);
updateThemeIcon();

// Toggle between themes on theme button click
themeToggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateThemeIcon();
});

// Toggle sidebar collapsed state on buttons click
sidebarToggleBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    sidebar.classList.toggle("collapsed");
    updateThemeIcon();
  });
});

// Expand the sidebar when the search form is clicked
searchForm.addEventListener("click", () => {
  if (sidebar.classList.contains("collapsed")) {
    sidebar.classList.remove("collapsed");
    searchForm.querySelector("input").focus();
  }
});

// Expand sidebar by default on large screens
if (window.innerWidth > 768) sidebar.classList.remove("collapsed");

// Handle content switching when clicking on menu items
const contentSections = document.querySelectorAll(".main-content");

menuLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    // Remove active class from all menu links
    menuLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");

    // Get target ID from data-target attribute
    const targetId = link.getAttribute("data-target");

    // Hide all content sections
    contentSections.forEach(section => section.classList.add("hidden"));

    // Show the selected section
    const targetSection = document.getElementById(targetId);
    if (targetSection) targetSection.classList.remove("hidden");
  });
});
