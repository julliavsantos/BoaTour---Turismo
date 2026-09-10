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

    const btnEditarPerfil = document.getElementById("btnEditarPerfil");

    const modalEditarPerfil = document.getElementById("modalEditarPerfil");

    const fecharEditarPerfil = document.getElementById("fecharEditarPerfil");

    const cancelarEditarPerfil = document.getElementById("cancelarEditarPerfil");

    const salvarEditarPerfil = document.getElementById("salvarEditarPerfil");

    const banners = document.querySelectorAll(".banner-opcao");

    const bannerPerfil = document.getElementById("bannerPerfil");

    btnEditarPerfil.addEventListener("click", () => {
        modalEditarPerfil.classList.add("ativo");

    });

    fecharEditarPerfil.addEventListener("click", () => {
        modalEditarPerfil.classList.remove("ativo");

    });

    cancelarEditarPerfil.addEventListener("click", () => {
        modalEditarPerfil.classList.remove("ativo");

    });

    modalEditarPerfil.addEventListener("click", (e) => {

        if (e.target === modalEditarPerfil) {
            modalEditarPerfil.classList.remove("ativo");
        }

    });

    banners.forEach((banner) => {
        banner.addEventListener("click", () => {
            banners.forEach((item) => {
                item.classList.remove("ativo");

            });
            banner.classList.add("ativo");

            if (bannerPerfil) {
                const imagem =
                    banner.dataset.banner;
                bannerPerfil.style.backgroundImage =
                    `url("${imagem}")`;
            }
        });
    });

    salvarEditarPerfil.addEventListener("click", () => {
        alert("Perfil atualizado com sucesso!");
        modalEditarPerfil.classList.remove("ativo");
    });
});

document.addEventListener("DOMContentLoaded", () => {

    const btnSairConta = document.getElementById("btnSairConta");

    const modalSairConta = document.getElementById("modalSairConta");
    const modalSenhaSairConta = document.getElementById("modalSenhaSairConta");

    const fecharSairConta = document.getElementById("fecharSairConta");
    const fecharSenhaSairConta = document.getElementById("fecharSenhaSairConta");

    const cancelarSairConta = document.getElementById("cancelarSairConta");
    const continuarSairConta = document.getElementById("continuarSairConta");

    const senhaSairConta = document.getElementById("senhaSairConta");
    const confirmarSairConta = document.getElementById("confirmarSairConta");

    btnSairConta.addEventListener("click", (e) => {
        e.preventDefault();
        modalSairConta.classList.add("ativo");
    });

    fecharSairConta.addEventListener("click", () => {
        modalSairConta.classList.remove("ativo");

    });

    cancelarSairConta.addEventListener("click", () => {
        modalSairConta.classList.remove("ativo");
    });


    continuarSairConta.addEventListener("click", () => {

        modalSairConta.classList.remove("ativo");
        modalSenhaSairConta.classList.add("ativo");
        senhaSairConta.value = "";
        senhaSairConta.focus();

    });


    fecharSenhaSairConta.addEventListener("click", () => {

        modalSenhaSairConta.classList.remove("ativo");

    });

    confirmarSairConta.addEventListener("click", () => {
        const senhaDigitada = senhaSairConta.value;

        const senhaCorreta = "123456";

        if(senhaDigitada === senhaCorreta) {
            alert("Você saiu da sua conta!");
            modalSenhaSairConta.classList.remove("ativo");
        }else {
            alert("Senha incorreta!");
            senhaSairConta.value = "";
            senhaSairConta.focus();
        }
    });

    modalSairConta.addEventListener("click", (e) => {

        if (e.target === modalSairConta) {
            modalSairConta.classList.remove("ativo");
        }
    });

    modalSenhaSairConta.addEventListener("click", (e) => {
        if (e.target === modalSenhaSairConta) {
            modalSenhaSairConta.classList.remove("ativo");
        }
    });
});