// Mobile menu toggle + lucide icons init
(function () {
  const btn = document.getElementById("mobileMenuBtn");
  const menu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("menuIcon");
  const closeIcon = document.getElementById("closeIcon");

  function setOpen(isOpen) {
    menu.classList.toggle("hidden", !isOpen);
    menuIcon.classList.toggle("hidden", isOpen);
    closeIcon.classList.toggle("hidden", !isOpen);
  }

  let open = false;
  btn?.addEventListener("click", () => {
    open = !open;
    setOpen(open);
  });

  // Close menu on click
  document.querySelectorAll("#mobileMenu a").forEach((a) => {
    a.addEventListener("click", () => {
      open = false;
      setOpen(open);
    });
  });

  // Render lucide icons
  if (window.lucide?.createIcons) {
    window.lucide.createIcons();
  }
})();
