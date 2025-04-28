function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}
function getCookie(name) {
  return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}

function applyTheme(theme) {
  const body = document.getElementById("theme-body");
  const icon = document.getElementById("theme-icon");

  if (theme === "dark") {
    body.className = "theme-dark";
    icon.className = "fa-solid fa-moon";
  } else {
    body.className = "theme-light";
    icon.className = "fa-regular fa-sun";
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
  // toggle "hidden" class and determine if menu is open (not hidden)
  const isMenuOpen = menu.classList.toggle("hidden") === false;
  // select the <path> inside the hamburger button
  const iconPath = document.querySelector("#hamburger-btn svg path");
  // set d attribute: X icon if open, hamburger if closed
  iconPath.setAttribute(
    "d",
    isMenuOpen
      ? "M6 18L18 6M6 6l12 12"
      : "M4 6h16M4 12h16M4 18h16"
  );
}

(function () {
  const saved = getCookie("theme");
  applyTheme(saved || "light");
})();