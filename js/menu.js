document.addEventListener("DOMContentLoaded", () => {

    const nav = document.querySelector(".nav");
    const btnPerfil = document.getElementById("btnPerfil");
    const perfilMenu = document.getElementById("perfilMenu");
    const perfilOverlay = document.getElementById("perfilOverlay");
    const fecharPerfil = document.getElementById("fecharPerfil");

    if (nav) {

        function verificarScroll() {
            if (window.scrollY > 30) {
                nav.classList.add("scrolled");
            } else {
                nav.classList.remove("scrolled");
            }
        }

        window.addEventListener("scroll", verificarScroll);
        verificarScroll();
    }

    if (btnPerfil && perfilMenu && perfilOverlay) {
        btnPerfil.addEventListener("click", (event) => {
            event.stopPropagation();
            perfilMenu.classList.toggle("ativo");
            perfilOverlay.classList.toggle("ativo");
        });
    }

    if (fecharPerfil && perfilMenu && perfilOverlay) {
        fecharPerfil.addEventListener("click", () => {
            perfilMenu.classList.remove("ativo");
            perfilOverlay.classList.remove("ativo");
        });
    }

    if (perfilOverlay && perfilMenu) {
        perfilOverlay.addEventListener("click", () => {
            perfilMenu.classList.remove("ativo");
            perfilOverlay.classList.remove("ativo");
        });
    }

    if (perfilMenu) {
        perfilMenu.addEventListener("click", (event) => {
            event.stopPropagation();

        });
    }
});