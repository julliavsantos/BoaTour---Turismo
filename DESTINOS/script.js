document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTOS DA PÁGINA
    // ==========================================

    const destinosGrid = document.getElementById("destinosGrid");

    const campoBusca = document.getElementById("partida");

    const botoesFiltro = document.querySelectorAll(".filtro");

    const btnVerMaisDestinos =
        document.getElementById("btnVerMaisDestinos");


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

    let destinosFiltrados = [];

    let filtroAtual = "todas";

    let buscaAtual = "";

    // Quantidade de destinos que aparecem
    let quantidadeVisivel = 8;


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

            console.log(
                "ODS DOS DESTINOS:",
                destinos.map(destino => ({
                    nome: destino.nome,
                    ods8: destino.ods8,
                    ods12: destino.ods12
                }))
            );

            todosDestinos = destinos;

            aplicarFiltros();

        })

        .catch(error => {

            console.error(
                "Erro ao carregar destinos:",
                error
            );

            destinosGrid.innerHTML = `
                <p class="mensagem-destinos">
                    Não foi possível carregar os destinos.
                </p>
            `;

            if (btnVerMaisDestinos) {
                btnVerMaisDestinos.style.display = "none";
            }

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

        const resultados =
            todosDestinos.filter(destino => {

                // ------------------------------------------
                // FILTRO POR CATEGORIA
                // ------------------------------------------

                let passouNoFiltro = true;

                if (filtroAtual !== "todas") {

                    const categoriasDestino =
                        Array.isArray(destino.categorias)
                            ? destino.categorias
                            : [];

                    const categoriasNormalizadas =
                        categoriasDestino.map(categoria =>
                            normalizarTexto(categoria)
                        );

                    passouNoFiltro =
                        categoriasNormalizadas.includes(
                            normalizarTexto(filtroAtual)
                        );

                }


                // ------------------------------------------
                // BUSCA
                // ------------------------------------------

                const textoBusca =
                    normalizarTexto(buscaAtual);

                const categoriasTexto =
                    Array.isArray(destino.categorias)
                        ? destino.categorias.join(" ")
                        : "";

                const textoDestino =
                    normalizarTexto(`
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


                // ------------------------------------------
                // RESULTADO FINAL
                // ------------------------------------------

                return passouNoFiltro && passouNaBusca;

            });


        // Guarda os resultados encontrados
        destinosFiltrados = resultados;


        // Sempre que pesquisar ou trocar filtro,
        // volta para os 8 primeiros
        quantidadeVisivel = 8;


        // Renderiza novamente
        renderizarDestinos();

    }


    // ==========================================
    // MOSTRAR OS CARDS
    // ==========================================

    function renderizarDestinos() {

        destinosGrid.innerHTML = "";


        // ======================================
        // NENHUM RESULTADO
        // ======================================

        if (destinosFiltrados.length === 0) {

            destinosGrid.innerHTML = `
                <div class="sem-destinos">

                    <h3>
                        Nenhum destino encontrado
                    </h3>

                    <p>
                        Tente buscar outro destino
                        ou alterar o filtro.
                    </p>

                </div>
            `;

            atualizarBotaoVerMais();

            return;
        }


        // ======================================
        // PEGAR SOMENTE OS VISÍVEIS
        // ======================================

        const destinosVisiveis =
            destinosFiltrados.slice(
                0,
                quantidadeVisivel
            );


        // ======================================
        // CRIAR CARDS
        // ======================================

        destinosVisiveis.forEach(destino => {

            const card =
                document.createElement("div");

            card.classList.add("card-oferta");


            // ==================================
            // IMAGEM
            // ==================================

            const imagem =
                destino.imagem || "";


            // ==================================
            // PREÇO
            // ==================================

            const preco =
                Number(destino.preco_base || 0);


            // ==================================
            // DESCRIÇÃO
            // ==================================

            const descricao =
                destino.descricao ||
                "Conheça este incrível destino.";


            // ==================================
            // CARD
            // ==================================

            card.innerHTML = `
    <div class="imagem-oferta">
        <img
            src="/img/destinos/${imagem}"
            alt="${destino.nome || "Destino"}"
        >
    </div>

    <div class="info-oferta">

        <h3>
            ${destino.nome || "Destino"}
        </h3>

        <p class="localizacao-destino">
            ${destino.cidade || ""}, ${destino.pais || ""}
        </p>

        <p class="descricao-destino">
            ${destino.descricao || "Conheça este incrível destino."}
        </p>

        <p class="dias-destino">
            ${destino.dias || 0} dias
        </p>

        <div class="precos">

            ${
                Number(destino.ods8) === 1 ||
                Number(destino.ods12) === 1
                    ? `
                        <img
                            class="selinho-ods"
                            src="/img/icones/arvore.png"
                            alt="Destino alinhado às ODS"
                        >
                    `
                    : ""
            }

            <strong>
                R$ ${preco.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })}
            </strong>

        </div>

        <button
            class="btn-ver-ofertas"
            type="button"
        >
            Ver ofertas
        </button>

    </div>
`;


            // ==================================
            // BOTÃO VER OFERTAS
            // ==================================

            const btnVerOfertas =
                card.querySelector(".btn-ver-ofertas");


            if (btnVerOfertas) {

                btnVerOfertas.addEventListener(
                    "click",
                    event => {

                        // Impede o clique de fazer
                        // qualquer outra ação no card
                        event.stopPropagation();

                        console.log(
                            "Ver ofertas:",
                            destino.nome
                        );

                        // Por enquanto leva para
                        // a página de ofertas
                        window.location.href =
                            "/OFERTAS/index.html";

                    }
                );

            }


            // Adiciona o card na página
            destinosGrid.appendChild(card);

        });


        // Atualiza o botão depois de renderizar
        atualizarBotaoVerMais();

    }


    // ==========================================
    // ATUALIZAR BOTÃO "VER MAIS"
    // ==========================================

    function atualizarBotaoVerMais() {

        if (!btnVerMaisDestinos) {
            return;
        }


        // Se ainda existem destinos para mostrar

        if (
            quantidadeVisivel <
            destinosFiltrados.length
        ) {

            btnVerMaisDestinos.style.display =
                "block";

        } else {

            // Se já mostrou todos

            btnVerMaisDestinos.style.display =
                "none";

        }

    }


    // ==========================================
    // BOTÃO "VER MAIS"
    // ==========================================

    if (btnVerMaisDestinos) {

        btnVerMaisDestinos.addEventListener(
            "click",
            () => {

                // Adiciona mais 8
                quantidadeVisivel += 8;

                // Renderiza novamente
                renderizarDestinos();

            }
        );

    }


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

                // Remove ativo de todos

                botoesFiltro.forEach(btn => {

                    btn.classList.remove(
                        "ativo"
                    );

                });


                // Ativa o botão clicado

                botao.classList.add(
                    "ativo"
                );


                // Guarda o filtro

                filtroAtual =
                    botao.dataset.filtro;


                // Atualiza cards

                aplicarFiltros();

            }
        );

    });

});