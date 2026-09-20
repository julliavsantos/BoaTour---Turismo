document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTOS DA PÁGINA
    // ==========================================

    const ofertasGrid = document.getElementById("ofertasGrid");
    const campoBusca = document.getElementById("partida");
    const botoesFiltro = document.querySelectorAll(".filtro");

    // ==========================================
    // ELEMENTOS DO MODAL
    // ==========================================

    const modalOferta = document.getElementById("modalOferta");
    const fecharOferta = document.getElementById("fecharOferta");

    const modalImagemOferta =
        document.getElementById("modalImagemOferta");

    const modalCategoria =
        document.getElementById("modalCategoria");

    const modalTitulo =
        document.getElementById("modalTitulo");

    const modalResumo =
        document.getElementById("modalResumo");

    const modalDescricao =
        document.getElementById("modalDescricao");

    const modalPreco =
        document.getElementById("modalPreco");

    const modalDesconto =
        document.getElementById("modalDesconto");


    // ==========================================
    // VERIFICA SE EXISTE O GRID
    // ==========================================

    if (!ofertasGrid) {
        return;
    }


    // ==========================================
    // VARIÁVEIS
    // ==========================================

    let todasOfertas = [];
    let filtroAtual = "todas";
    let buscaAtual = "";


    // ==========================================
    // BUSCAR OFERTAS DO SERVIDOR
    // ==========================================

    fetch("http://localhost:3000/ofertas")

        .then(response => {

            if (!response.ok) {
                throw new Error("Erro ao buscar ofertas.");
            }

            return response.json();
        })

        .then(ofertas => {

            todasOfertas = ofertas;

            aplicarFiltros();
        })

        .catch(error => {

            console.error(
                "Erro ao carregar ofertas:",
                error
            );

            ofertasGrid.innerHTML = `
                <div class="sem-ofertas">
                    <h3>Não foi possível carregar as ofertas</h3>

                    <p>
                        Verifique se o servidor está funcionando.
                    </p>
                </div>
            `;
        });


    // ==========================================
    // NORMALIZAR TEXTO
    // ==========================================

    function normalizarTexto(texto) {

        return String(texto || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }


    // ==========================================
    // IDENTIFICAR CATEGORIA DA OFERTA
    // ==========================================

    function ofertaPertenceCategoria(oferta, filtro) {

        switch (normalizarTexto(filtro)) {

            case "nacionais":
            case "nacional":
                return Number(oferta.nacional) === 1 ||
                       oferta.nacional === true;

            case "internacionais":
            case "internacional":
                return Number(oferta.internacional) === 1 ||
                       oferta.internacional === true;

            case "pacotes":
            case "pacote":
                return Number(oferta.pacote) === 1 ||
                       oferta.pacote === true;

            default:
                return true;
        }
    }


    // ==========================================
    // APLICAR BUSCA + FILTRO
    // ==========================================

    function aplicarFiltros() {

        let resultados = todasOfertas.filter(oferta => {

            // ------------------------------
            // FILTRO POR CATEGORIA
            // ------------------------------

            const passouNoFiltro =
                ofertaPertenceCategoria(
                    oferta,
                    filtroAtual
                );


            // ------------------------------
            // BUSCA
            // ------------------------------

            const textoBusca =
                normalizarTexto(buscaAtual);

            const textoOferta =
                normalizarTexto(`
                    ${oferta.titulo || ""}
                    ${oferta.descricao || ""}
                    ${oferta.dias || ""}
                    ${oferta.quantidade_paises || ""}
                `);


            const passouNaBusca =
                textoBusca === "" ||
                textoOferta.includes(textoBusca);


            // ------------------------------
            // RESULTADO
            // ------------------------------

            return passouNoFiltro && passouNaBusca;
        });


        // ==========================================
        // LIMITE DE 8 OFERTAS
        // ==========================================

        resultados = resultados.slice(0, 8);


        renderizarOfertas(resultados);
    }


    // ==========================================
    // MOSTRAR OS CARDS
    // ==========================================

    function renderizarOfertas(ofertas) {

        ofertasGrid.innerHTML = "";


        // ==========================================
        // NENHUM RESULTADO
        // ==========================================

        if (ofertas.length === 0) {

            ofertasGrid.innerHTML = `
                <div class="sem-ofertas">

                    <h3>
                        Nenhuma oferta encontrada
                    </h3>

                    <p>
                        Tente buscar outra oferta
                        ou alterar o filtro.
                    </p>

                </div>
            `;

            return;
        }


        // ==========================================
        // CRIAR CARDS
        // ==========================================

        ofertas.forEach(oferta => {

            const card =
                document.createElement("div");

            card.classList.add("card-oferta");


            // ==================================
            // IMAGEM
            // ==================================

            const imagem =
                oferta.imagem || "";


            // ==================================
            // PREÇOS
            // ==================================

            const precoAnterior =
                Number(oferta.preco_anterior || 0);

            const precoAtual =
                Number(oferta.preco_atual || 0);


            // ==================================
            // CALCULAR DESCONTO
            // ==================================

            let desconto = 0;

            if (
                precoAnterior > 0 &&
                precoAtual > 0 &&
                precoAtual < precoAnterior
            ) {

                desconto = Math.round(
                    ((precoAnterior - precoAtual) /
                        precoAnterior) * 100
                );
            }


            // ==================================
            // CATEGORIA
            // ==================================

            let categoria = "Oferta";

            if (
                Number(oferta.pacote) === 1 ||
                oferta.pacote === true
            ) {

                categoria = "Pacote";

            } else if (
                Number(oferta.internacional) === 1 ||
                oferta.internacional === true
            ) {

                categoria = "Internacional";

            } else if (
                Number(oferta.nacional) === 1 ||
                oferta.nacional === true
            ) {

                categoria = "Nacional";
            }


            // ==================================
            // CARD
            // ==================================

            console.log("IMAGEM DO BANCO:", oferta.imagem);

            card.innerHTML = `
    <div class="imagem-oferta">

        <div class="imagem-oferta">
    <img
        src="../${oferta.imagem}"
        alt="${oferta.titulo}"
    >

    ${
        desconto > 0
            ? `
                <span class="desconto-oferta">
                    -${desconto}%
                </span>
              `
            : ""
    }
</div>

        ${
            desconto > 0
                ? `
                    <span class="desconto">
                        -${desconto}%
                    </span>
                  `
                : ""
        }

    </div>

    <div class="info-oferta">

        <h3>${oferta.titulo || "Oferta"}</h3>

        <p>
            ${oferta.dias ? `${oferta.dias} dias` : ""}
            ${oferta.passagem_aerea ? " • Voo" : ""}
            ${oferta.hospedagem ? " • Hotel" : ""}
            ${oferta.passeios ? " • Passeios" : ""}
        </p>

        <div class="precos">

            ${
                oferta.preco_anterior
                    ? `
                        <span class="preco-antigo">
                            R$ ${Number(oferta.preco_anterior).toLocaleString("pt-BR", {
                                minimumFractionDigits: 2
                            })}
                        </span>
                      `
                    : ""
            }

            <strong>
                R$ ${Number(oferta.preco_atual).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2
                })}
            </strong>

        </div>

    </div>
`;


            // ==================================
            // ABRIR MODAL
            // ==================================

            card.addEventListener("click", () => {

                abrirModalOferta(oferta);

            });


            ofertasGrid.appendChild(card);
        });
    }


    // ==========================================
    // ABRIR MODAL DA OFERTA
    // ==========================================

    function abrirModalOferta(oferta) {

        if (!modalOferta) {
            return;
        }


        // ==================================
        // IMAGEM
        // ==================================

        if (modalImagemOferta) {

            modalImagemOferta.src =
                `/img/ofertas/${oferta.imagem || ""}`;

            modalImagemOferta.alt =
                oferta.titulo || "Oferta";
        }


        // ==================================
        // CATEGORIA
        // ==================================

        if (modalCategoria) {

            if (
                Number(oferta.pacote) === 1 ||
                oferta.pacote === true
            ) {

                modalCategoria.textContent =
                    "Pacote";

            } else if (
                Number(oferta.internacional) === 1 ||
                oferta.internacional === true
            ) {

                modalCategoria.textContent =
                    "Internacional";

            } else if (
                Number(oferta.nacional) === 1 ||
                oferta.nacional === true
            ) {

                modalCategoria.textContent =
                    "Nacional";

            } else {

                modalCategoria.textContent =
                    "Oferta";
            }
        }


        // ==================================
        // TÍTULO
        // ==================================

        if (modalTitulo) {

            modalTitulo.textContent =
                oferta.titulo || "Oferta";
        }


        // ==================================
        // RESUMO
        // ==================================

        if (modalResumo) {

            let resumo = "";

            if (oferta.dias) {

                resumo +=
                    `${oferta.dias} dias`;
            }

            if (oferta.quantidade_paises) {

                if (resumo !== "") {
                    resumo += " • ";
                }

                resumo +=
                    `${oferta.quantidade_paises} países`;
            }

            modalResumo.textContent = resumo;
        }


        // ==================================
        // DESCRIÇÃO
        // ==================================

        if (modalDescricao) {

            modalDescricao.textContent =
                oferta.descricao ||
                "Aproveite esta oferta da BoaTour.";
        }


        // ==================================
        // PREÇO
        // ==================================

        if (modalPreco) {

            const precoAtual =
                Number(oferta.preco_atual || 0);

            modalPreco.textContent =
                `R$ ${precoAtual.toLocaleString(
                    "pt-BR",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                )}`;
        }


        // ==================================
        // DESCONTO DO MODAL
        // ==================================

        if (modalDesconto) {

            const precoAnterior =
                Number(oferta.preco_anterior || 0);

            const precoAtual =
                Number(oferta.preco_atual || 0);


            if (
                precoAnterior > 0 &&
                precoAtual > 0 &&
                precoAtual < precoAnterior
            ) {

                const desconto =
                    Math.round(
                        ((precoAnterior - precoAtual) /
                            precoAnterior) * 100
                    );


                modalDesconto.textContent =
                    `-${desconto}%`;

                modalDesconto.style.display =
                    "inline-block";

            } else {

                modalDesconto.style.display =
                    "none";
            }
        }


        // ==================================
        // ABRIR MODAL
        // ==================================

        modalOferta.classList.add("ativo");

        document.body.classList.add("modal-aberto");
    }


    // ==========================================
    // FECHAR MODAL
    // ==========================================

    if (fecharOferta) {

        fecharOferta.addEventListener(
            "click",
            () => {

                fecharModalOferta();

            }
        );
    }


    function fecharModalOferta() {

        if (!modalOferta) {
            return;
        }

        modalOferta.classList.remove("ativo");

        document.body.classList.remove(
            "modal-aberto"
        );
    }


    // ==========================================
    // FECHAR CLICANDO FORA DO MODAL
    // ==========================================

    if (modalOferta) {

        modalOferta.addEventListener(
            "click",
            event => {

                if (event.target === modalOferta) {

                    fecharModalOferta();

                }
            }
        );
    }


    // ==========================================
    // FECHAR COM ESC
    // ==========================================

    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {

                fecharModalOferta();

            }
        }
    );


    // ==========================================
    // CAMPO DE BUSCA
    // ==========================================

    if (campoBusca) {

        campoBusca.addEventListener(
            "input",
            () => {

                buscaAtual =
                    campoBusca.value;

                aplicarFiltros();

            }
        );
    }


    // ==========================================
    // BOTÕES DE FILTRO
    // ==========================================

    botoesFiltro.forEach(botao => {

        botao.addEventListener(
            "click",
            () => {


                // ------------------------------
                // REMOVE ATIVO
                // ------------------------------

                botoesFiltro.forEach(btn => {

                    btn.classList.remove("ativo");

                });


                // ------------------------------
                // ATIVA BOTÃO
                // ------------------------------

                botao.classList.add("ativo");


                // ------------------------------
                // GUARDA FILTRO
                // ------------------------------

                filtroAtual =
                    botao.dataset.filtro;


                // ------------------------------
                // ATUALIZA CARDS
                // ------------------------------

                aplicarFiltros();

            }
        );
    });

});