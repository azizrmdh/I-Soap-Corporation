// Smooth Scroll for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Form Submission Alert
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Thank you for contacting us! We will get back to you soon.');
    this.reset();
});

// Validasi Formulir
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    form.addEventListener("submit", (e) => {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
  
      if (!name || !email || !message) {
        e.preventDefault(); // Mencegah pengiriman formulir
        alert("Harap isi semua kolom sebelum mengirim pesan!");
      } else if (!validateEmail(email)) {
        e.preventDefault();
        alert("Harap masukkan alamat email yang valid!");
      }
    });
  
    // Fungsi validasi email
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }
  });

  // Tambahkan konfirmasi pada tombol Order
document.addEventListener("DOMContentLoaded", () => {
    const orderButtons = document.querySelectorAll(".btn-success");
  
    orderButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        alert("Pesanan Anda telah diterima! Kami akan segera menghubungi Anda.");
      });
    });
  });
  
  // Tambahkan efek hover untuk gambar produk
document.addEventListener("DOMContentLoaded", () => {
    const productImages = document.querySelectorAll(".card-img-top");
  
    productImages.forEach((img) => {
      img.addEventListener("mouseover", () => {
        img.style.transform = "scale(1.1)";
        img.style.transition = "transform 0.3s ease";
      });
  
      img.addEventListener("mouseout", () => {
        img.style.transform = "scale(1)";
      });
    });
  });
  