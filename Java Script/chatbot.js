document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.querySelector(".chatbox");
  const chatBody = document.querySelector(".chat-body");
  const chatFooter = document.querySelector(".chat-footer");
  const minimizeChat = document.getElementById("minimizeChat");
  const sendMessage = document.getElementById("sendMessage");
  const resetChat = document.getElementById("resetChat");
  const chatInput = document.getElementById("chatInput");

  // Minimize chatbox on page load
  chatBody.style.display = "none";
  chatFooter.style.display = "none";
  minimizeChat.textContent = "+"; // Set the minimize icon to '+'

  // Toggle minimize chat
  minimizeChat.addEventListener("click", () => {
    if (chatBody.style.display === "none") {
      chatBody.style.display = "block";
      chatFooter.style.display = "flex";
      minimizeChat.textContent = "−"; // Change icon to minimize
    } else {
      chatBody.style.display = "none";
      chatFooter.style.display = "none";
      minimizeChat.textContent = "+"; // Change icon to maximize
    }
  });

  // Send message when Send button is clicked
  sendMessage.addEventListener("click", () => {
    const userMessage = chatInput.value.trim();
    if (userMessage !== "") {
      addMessage("Anda", userMessage);
      const botResponse = processInput(userMessage);
      setTimeout(() => addMessage("Bot", botResponse), 500); // Respond with delay
      chatInput.value = ""; // Clear input
    }
  });

  // Add message to chat
  const addMessage = (sender, message) => {
    const msgElement = document.createElement("p");
    msgElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBody.appendChild(msgElement);
    chatBody.scrollTop = chatBody.scrollHeight; // Auto scroll to bottom
  };

  // List of keywords and synonyms for matching input
  const keywords = {
    harga: ["harga", "biaya", "berapa harga", "produk ini harganya", "harga produk"],
    order: ["order", "pesan", "cara pesan", "beli produk", "mau beli", "beli"],
    kontak: ["kontak", "hubungi", "nomor telepon", "email", "alamat", "cara menghubungi"],
    keunggulan: ["keunggulan", "kelebihan", "kenapa memilih", "mengapa memilih", "produk", "sabun", "isoap", "I soap"],
    cons: ["kerugian", "kekurangan", "apa yang kurang", "bukan kelebihan", "negatif"],
    cara_penggunaan: ["cara penggunaan", "gunakan", "cara pakai", "cara memakai", "gunakan produk"],
    manfaat: ["manfaat", "khasiat", "apa manfaat", "keuntungan", "apa khasiat"],
    pengiriman: ["pengiriman", "kirim", "ongkos kirim", "biaya pengiriman", "pengantaran", "ongkir"],
    penyimpanan: ["penyimpanan", "cara simpan", "menyimpan", "simpan produk", "simpan"],
    bahan: ["bahan", "komposisi", "apa bahan", "apa yang terkandung"],
    visi: ["apa visi", "visi perusahaan", "visi", "visinya", "apa tujuan perusahaan"],
    misi: ["apa misi", "misi perusahaan", "misi", "misinya", "apa misi perusahaan"],
    ceo: ["siapa ceo", "ceo perusahaan", "pemilik perusahaan", "siapa CEO", "ceo", "egi"],
    cfo: ["siapa cfo", "cfo perusahaan", "siapa CFO", "cfo", "fajrun"],
    cmo: ["siapa cmo", "cmo perusahaan", "siapa CMO", "cfo", "izzudin"],
    cto: ["siapa cto", "cto perusahaan", "siapa CTO", "cto", "aziz"],
    coo: ["siapa coo", "coo perusahaan", "siapa COO", "coo", "rafli"],
    latar_belakang: ["latar belakang perusahaan", "sejarah perusahaan", "tentang perusahaan", "profil perusahaan", "alamat"]
  };

  // Chatbot responses
  const responses = {
    harga: [
      "Harga produk kami mulai dari Rp25.000 hingga Rp100.000, tergantung jenis produk.",
      "I SOAP Multipurpose: Rp25.000. I SOAP Sensitive Skin: Rp50.000. I SOAP Family Pack: Rp100.000.",
    ],
    order: [
      "Anda dapat memesan melalui tombol 'Order Sekarang' di halaman ini.",
      "Klik tombol 'Order Sekarang' atau hubungi kami untuk bantuan lebih lanjut.",
    ],
    kontak: [
      "Anda dapat menghubungi kami di email hello.isoapkeren@yahoot.co.id atau telepon +62-899-7666-1000.",
      "Layanan pelanggan kami tersedia melalui WhatsApp: +62-899-7666-1000.",
    ],
    keunggulan: [
      "I SOAP menggunakan bahan alami yang aman dan ramah lingkungan.",
      "Produk kami diformulasikan dengan pH seimbang, cocok untuk semua jenis kulit, bahkan kulit sensitif.",
      "Kemasan kami ramah lingkungan dan dapat didaur ulang.",
      "I SOAP adalah sabun ramah lingkungan dan bebas residu kimia",
    ],
    cara_penggunaan: [
      "Untuk penggunaan I SOAP, cukup basahi sabun dengan air, lalu aplikasikan pada kulit atau permukaan yang ingin dibersihkan.",
      "Untuk membersihkan piring, cukup gosok sabun pada spons atau langsung pada piring, lalu bilas.",
    ],
    manfaat: [
      "I SOAP memberikan manfaat sebagai pembersih serbaguna yang ramah lingkungan dan aman digunakan pada kulit.",
      "Produk kami juga membantu menjaga keseimbangan pH kulit dan sangat cocok untuk kulit sensitif.",
    ],
    pengiriman: [
      "Biaya pengiriman produk tergantung pada lokasi Anda. Anda dapat memilih pengiriman reguler atau ekspres saat checkout.",
      "Pengiriman dilakukan setiap hari Senin hingga Jumat. Biasanya, produk sampai dalam waktu 3-5 hari kerja.",
    ],
    penyimpanan: [
      "Simpan produk di tempat yang kering dan sejuk. Hindari paparan sinar matahari langsung untuk menjaga kualitasnya.",
      "Pastikan produk disimpan dalam wadah tertutup rapat untuk menjaga kesegarannya.",
    ],
    bahan: [
      "I SOAP dibuat dengan bahan alami seperti minyak kelapa, gliserin, dan minyak esensial yang menyehatkan kulit.",
      "Kami menggunakan bahan yang dapat terurai secara alami dan ramah lingkungan untuk menjaga keberlanjutan.",
    ],
    cons: [
      "Meskipun ramah lingkungan, harga produk kami mungkin sedikit lebih tinggi dibandingkan dengan produk konvensional.",
      "Sabun kami menggunakan bahan alami, namun beberapa varian mungkin memiliki aroma yang tidak disukai oleh sebagian orang.",
      "Karena menggunakan bahan alami, umur simpan produk ini lebih pendek dibandingkan dengan produk sintetis.",
      "Produk ini tidak mengandung bahan pengawet, sehingga perlu disimpan dengan baik untuk memastikan kualitasnya tetap terjaga.",
    ],
    visi: [
      "Visi kami adalah menjadi perusahaan terdepan dalam menyediakan produk sabun serbaguna yang ramah lingkungan, berkualitas, dan efektif untuk mendukung kehidupan yang lebih sehat, praktis, dan berkelanjutan bagi seluruh lapisan masyarakat.",
    ],
    misi: [
      "Misi kami adalah berinovasi dalam menciptakan produk pembersih yang aman, efektif, dan efisien, serta mengurangi dampak negatif terhadap lingkungan.",
      "Kami ingin membuka akses yang lebih luas kepada konsumen, terutama kalangan UKM dan keluarga, agar dapat menikmati produk pembersih yang praktis, ekonomis, dan ramah lingkungan.",
    ],
    ceo: [
      "CEO perusahaan ini adalah Muhammad Egi Febrian. Beliau memimpin dengan visi dan misi untuk menghadirkan produk pembersih yang ramah lingkungan.",
    ],
    cfo: [
      "CFO perusahaan ini adalah Fajrun Habib. Beliau bertanggung jawab atas pengelolaan keuangan dan strategi jangka panjang perusahaan.",
    ],
    cmo: [
      "CMO perusahaan ini adalah Muhammad Izzudin Islam. Beliau memimpin tim pemasaran untuk mengembangkan strategi dan membangun merek I SOAP.",
    ],
    cto: [
      "CTO perusahaan ini adalah Muhammad Abdul Aziz Ramdhani. Beliau bertanggung jawab atas pengembangan teknologi dan inovasi produk kami.",
    ],
    coo: [
      "COO perusahaan ini adalah Muhammad Rafly. Beliau memastikan operasi berjalan efisien dan mendukung kesuksesan perusahaan dalam mencapai tujuannya.",
    ],
    latar_belakang: [
      "I SOAP didirikan pada Juni 2023 di Jl Jendral Sudirman No 207, Kecamatan Wanayasa, Kabupaten Ciamis. Kami hadir untuk memenuhi kebutuhan masyarakat akan produk pembersih yang ramah lingkungan dan efektif.",
      "Perusahaan kami didirikan dengan visi untuk memberikan solusi pembersihan yang aman, efisien, dan ramah lingkungan bagi semua kalangan.",
    ],
    tidak_dipahami: [
      "Maaf, saya tidak mengerti. Bisa ulangi pertanyaannya?",
      "Saya tidak yakin memahami maksud Anda. Anda dapat mencoba bertanya dengan cara lain.",
    ],
  };

  // Fungsi untuk menormalkan input pengguna
  const normalizeInput = (input) => {
    return input.toLowerCase().replace(/[^\w\s]/gi, "").trim();
  };

  // Fungsi untuk mencocokkan kata kunci dalam input
  const matchKeyword = (input) => {
    const normalizedInput = normalizeInput(input);
    for (const [key, synonyms] of Object.entries(keywords)) {
      for (const synonym of synonyms) {
        if (normalizedInput.includes(synonym)) {
          return key;
        }
      }
    }
    return null;
  };

  // Fungsi untuk memproses input pengguna
  const processInput = (input) => {
    const matchedKey = matchKeyword(input);
    if (matchedKey) {
      return getRandomResponse(responses[matchedKey]);
    }
    return getRandomResponse(responses.tidak_dipahami); // Default response
  };

  // Fungsi untuk memilih respons acak dari kategori
  const getRandomResponse = (responseArray) => {
    return responseArray[Math.floor(Math.random() * responseArray.length)];
  };

  // Reset chat
  resetChat.addEventListener("click", () => {
    chatBody.innerHTML = `<p class="text-muted">Halo! Saya asisten virtual Anda. Bagaimana kami dapat membantu?</p>`;
  });
});