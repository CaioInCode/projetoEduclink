document.addEventListener("DOMContentLoaded", () => {
    const plano = JSON.parse(localStorage.getItem("ultimoPlano"));

    if (plano) {
        document.getElementById("resumoTitulo").textContent = plano.titulo || "—";
        document.getElementById("resumoCategoria").textContent = plano.categoria || "—";
        document.getElementById("resumoObjetivos").textContent = plano.objetivos || "—";
    } else {
        console.warn("Nenhum plano encontrado no localStorage.");
    }
});