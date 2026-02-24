const menu = document.getElementById("mobileMenu");
const menuToggleBtn = document.getElementById("menuToggleBtn");
const menuCloseBtn = document.getElementById("menuCloseBtn");
const mobileMenuLinks = menu.querySelectorAll("a");

function openMenu() {
  menu.classList.add("is-open");
  menu.setAttribute("aria-hidden", "false");
  menuToggleBtn.setAttribute("aria-expanded", "true");
  document.body.classList.add("no-scroll");
}

function closeMenu() {
  menu.classList.remove("is-open");
  menu.setAttribute("aria-hidden", "true");
  menuToggleBtn.setAttribute("aria-expanded", "false");
  document.body.classList.remove("no-scroll");
}

menuToggleBtn.addEventListener("click", openMenu);
menuCloseBtn.addEventListener("click", closeMenu);

mobileMenuLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

console.log("Beethreads navbar setup is ready.");

// Page fade-in and typing effect for hero heading
document.addEventListener('DOMContentLoaded', () => {
  // Fade-in
  requestAnimationFrame(() => document.body.classList.add('is-loaded'));

  // Typing effect
  const target = document.getElementById('typed');
  if (target) {
    const text = 'hello, welcome!';
    const speed = 120; // ms per char (not too fast)
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        target.textContent += text.charAt(i);
        i += 1;
        setTimeout(typeChar, speed);
      }
    }
    // small delay before starting so fade-in is visible
    setTimeout(typeChar, 350);
  }

  const ideaForm = document.getElementById("ideaForm");
  const ideaMessage = document.getElementById("ideaMessage");
  if (ideaForm && ideaMessage) {
    ideaForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const message = ideaMessage.value.trim();
      if (!message) {
        ideaMessage.focus();
        return;
      }

      const recipient = ideaForm.dataset.recipient || "vhinamaypalomar@gmail.com";
      const subject = encodeURIComponent("New idea from Beethreads website");
      const body = encodeURIComponent(message);
      const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${subject}&body=${body}`;
      window.open(gmailComposeUrl, "_blank", "noopener,noreferrer");
      ideaMessage.value = "";
    });
  }

  const lightboxTargets = document.querySelectorAll(".js-lightbox-image");
  if (lightboxTargets.length > 0) {
    const lightbox = document.createElement("div");
    lightbox.className = "image-lightbox";
    lightbox.setAttribute("aria-hidden", "true");
    lightbox.innerHTML = `
      <button type="button" class="image-lightbox-close" aria-label="Close image preview">&times;</button>
      <img class="image-lightbox-img" alt="">
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector(".image-lightbox-img");
    const closeButton = lightbox.querySelector(".image-lightbox-close");

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.removeAttribute("src");
      lightboxImg.removeAttribute("alt");
    }

    function openLightbox(src, altText) {
      lightboxImg.src = src;
      lightboxImg.alt = altText || "Expanded product image";
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
    }

    lightboxTargets.forEach((image) => {
      image.addEventListener("click", () => {
        openLightbox(image.currentSrc || image.src, image.alt);
      });
    });

    closeButton.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && lightbox.classList.contains("is-open")) {
        closeLightbox();
      }
    });
  }
});
