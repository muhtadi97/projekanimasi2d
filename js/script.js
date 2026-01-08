/**
 * script.js - Portfolio Mukhtadi Arijuddin
 * Fitur: Intersection Observer, Typewriting Loop (with HTML support), Wave Effect, & Smart Nav.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Fungsi Reveal On Scroll (Intersection Observer) ---
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Hapus ini jika ingin animasi hanya sekali saja
                entry.target.classList.remove('active');
            }
        });
    }, revealOptions);

    document.querySelectorAll('section').forEach(section => {
        revealObserver.observe(section);
    });


    // --- 2. Typewriting Effect Loop (Support HTML & Infinite) ---
    const typewriterElement = document.getElementById('typewriter-text');
    // Teks menggunakan span untuk styling nama
    const textToType = "Blog ini dibuat untuk menampilkan hasil Project Mata Kuliah Animasi 2D. Dibuat oleh <span class='text-indigo-400 font-bold'>Mukhtadi Arijuddin</span>, Mahasiswa Teknologi Informasi Universitas Pembangunan Pancabudi.";
    
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 40;

    function typeLoop() {
        const currentFullText = textToType;
        
        if (!isDeleting) {
            // Logika loncat tag HTML saat mengetik
            if (currentFullText.charAt(charIndex) === '<') {
                charIndex = currentFullText.indexOf('>', charIndex) + 1;
            } else {
                charIndex++;
            }
            typingSpeed = 40;
        } else {
            // Logika loncat tag HTML saat menghapus
            if (currentFullText.charAt(charIndex - 1) === '>') {
                charIndex = currentFullText.lastIndexOf('<', charIndex - 1);
            } else {
                charIndex--;
            }
            typingSpeed = 20;
        }

        typewriterElement.innerHTML = currentFullText.substring(0, charIndex);

        // Pengaturan Jeda
        if (!isDeleting && charIndex === currentFullText.length) {
            // Selesai mengetik: Tunggu 5 detik sebelum menghapus
            isDeleting = true;
            typingSpeed = 5000; 
        } else if (isDeleting && charIndex === 0) {
            // Selesai menghapus: Tunggu sebentar sebelum mulai lagi
            isDeleting = false;
            typingSpeed = 500;
        }

        setTimeout(typeLoop, typingSpeed);
    }

    // Mulai Typewriter setelah delay 1 detik
    setTimeout(typeLoop, 1000);


    // --- 3. Wave Text Effect (Pecah Huruf untuk H1) ---
    const waveTexts = document.querySelectorAll('.wave-text');
    waveTexts.forEach(waveText => {
        const textContent = waveText.getAttribute('data-text') || waveText.textContent;
        waveText.innerHTML = ''; 
        
        [...textContent].forEach((char, index) => {
            const span = document.createElement('span');
            // Jika karakter spasi, gunakan non-breaking space agar lebar terjaga
            span.textContent = char === ' ' ? '\u00A0' : char;
            span.style.setProperty('--char-index', index);
            waveText.appendChild(span);
        });
    });


    // --- 4. Smart Active Link Navigation ---
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
    const navHeight = document.querySelector('nav').offsetHeight;

    function updateActiveLink() {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navHeight - 100;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-white');
            link.classList.add('text-slate-400');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('text-white');
                link.classList.remove('text-slate-400');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);


    // --- 5. Smooth Scroll Fix ---
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

});