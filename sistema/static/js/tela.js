document.addEventListener("DOMContentLoaded", () => {

    /* ============================================================
       1. Entrada suave dos cards
    ============================================================ */
    const cards = document.querySelectorAll(".action-card, .data-card");
    cards.forEach((card, index) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity .5s ease, transform .5s ease";

        setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
        }, 150 * index);
    });

    /* ============================================================
       2. Notificação flutuante (fechar manual + auto fechar)
    ============================================================ */
    const notification = document.querySelector(".floating-notification");
    const notificationClose = document.querySelector(".notification-close");

    if (notification && notificationClose) {
        notificationClose.addEventListener("click", () => {
            notification.classList.remove("show");
        });

        // Auto-fecha após 5s
        setTimeout(() => {
            notification.classList.remove("show");
        }, 5000);
    }

    /* ============================================================
       3. Tema Claro / Escuro (com persistência no localStorage)
    ============================================================ */
    const themeToggle = document.querySelector(".theme-toggle");

    function applyTheme(theme) {
        const icon = themeToggle.querySelector("i");
        document.body.classList.toggle("dark-theme", theme === "dark");

        if (theme === "dark") {
            icon.classList.replace("fa-moon", "fa-sun");
        } else {
            icon.classList.replace("fa-sun", "fa-moon");
        }
    }

    if (themeToggle) {
        // Aplicar tema salvo
        const savedTheme = localStorage.getItem("theme") || "light";
        applyTheme(savedTheme);

        themeToggle.addEventListener("click", () => {
            const newTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
            localStorage.setItem("theme", newTheme);
            applyTheme(newTheme);
        });
    }

    /* ============================================================
       4. Animação das barras de progresso
    ============================================================ */
    const progressBars = document.querySelectorAll(".progress-bar");

    progressBars.forEach(bar => {
        const finalWidth = bar.style.width.replace("%", "") || 0;
        bar.style.width = "0%";

        setTimeout(() => {
            bar.style.width = finalWidth + "%";
        }, 400);
    });

    /* ============================================================
       5. Tornar item clicável (lista de planos)
    ============================================================ */
    document.querySelectorAll(".plan-item").forEach(item => {
        item.addEventListener("click", e => {
            if (e.target.tagName !== "A") {
                item.querySelector("a")?.click();
            }
        });
    });

    /* ============================================================
       6. Atualização dinâmica dos números (simulação)
    ============================================================ */
    function updateDashboardData() {
        const counters = document.querySelectorAll(".card-value");

        counters.forEach(counter => {
            const current = parseInt(counter.textContent.trim());

            if (!isNaN(current)) {
                const newValue = current + Math.floor(Math.random() * 2);
                counter.textContent = newValue;

                // Animação de crescimento
                counter.style.transition = "transform .3s ease";
                counter.style.transform = "scale(1.15)";
                setTimeout(() => counter.style.transform = "scale(1)", 250);
            }
        });
    }

    setInterval(updateDashboardData, 30000);

    /* ============================================================
       7. CSRF Token para AJAX
    ============================================================ */
    window.getCSRFToken = () => {
        return document.querySelector("[name=csrfmiddlewaretoken]")?.value || "";
    };

    /* ============================================================
       8. Exemplo de Favoritar (para backend futuro)
    ============================================================ */
    window.toggleFavorito = planoId => {
        console.log(`Alternando favorito do plano ${planoId}...`);
        // AJAX futuro entra aqui
    };
});
