/**
 * components.js
 * โหลด nav.html และ footer.html ที่ใช้ร่วมกันทุกหน้า
 * แก้ nav หรือ footer → แก้แค่ nav.html / footer.html ไฟล์เดียวพอ
 */
(function () {
  // --- โหลด Nav ---
  const navEl = document.getElementById('navbar-include');
  if (navEl) {
    fetch('/components/nav.html')
      .then(res => res.text())
      .then(html => {
        navEl.innerHTML = html;

        // index.html ต้องการซ่อน desktop-menu และ hamburger (หน้าแรกใช้ nav แบบ minimal)
        if (document.body.dataset.hideNavMenu === 'true') {
          const desktopMenu = document.querySelector('.desktop-menu');
          const hamburgerBtn = document.querySelector('.hamburger');
          if (desktopMenu) desktopMenu.style.display = 'none';
          if (hamburgerBtn) hamburgerBtn.style.display = 'none';
        }
      })
      .catch(err => console.warn('[components.js] Nav load failed:', err));
  }

  // --- โหลด Footer ---
  const footerEl = document.getElementById('footer-include');
  if (footerEl) {
    fetch('/components/footer.html')
      .then(res => res.text())
      .then(html => {
        footerEl.innerHTML = html;

        // อัปเดตปีปัจจุบันใน footer
        const yearElem = document.getElementById('year');
        if (yearElem) yearElem.textContent = new Date().getFullYear();
      })
      .catch(err => console.warn('[components.js] Footer load failed:', err));
  }
})();
