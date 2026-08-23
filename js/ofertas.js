//FILTRO DE OFERTAS
const filtros =
    document.querySelectorAll(".filtro");

const ofertas =
    document.querySelectorAll(".card-oferta");


function filtrarOfertas(filtroSelecionado) {

    ofertas.forEach(function (oferta) {

        const categoria =
            oferta.getAttribute(
                "data-categoria"
            );

        const destaque =
            oferta.getAttribute(
                "data-destaque"
            );


        if (
            filtroSelecionado === "todas"
        ) {

            // "Todas" mostra apenas os destaques

            if (destaque === "sim") {

                oferta.style.display = "";

            } else {

                oferta.style.display = "none";

            }

        } else {

            // Categoria mostra todas daquela categoria

            if (
                categoria === filtroSelecionado
            ) {

                oferta.style.display = "";

            } else {

                oferta.style.display = "none";

            }

        }

    });

}

//CLIQUE NOS FILTROS
filtros.forEach(function (filtro) {

    filtro.addEventListener(
        "click",
        function () {

            // Remove ativo de todos
            filtros.forEach(
                function (botao) {

                    botao.classList.remove(
                        "ativo"
                    );

                }
            );

            // Ativa o clicado
            this.classList.add(
                "ativo"
            );

            // Pega categoria
            const filtroSelecionado =
                this.getAttribute(
                    "data-filtro"
                );

            // Filtra
            filtrarOfertas(
                filtroSelecionado
            );
        }
    );

});

//FILTRO INICIAL
filtrarOfertas("todas");

