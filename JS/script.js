// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.skill-category, .project-card, .info-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'all 0.6s ease-out';
  observer.observe(el);
});

// Add interactive hover effect to project cards
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transition = 'all 0.3s ease';
  });
});

// Inicializa EmailJS
(function () {
  emailjs.init("iKdkHj5fR_nnANu4k"); // lo copias desde EmailJS dashboard
})();

document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault();

  emailjs.sendForm("service_egn3evc", "template_pr78c6d", this)
    .then(function () {
      document.getElementById("status").innerText = "✅ Mensaje enviado correctamente.";
    }, function (error) {
      document.getElementById("status").innerText = "❌ Error: " + JSON.stringify(error);
    });
});

// Open project links in a new tab when project cards are clicked
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("click", () => {
    const url = card.dataset.url;
    if (url) {
      window.open(url, "_blank");
    }
  });
});
