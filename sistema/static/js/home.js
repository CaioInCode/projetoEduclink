// ===========================================
// Scroll suave ao clicar nos links do menu
// ===========================================
document.querySelectorAll('a.nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===========================================
// Destacar link ativo no menu ao rolar a página
// ===========================================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

// ===========================================
// Animação de fade-in nas seções
// ===========================================
const faders = document.querySelectorAll("section, .card");

const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("fade-in");
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// ===========================================
// Botões "Saiba Mais" -> Abrem o Modal
// (AGORA SOMENTE OS QUE DEVEM ABRIR O MODAL)
// ===========================================
document.querySelectorAll(".saiba-mais-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();
        const modal = new bootstrap.Modal(document.getElementById("saibaMaisModal"));
        modal.show();
    });
});

// ===========================================
// Navbar com sombra ao rolar a página
// ===========================================
document.addEventListener("scroll", () => {
    const nav = document.querySelector(".navbar-edulink");

    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});

// ===========================================
// Alternância de Tema (Claro/Escuro)
// ===========================================
const toggleBtn = document.getElementById("themeToggle");
const icon = document.getElementById("themeIcon");

// Carrega tema salvo ou automático do sistema
function loadTheme() {
    const saved = localStorage.getItem("theme");

    if (saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        document.body.classList.add("dark-mode");
        icon.classList.replace("fa-moon", "fa-sun");
    }
}

loadTheme();

// Alternar tema no clique
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const dark = document.body.classList.contains("dark-mode");

    if (dark) {
        icon.classList.replace("fa-moon", "fa-sun");
        localStorage.setItem("theme", "dark");
    } else {
        icon.classList.replace("fa-sun", "fa-moon");
        localStorage.setItem("theme", "light");
    }
});
