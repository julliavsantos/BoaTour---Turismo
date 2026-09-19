document.addEventListener("DOMContentLoaded", () => {

    const btnEntrar =
        document.getElementById("btnEntrar");

    const abrirLoginCadastro =
        document.getElementById("abrirLoginCadastro");

    const modalLogin =
        document.getElementById("modalLogin");

    const fecharLogin =
        document.getElementById("fecharLogin");

    const btnLogin =
        document.getElementById("btnLogin");

    const cpfLogin =
        document.getElementById("cpfLogin");

    const senhaLogin =
        document.getElementById("senhaLogin");


    // ==========================================
    // MODAL DE LOGIN
    // ==========================================

    if (modalLogin && fecharLogin) {

        function abrirModalLogin(e) {

            if (e) {
                e.preventDefault();
            }

            modalLogin.classList.add("ativo");
        }


        if (btnEntrar) {
            btnEntrar.addEventListener(
                "click",
                abrirModalLogin
            );
        }


        if (abrirLoginCadastro) {
            abrirLoginCadastro.addEventListener(
                "click",
                abrirModalLogin
            );
        }


        fecharLogin.addEventListener(
            "click",
            () => {
                modalLogin.classList.remove("ativo");
            }
        );


        modalLogin.addEventListener(
            "click",
            (e) => {

                if (e.target === modalLogin) {

                    modalLogin.classList.remove(
                        "ativo"
                    );

                }

            }
        );

    }


    // ==========================================
    // MENU DE PERFIL
    // ==========================================

    const btnPerfil =
        document.getElementById("btnPerfil");

    const perfilMenu =
        document.getElementById("perfilMenu");

    const perfilOverlay =
        document.getElementById("perfilOverlay");

    const fecharPerfil =
        document.getElementById("fecharPerfil");

    const abrirLoginPerfil =
        document.getElementById("abrirLoginPerfil");


    if (
        btnPerfil &&
        perfilMenu &&
        perfilOverlay
    ) {

        btnPerfil.addEventListener(
            "click",
            () => {

                perfilMenu.classList.add("ativo");

                perfilOverlay.classList.add("ativo");

            }
        );


        if (abrirLoginPerfil) {

            abrirLoginPerfil.addEventListener(
                "click",
                () => {

                    perfilMenu.classList.remove(
                        "ativo"
                    );

                    perfilOverlay.classList.remove(
                        "ativo"
                    );

                    if (modalLogin) {

                        modalLogin.classList.add(
                            "ativo"
                        );

                    }

                }
            );

        }


        if (fecharPerfil) {

            fecharPerfil.addEventListener(
                "click",
                () => {

                    perfilMenu.classList.remove(
                        "ativo"
                    );

                    perfilOverlay.classList.remove(
                        "ativo"
                    );

                }
            );

        }


        perfilOverlay.addEventListener(
            "click",
            () => {

                perfilMenu.classList.remove(
                    "ativo"
                );

                perfilOverlay.classList.remove(
                    "ativo"
                );

            }
        );

    }


    // ==========================================
    // LOGIN
    // ==========================================

    if (
        btnLogin &&
        cpfLogin &&
        senhaLogin
    ) {

        btnLogin.addEventListener(
            "click",
            () => {

                const cpf =
                    cpfLogin.value.trim();

                const senha =
                    senhaLogin.value.trim();


                if (!cpf) {

                    alert(
                        "Digite seu CPF."
                    );

                    cpfLogin.focus();

                    return;
                }


                if (cpf.length < 11) {

                    alert(
                        "Digite um CPF válido."
                    );

                    cpfLogin.focus();

                    return;
                }


                if (!senha) {

                    alert(
                        "Digite sua senha."
                    );

                    senhaLogin.focus();

                    return;
                }


                alert(
                    "Login realizado com sucesso!"
                );


                modalLogin.classList.remove(
                    "ativo"
                );

                cpfLogin.value = "";

                senhaLogin.value = "";

            }
        );

    }

});


// ==========================================
// MODAL DAS OFERTAS
// ==========================================

const modalOferta =
    document.getElementById("modalOferta");

const fecharOferta =
    document.getElementById("fecharOferta");

const modalImagemOferta =
    document.getElementById("modalImagemOferta");

const modalDesconto =
    document.getElementById("modalDesconto");

const modalTitulo =
    document.getElementById("modalTitulo");

const modalResumo =
    document.getElementById("modalResumo");

const modalDescricao =
    document.getElementById("modalDescricao");

const modalPrecoAntigo =
    document.getElementById("modalPrecoAntigo");

const modalPreco =
    document.getElementById("modalPreco");

const modalCategoria =
    document.getElementById("modalCategoria");


// ==========================================
// INFORMAÇÕES INCLUSAS NO MODAL
// ==========================================

const modalPassagem =
    document.querySelector(
        ".linha-detalhes div:nth-child(1)"
    );

const modalHospedagem =
    document.querySelector(
        ".linha-detalhes div:nth-child(2)"
    );

const modalPasseios =
    document.querySelector(
        ".linha-detalhes div:nth-child(3)"
    );

const modalDias =
    document.querySelector(
        ".linha-detalhes div:nth-child(4)"
    );

// ==========================================
// CLIQUE NOS CARDS
// ==========================================

document.addEventListener(
    "click",
    function(event) {

        // Procura o card clicado
        const card =
            event.target.closest(".card-oferta");


        // Se não clicou em um card,
        // não faz nada
        if (!card) {
            return;
        }


        // ======================================
        // PEGA AS INFORMAÇÕES DO CARD
        // ======================================

        const imagem =
            card.querySelector(
                ".imagem-oferta img"
            );

        const desconto =
            card.querySelector(
                ".desconto"
            );

        const titulo =
            card.querySelector("h3");

        const resumo =
            card.querySelector(
                ".info-oferta > p"
            );

        const precoAntigo =
            card.querySelector(
                ".preco-antigo"
            );

        const preco =
            card.querySelector(
                ".precos strong"
            );


        // ======================================
        // IMAGEM
        // ======================================

        if (imagem) {

            modalImagemOferta.src =
                imagem.src;

            modalImagemOferta.alt =
                imagem.alt;

        }


        // ======================================
        // DESCONTO
        // ======================================

        if (desconto) {

            modalDesconto.textContent =
                desconto.textContent;

        }


        // ======================================
        // TÍTULO
        // ======================================

        if (titulo) {

            modalTitulo.textContent =
                titulo.textContent;

        }


        // ======================================
        // RESUMO
        // ======================================

        if (resumo) {

            modalResumo.textContent =
                resumo.textContent;

        }


        // ======================================
        // PREÇO ANTIGO
        // ======================================

        if (precoAntigo) {

            modalPrecoAntigo.textContent =
                precoAntigo.textContent;

        }


        // ======================================
        // PREÇO ATUAL
        // ======================================

        if (preco) {

            modalPreco.textContent =
                preco.textContent;

        }


        // ======================================
        // DESCRIÇÃO
        // ======================================

        const descricao =
            card.dataset.descricao;


        if (
            descricao &&
            modalDescricao
        ) {

            modalDescricao.textContent =
                descricao;

        }


        // ======================================
        // CATEGORIA
        // ======================================

        const categoria =
            card.dataset.categoria;


        if (categoria === "nacional") {

            modalCategoria.textContent =
                "Viagem Nacional";

        }

        else if (
            categoria === "internacional"
        ) {

            modalCategoria.textContent =
                "Viagem Internacional";

        }

        else if (
            categoria === "pacote"
        ) {

            modalCategoria.textContent =
                "Pacote de Viagem";

        }

        else {

            modalCategoria.textContent =
                "Oferta";

        }


        // ======================================
        // PASSAGEM AÉREA
        // ======================================

        const passagem =
            card.dataset.passagem;


        if (modalPassagem) {

            if (passagem === "1") {

                modalPassagem.style.display =
                    "";

            }

            else {

                modalPassagem.style.display =
                    "none";

            }

        }


        // ======================================
        // HOSPEDAGEM
        // ======================================

        const hospedagem =
            card.dataset.hospedagem;


        if (modalHospedagem) {

            if (hospedagem === "1") {

                modalHospedagem.style.display =
                    "";

            }

            else {

                modalHospedagem.style.display =
                    "none";

            }

        }

// ======================================
// PASSEIOS
// ======================================

const passeios =
    card.dataset.passeios;

if (modalPasseios) {

    if (passeios === "1") {

        modalPasseios.style.display = "";

    }
    else {

        modalPasseios.style.display = "none";

    }

}
        // ======================================
        // QUANTIDADE DE DIAS
        // ======================================

        const dias =
            card.dataset.dias;


        if (modalDias) {

            const textoDias =
                modalDias.querySelector("p");


            if (textoDias) {

                textoDias.textContent =
                    dias + " dias";

            }

        }


        // ======================================
        // ABRE O MODAL
        // ======================================

        modalOferta.classList.add(
            "ativo"
        );

        document.body.style.overflow =
            "hidden";

    }
);


// ==========================================
// FECHAR PELO X
// ==========================================

if (fecharOferta) {

    fecharOferta.addEventListener(
        "click",
        function() {

            modalOferta.classList.remove(
                "ativo"
            );

            document.body.style.overflow =
                "";

        }
    );

}


// ==========================================
// FECHAR CLICANDO FORA
// ==========================================

if (modalOferta) {

    modalOferta.addEventListener(
        "click",
        function(event) {

            if (
                event.target ===
                modalOferta
            ) {

                modalOferta.classList.remove(
                    "ativo"
                );

                document.body.style.overflow =
                    "";

            }

        }
    );

}


// ==========================================
// FECHAR COM ESC
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Escape") {

            if (
                modalOferta &&
                modalOferta.classList.contains(
                    "ativo"
                )
            ) {

                modalOferta.classList.remove(
                    "ativo"
                );

                document.body.style.overflow =
                    "";

            }

        }

    }
);