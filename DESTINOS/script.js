document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTOS DA PÁGINA
    // ==========================================

    const destinosGrid = document.getElementById("destinosGrid");
    const campoBusca = document.getElementById("partida");
    const botoesFiltro = document.querySelectorAll(".filtro");

    // Elementos do modal
    const modalOferta = document.getElementById("modalOferta");
    const fecharOferta = document.getElementById("fecharOferta");
    const modalImagemOferta = document.getElementById("modalImagemOferta");
    const modalCategoria = document.getElementById("modalCategoria");
    const modalTitulo = document.getElementById("modalTitulo");
    const modalResumo = document.getElementById("modalResumo");
    const modalDescricao = document.getElementById("modalDescricao");
    const modalPreco = document.getElementById("modalPreco");


    // ==========================================
    // SE A PÁGINA NÃO TIVER O GRID
    // ==========================================

    if (!destinosGrid) {
        return;
    }


    // ==========================================
    // VARIÁVEIS
    // ==========================================

    let todosDestinos = [];
    let filtroAtual = "todas";
    let buscaAtual = "";


    // ==========================================
    // BUSCAR DESTINOS DO BANCO
    // ==========================================

    fetch("http://localhost:3000/destinos")

        .then(response => {

            if (!response.ok) {
                throw new Error("Erro ao buscar destinos.");
            }

            return response.json();
        })

        .then(destinos => {

            todosDestinos = destinos;

            aplicarFiltros();
        })

        .catch(error => {

            console.error("Erro ao carregar destinos:", error);

            destinosGrid.innerHTML = `
                <p class="mensagem-destinos">
                    Não foi possível carregar os destinos.
                </p>
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
    // APLICAR BUSCA + FILTRO
    // ==========================================

    function aplicarFiltros() {

        const resultados = todosDestinos.filter(destino => {

            // ------------------------------
            // FILTRO POR CATEGORIA
            // ------------------------------

            let passouNoFiltro = true;

            if (filtroAtual !== "todas") {

                // As categorias vêm do banco como:
                // ["Praia", "Natureza", "Turismo"]

                const categoriasDestino = Array.isArray(destino.categorias)
                    ? destino.categorias
                    : [];

                // Normaliza todas as categorias
                const categoriasNormalizadas =
                    categoriasDestino.map(categoria =>
                        normalizarTexto(categoria)
                    );

                // Verifica se o destino possui
                // a categoria escolhida

                passouNoFiltro =
                    categoriasNormalizadas.includes(
                        normalizarTexto(filtroAtual)
                    );
            }


            // ------------------------------
            // BUSCA
            // ------------------------------

            const textoBusca = normalizarTexto(buscaAtual);

            const categoriasTexto = Array.isArray(destino.categorias)
                ? destino.categorias.join(" ")
                : "";

            const textoDestino = normalizarTexto(`
                ${destino.nome}
                ${destino.cidade}
                ${destino.pais}
                ${destino.descricao}
                ${destino.tipo}
                ${categoriasTexto}
            `);

            const passouNaBusca =
                textoBusca === "" ||
                textoDestino.includes(textoBusca);


            // ------------------------------
            // RESULTADO FINAL
            // ------------------------------

            return passouNoFiltro && passouNaBusca;
        });


        renderizarDestinos(resultados);
    }


    // ==========================================
    // MOSTRAR OS CARDS
    // ==========================================

    function renderizarDestinos(destinos) {

        destinosGrid.innerHTML = "";


        // Nenhum resultado
        if (destinos.length === 0) {

            destinosGrid.innerHTML = `
                <div class="sem-destinos">

                    <h3>Nenhum destino encontrado</h3>

                    <p>
                        Tente buscar outro destino ou alterar o filtro.
                    </p>

                </div>
            `;

            return;
        }


        // Criar cards
        destinos.forEach(destino => {

            const card = document.createElement("div");

            card.classList.add("card-oferta");


            // ==================================
            // IMAGEM
            // ==================================

            const imagem = destino.imagem || "";


            // ==================================
            // CARD
            // ==================================

            card.innerHTML = `

                <div class="imagem-oferta">

                    <img
                        src="/img/destinos/${imagem}"
                        alt="${destino.nome}"
                    >

                </div>


                <div class="info-oferta">

                    <h3>
                        ${destino.nome}
                    </h3>

                    <p>
                        ${destino.cidade}, ${destino.pais}
                    </p>

                    <p>
                        ${destino.dias} dias
                    </p>

                    <div class="precos">

                        <strong>
                            R$ ${Number(destino.preco_base).toLocaleString(
                                "pt-BR",
                                {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }
                            )}
                        </strong>

                    </div>

                </div>
            `;


            // ==================================
            // ABRIR MODAL
            // ==================================

            card.addEventListener("click", () => {

                abrirModalDestino(destino);

            });


            destinosGrid.appendChild(card);
        });
    }


    // ==========================================
    // ABRIR MODAL DO DESTINO
    // ==========================================

    function abrirModalDestino(destino) {

        if (!modalOferta) {
            return;
        }


        // ==================================
        // IMAGEM
        // ==================================

        if (modalImagemOferta) {

            modalImagemOferta.src =
                `/img/destinos/${destino.imagem || ""}`;

            modalImagemOferta.alt =
                destino.nome || "Destino";
        }


        // ==================================
        // CATEGORIA
        // ==================================

        if (modalCategoria) {

            // Mostra as categorias do destino
            // no modal

            if (
                Array.isArray(destino.categorias) &&
                destino.categorias.length > 0
            ) {

                modalCategoria.textContent =
                    destino.categorias.join(" • ");

            } else {

                modalCategoria.textContent =
                    destino.tipo || "Destino";
            }
        }


        // ==================================
        // TÍTULO
        // ==================================

        if (modalTitulo) {

            modalTitulo.textContent =
                destino.nome || "Destino";
        }


        // ==================================
        // RESUMO
        // ==================================

        if (modalResumo) {

            modalResumo.textContent =
                `${destino.cidade || ""}, ${destino.pais || ""} • ${destino.dias || 0} dias`;
        }


        // ==================================
        // DESCRIÇÃO
        // ==================================

        if (modalDescricao) {

            modalDescricao.textContent =
                destino.descricao ||
                "Conheça este incrível destino.";
        }


        // ==================================
        // PREÇO
        // ==================================

        if (modalPreco) {

            modalPreco.textContent =
                `R$ ${Number(
                    destino.preco_base || 0
                ).toLocaleString(
                    "pt-BR",
                    {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }
                )}`;
        }


        // ==================================
        // ESCONDER DESCONTO
        // ==================================

        const modalDesconto =
            document.getElementById("modalDesconto");

        if (modalDesconto) {

            modalDesconto.style.display = "none";
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

        fecharOferta.addEventListener("click", () => {

            fecharModalDestino();

        });
    }


    function fecharModalDestino() {

        if (!modalOferta) {
            return;
        }

        modalOferta.classList.remove("ativo");

        document.body.classList.remove("modal-aberto");
    }


    // ==========================================
    // FECHAR CLICANDO FORA DO MODAL
    // ==========================================

    if (modalOferta) {

        modalOferta.addEventListener("click", event => {

            if (event.target === modalOferta) {

                fecharModalDestino();
            }
        });
    }


    // ==========================================
    // FECHAR COM ESC
    // ==========================================

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            fecharModalDestino();
        }
    });


    // ==========================================
    // CAMPO DE BUSCA
    // ==========================================

    if (campoBusca) {

        campoBusca.addEventListener("input", () => {

            buscaAtual = campoBusca.value;

            aplicarFiltros();
        });
    }


    // ==========================================
    // BOTÕES DE FILTRO
    // ==========================================

    botoesFiltro.forEach(botao => {

        botao.addEventListener("click", () => {

            // Remove ativo de todos

            botoesFiltro.forEach(btn => {

                btn.classList.remove("ativo");
            });


            // Ativa o botão clicado

            botao.classList.add("ativo");


            // Guarda o filtro

            filtroAtual = botao.dataset.filtro;


            // Atualiza cards

            aplicarFiltros();
        });
    });

});