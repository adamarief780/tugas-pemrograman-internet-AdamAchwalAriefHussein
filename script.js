document.addEventListener("DOMContentLoaded", () => {

    // ----------------------------------------------------
    // 1. FITUR GREETING BERDASARKAN WAKTU (Sesuai Request)
    // Pagi: 04.00 - 10.00
    // Siang: 10.00 - 15.00
    // Sore: 15.00 - 18.00
    // Malam: 18.00 - 04.00
    // ----------------------------------------------------
    const greetingElement = document.getElementById("greeting");
    if (greetingElement) {
        const hour = new Date().getHours();
        let timeGreeting = "";
        
        if (hour >= 4 && hour < 10) {
            timeGreeting = "Selamat Pagi! 🌅";
        } else if (hour >= 10 && hour < 15) {
            timeGreeting = "Selamat Siang! ☀️";
        } else if (hour >= 15 && hour < 18) {
            timeGreeting = "Selamat Sore! 🌇";
        } else {
            timeGreeting = "Selamat Malam! 🌙";
        }
        
        greetingElement.textContent = timeGreeting;
    }

    // ----------------------------------------------------
    // 2. FITUR TOMBOL DARK MODE / LIGHT MODE (Local Storage)
    // ----------------------------------------------------
    const themeBtn = document.getElementById("theme-toggle");
    
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        if (themeBtn) themeBtn.textContent = "☀️ Mode Terang";
    }

    if (themeBtn) {
        themeBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            if (document.body.classList.contains("dark-mode")) {
                themeBtn.textContent = "☀️ Mode Terang";
                localStorage.setItem("theme", "dark");
            } else {
                themeBtn.textContent = "🌙 Mode Gelap";
                localStorage.setItem("theme", "light");
            }
        });
    }

    // ----------------------------------------------------
    // 3. FITUR VALIDASI & PENGIRIMAN FORM KONTAK KE EMAIL
    // ----------------------------------------------------
    const contactForm = document.getElementById("contact-form");
    const formStatus = document.getElementById("form-status");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", async (e) => {
            // Cek apakah form menggunakan Action Formspree asli atau masih placeholder
            if (contactForm.action.includes("KODE_FORM_ANDA")) {
                e.preventDefault();
                formStatus.style.color = "#ff4d4d";
                formStatus.textContent = "⚠️ Harap atur link Formspree di atribut 'action' pada file HTML terlebih dahulu agar email bisa terkirim.";
                return;
            }

            e.preventDefault();
            
            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || message === "") {
                formStatus.style.color = "#ff4d4d";
                formStatus.textContent = "⚠️ Validasi Gagal: Harap isi semua kolom formulir!";
                return;
            }

            formStatus.style.color = "#88c0d0";
            formStatus.textContent = "⏳ Sedang mengirim pesan ke email...";

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.style.color = "#28a745";
                    formStatus.textContent = `✅ Pesan Terkirim! Terima kasih ${name}, pesan Anda berhasil masuk ke email saya.`;
                    contactForm.reset();
                } else {
                    formStatus.style.color = "#ff4d4d";
                    formStatus.textContent = "❌ Gagal mengirim pesan. Silakan coba beberapa saat lagi.";
                }
            } catch (error) {
                formStatus.style.color = "#ff4d4d";
                formStatus.textContent = "❌ Terjadi kesalahan jaringan. Periksa koneksi internet Anda.";
            }
        });
    }

    // ----------------------------------------------------
    // 4. FITUR ANIMASI SEDERHANA SAAT TOMBOL DIKLIK
    // ----------------------------------------------------
    const interactiveButtons = document.querySelectorAll("button, .btn, .btn-next");
    interactiveButtons.forEach(button => {
        button.addEventListener("click", () => {
            button.style.transform = "scale(0.92)";
            button.style.transition = "transform 0.1s ease";
            setTimeout(() => {
                button.style.transform = "scale(1)";
            }, 120);
        });
    });

});