const themeToggle = document.getElementById(
  "theme-toggle",
) as HTMLInputElement | null;

// Sync checkbox state with current document class on page load
if (themeToggle) {
  themeToggle.checked = document.documentElement.classList.contains("dark");

  // Listen for changes and update localStorage
  themeToggle.addEventListener("change", () => {
    const isDark = themeToggle.checked;
    document.documentElement.classList.toggle("dark", isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}
