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
    icon.textContent = "🌙 Dark Mode";
  } else {
    body.className = "theme-light";
    icon.textContent = "🌞 Light Mode";
  }

  setCookie("theme", theme, 365);
}

function toggleTheme() {
  const current = getCookie("theme") || "light";
  const next = current === "light" ? "dark" : "light";
  applyTheme(next);
}

(function () {
  const saved = getCookie("theme");
  applyTheme(saved || "light");
})();