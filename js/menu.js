document.addEventListener("DOMContentLoaded", () => {

    const nav = document.querySelector(".nav");

    const btnPerfil = document.getElementById("btnPerfil");
    const perfilMenu = document.getElementById("perfilMenu");
    const perfilOverlay = document.getElementById("perfilOverlay");
    const fecharPerfil = document.getElementById("fecharPerfil");

    // NAV COM FUNDO AO ROLAR
    if (nav) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 30) {
                nav.classList.add("scrolled");
            } else {
                nav.classList.remove("scrolled");
            }

        });

    }

    // ABRIR PERFIL
    if (btnPerfil && perfilMenu && perfilOverlay) {

        btnPerfil.addEventListener("click", (event) => {

            event.stopPropagation();

            perfilMenu.classList.toggle("ativo");
            perfilOverlay.classList.toggle("ativo");

        });

    }

    // FECHAR PERFIL
    if (fecharPerfil && perfilMenu && perfilOverlay) {

        fecharPerfil.addEventListener("click", () => {

            perfilMenu.classList.remove("ativo");
            perfilOverlay.classList.remove("ativo");

        });

    }

    // FECHAR CLICANDO FORA
    if (perfilOverlay && perfilMenu) {

        perfilOverlay.addEventListener("click", () => {

            perfilMenu.classList.remove("ativo");
            perfilOverlay.classList.remove("ativo");

        });

    }

    // IMPEDIR QUE CLIQUE DENTRO FECHE
    if (perfilMenu) {

        perfilMenu.addEventListener("click", (event) => {
            event.stopPropagation();
        });

    }

});
// ==========================================
// USUÁRIO LOGADO
// ==========================================

function atualizarMenuUsuario() {

    const usuarioSalvo = localStorage.getItem("boatourUsuario");

    const btnEntrar = document.getElementById("btnEntrar");
    const perfilLogin = document.querySelector(".perfil-login");

    const nomePerfil = document.getElementById("nomePerfil");
    const descricaoPerfil = document.getElementById("descricaoPerfil");


    // ==========================================
    // USUÁRIO NÃO ESTÁ LOGADO
    // ==========================================

    if (!usuarioSalvo) {

        if (btnEntrar) {
            btnEntrar.style.display = "";
        }

        if (perfilLogin) {
            perfilLogin.style.display = "";
        }

        if (nomePerfil) {
            nomePerfil.textContent = "Olá, viajante!";
        }

        if (descricaoPerfil) {
            descricaoPerfil.textContent = "Acesse sua conta";
        }

        return;
    }


    // ==========================================
    // USUÁRIO ESTÁ LOGADO
    // ==========================================

    const usuario = JSON.parse(usuarioSalvo);

    // Esconde "Entrar" da barra de navegação
    if (btnEntrar) {
        btnEntrar.style.display = "none";
    }

    // Esconde "Entrar na minha conta" do menu lateral
    if (perfilLogin) {
        perfilLogin.style.display = "none";
    }

    // Coloca o nome do usuário
    if (nomePerfil) {
        nomePerfil.textContent = `Olá, ${usuario.nome}!`;
    }

    if (descricaoPerfil) {
        descricaoPerfil.textContent = usuario.email;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    atualizarMenuUsuario();
});