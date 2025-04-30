function setCookie(name, value, days) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function getCookie(name) {
  return document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1];
}

function applyTheme(theme) {
  const body = document.getElementById("theme-body");
  const checkbox = document.getElementById("theme-toggle");
  
  body.classList.remove("theme-dark", "theme-light");
  
  if (theme === "dark") {
    body.classList.add("theme-dark");
    checkbox.checked = true;
  } else {
    body.classList.add("theme-light");
    checkbox.checked = false;
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
  const isOpen = menu.classList.toggle("show");
  menu.classList.toggle("hidden", !isOpen);
  const iconPath = document.querySelector("#hamburger-btn svg path");
  iconPath.setAttribute(
    "d",
    isOpen
      ? "M6 18L18 6M6 6l12 12"
      : "M4 6h16M4 12h16M4 18h16"
  );
  if (!isOpen) {
    setTimeout(() => menu.classList.add("hidden"), 300);
  } else {
    menu.classList.remove("hidden");
  }
}

// Initialize theme on page load
(function () {
  const savedTheme = getCookie("theme") || "light";
  applyTheme(savedTheme);
})();