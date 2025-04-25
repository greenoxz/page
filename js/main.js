function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}
function getCookie(name) {
  return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}

function applyTheme(theme) {
  const body = document.getElementById("theme-body");
  const icons = document.querySelectorAll("#theme-icon");

  if (theme === "dark") {
    body.className = "theme-dark";
    icons.forEach(icon => icon.textContent = "dark_mode");
  } else {
    body.className = "theme-light";
    icons.forEach(icon => icon.textContent = "light_mode");
  }

  setCookie("theme", theme, 365);
}

function toggleTheme() {
  const current = getCookie("theme") || "light";
  const next = current === "light" ? "dark" : "light";
  applyTheme(next);
}

function toggleMenu() {
  const menu = document.getElementById("mobile-menu");
  const isMenuOpen = menu.classList.toggle("hidden") === false;

  const iconPath = document.querySelector("#hamburger-btn svg path");
  iconPath.setAttribute(
    "d",
    isMenuOpen
      ? "M6 18L18 6M6 6l12 12"
      : "M4 6h16M4 12h16M4 18h16"
  );

  if (isMenuOpen) {
    menu.classList.remove("animate");
    void menu.offsetWidth;
    menu.classList.add("animate");
  }
}

(function () {
  const saved = getCookie("theme");
  applyTheme(saved || "light");
})();