document.addEventListener("DOMContentLoaded", () => {

    const btnNotificacoes = document.getElementById("btnNotificacoes");
    const modalNotificacoes = document.getElementById("modalNotificacoes");
    const fecharNotificacoes = document.getElementById("fecharNotificacoes");

    btnNotificacoes.addEventListener("click", (e) => {
        e.preventDefault();

        modalNotificacoes.classList.add("ativo");
    });

    fecharNotificacoes.addEventListener("click", () => {
        modalNotificacoes.classList.remove("ativo");
    });

    modalNotificacoes.addEventListener("click", (e) => {
        if (e.target === modalNotificacoes) {
            modalNotificacoes.classList.remove("ativo");
        }
    });

});

document.addEventListener("DOMContentLoaded", () => {

    const btnEditarPerfil =
        document.getElementById("btnEditarPerfil");

    const modalEditarPerfil =
        document.getElementById("modalEditarPerfil");

    const fecharEditarPerfil =
        document.getElementById("fecharEditarPerfil");

    const cancelarEditarPerfil =
        document.getElementById("cancelarEditarPerfil");

    const salvarEditarPerfil =
        document.getElementById("salvarEditarPerfil");

    const banners =
        document.querySelectorAll(".banner-opcao");

    const bannerPerfil =
        document.getElementById("bannerPerfil");


    /* ==============================
       ABRIR MODAL
    ============================== */

    btnEditarPerfil.addEventListener("click", () => {

        modalEditarPerfil.classList.add("ativo");

    });


    /* ==============================
       FECHAR NO X
    ============================== */

    fecharEditarPerfil.addEventListener("click", () => {

        modalEditarPerfil.classList.remove("ativo");

    });


    /* ==============================
       CANCELAR
    ============================== */

    cancelarEditarPerfil.addEventListener("click", () => {

        modalEditarPerfil.classList.remove("ativo");

    });


    /* ==============================
       CLICAR FORA
    ============================== */

    modalEditarPerfil.addEventListener("click", (e) => {

        if (e.target === modalEditarPerfil) {

            modalEditarPerfil.classList.remove("ativo");

        }

    });


    /* ==============================
       ESCOLHER BANNER
    ============================== */

    banners.forEach((banner) => {

        banner.addEventListener("click", () => {

            banners.forEach((item) => {

                item.classList.remove("ativo");

            });

            banner.classList.add("ativo");


            /* ALTERA O BANNER DO PERFIL */

            if (bannerPerfil) {

                const imagem =
                    banner.dataset.banner;

                bannerPerfil.style.backgroundImage =
                    `url("${imagem}")`;

            }

        });

    });


    /* ==============================
       SALVAR
    ============================== */

    salvarEditarPerfil.addEventListener("click", () => {

        alert("Perfil atualizado com sucesso!");

        modalEditarPerfil.classList.remove("ativo");

    });

});