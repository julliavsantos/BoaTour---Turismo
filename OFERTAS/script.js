document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTOS DA PÁGINA
    // ==========================================

    const ofertasGrid = document.getElementById("ofertasGrid");
    const campoBusca = document.getElementById("partida");
    const botoesFiltro = document.querySelectorAll(".filtro");
    const btnVerMais = document.getElementById("btnVerMais");

    // VERIFICA SE EXISTE O GRID
    if (!ofertasGrid) {
        return;
    }
    // VARIÁVEIS
    let todasOfertas = [];
    let filtroAtual = "todas";
    let buscaAtual = "";
    // Quantidade de cards que aparecem
    let quantidadeVisivel = 8;
    // Resultado depois dos filtros e busca
    let resultadosAtuais = [];

    // BUSCAR OFERTAS DO SERVIDOR
    fetch("http://localhost:3000/ofertas")

        .then(response => {
            if (!response.ok) {
                throw new Error(
                    "Erro ao buscar ofertas."
                );
            }
            return response.json();
        })
        .then(ofertas => {
            // Guarda TODAS as ofertas
            todasOfertas = ofertas;
            // Aplica filtros
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
                    <p>Verifique se o servidor está funcioando.</p>
                </div>`;

            // Esconde botão caso dê erro
            if (btnVerMais) {
                btnVerMais.style.display = "none";
            }
        });

    // NORMALIZAR TEXTO
    function normalizarTexto(texto) {
        return String(texto || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .trim();
    }

    // IDENTIFICAR CATEGORIA DA OFERTA
    function ofertaPertenceCategoria(
        oferta,
        filtro
    ) {

        switch (normalizarTexto(filtro)) {

            case "nacionais":
            case "nacional":

                return (
                    Number(oferta.nacional) === 1 ||
                    oferta.nacional === true
                );


            case "internacionais":
            case "internacional":

                return (
                    Number(oferta.internacional) === 1 ||
                    oferta.internacional === true
                );


            case "pacotes":
            case "pacote":

                return (
                    Number(oferta.pacote) === 1 ||
                    oferta.pacote === true
                );

            default:
                return true;
        }
    }

    // APLICAR BUSCA + FILTRO
    function aplicarFiltros() {

        let resultados =
            todasOfertas.filter(oferta => {
                
                // FILTRO POR CATEGORIA
                const passouNoFiltro =
                    ofertaPertenceCategoria(
                        oferta,
                        filtroAtual
                    );

                // BUSCA
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

                // RESULTADO
                return (
                    passouNoFiltro &&
                    passouNaBusca
                );
            });

        // GUARDA OS RESULTADOS
        resultadosAtuais = resultados;

        // SEMPRE VOLTA PARA OS PRIMEIROS 8
        quantidadeVisivel = 8;

        // MOSTRAR OFERTAS
        renderizarOfertas();
    }

    // MOSTRAR OS CARDS
    function renderizarOfertas() {

        // Limpa o grid
        ofertasGrid.innerHTML = "";

        if (resultadosAtuais.length === 0) {

            ofertasGrid.innerHTML = `
                <div class="sem-ofertas">
                    <h3>Nenhuma oferta encontrada</h3>
                    <p>Tente buscar outra oferta ou alterar o filtro.</p>
                </div>`;

            atualizarBotaoVerMais();
            return;
        }

        // PEGAR SOMENTE OS CARDS VISÍVEIS
        const ofertasVisiveis =
            resultadosAtuais.slice(
                0,
                quantidadeVisivel
            );

        // CRIAR CADA CARD
        ofertasVisiveis.forEach(oferta => {

            const card =
                document.createElement("div");
            card.classList.add(
                "card-oferta"
            );

            // IMAGEM
            const imagem =
                oferta.imagem || "";
            // PREÇOS
            const precoAnterior =
                Number(
                    oferta.preco_anterior || 0
                );

            const precoAtual =
                Number(
                    oferta.preco_atual || 0
                );


            // CALCULAR DESCONTO
            let desconto = 0;

            if (
                precoAnterior > 0 &&
                precoAtual > 0 &&
                precoAtual < precoAnterior
            ) {

                desconto =
                    Math.round(
                        (
                            (
                                precoAnterior -
                                precoAtual
                            )
                            /
                            precoAnterior
                        ) * 100
                    );
            }

            // CATEGORIA
            let categoria = "Oferta";
            if (Number(oferta.pacote) === 1 ||oferta.pacote === true) {
                categoria = "Pacote";
            }else if (Number(oferta.internacional) === 1 ||oferta.internacional === true) {
                categoria = "Internacional";
            }else if (Number(oferta.nacional) === 1 ||oferta.nacional === true) {
                categoria = "Nacional";
            }


            // ==========================================
            // DATASET PARA O MODAL ANTIGO
            // ==========================================
            // O modal que está no seu JS antigo
            // pega essas informações do card
            card.dataset.dias = oferta.dias || "";
            card.dataset.passagem = oferta.passagem_aerea || 0;
            card.dataset.hospedagem = oferta.hospedagem || 0;
            card.dataset.passeios = oferta.passeios || 0;
            card.dataset.descricao = oferta.descricao || "";

            // Categoria em minúsculo porque
            // o modal antigo espera exatamente assim.

            card.dataset.categoria = categoria === "Nacional" ? "nacional"
            : categoria === "Internacional" ? "internacional"
            : categoria === "Pacote" ? "pacote"
            : "oferta";

            // CARD HTML
            card.innerHTML = `

                <div class="imagem-oferta">
                    <img src="../${imagem}" alt="${oferta.titulo || "Oferta"}">

                    ${desconto > 0 ? `
                        <span class="desconto-oferta"> -${desconto}% </span>
                        <span class="desconto" style="display:none;"> -${desconto}%</span>` : 
                        ` <span class="desconto" style="display:none;"> </span> `
                    }
                </div>

                <div class="info-oferta">
                    <h3> ${oferta.titulo || "Oferta"} </h3>
                    <p> ${oferta.dias ? `${oferta.dias} dias` : "" }
                        ${oferta.passagem_aerea ? " • Voo" : ""}
                        ${oferta.hospedagem ? " • Hotel": ""}
                        ${oferta.passeios ? " • Passeios": ""}</p>

                    <div class="precos">
                        ${oferta.preco_anterior ? `
                            <span class="preco-antigo">R$${Number(oferta.preco_anterior).toLocaleString("pt-BR",{minimumFractionDigits: 2})}
                            </span>
                            `: ""}

                        <strong>R$${Number(oferta.preco_atual || 0).toLocaleString("pt-BR",{minimumFractionDigits: 2})}
                        </strong>

                    </div>
                </div>`;

            // ADICIONAR AO GRID
            ofertasGrid.appendChild(card);
        });

        // ATUALIZAR BOTÃO
        atualizarBotaoVerMais();
}

    // VERIFICAR SE EXISTEM MAIS OFERTAS
    function atualizarBotaoVerMais() {

        // Se não existir botão no HTML
        if (!btnVerMais) {
            return;
        }

        // TEM MAIS OFERTAS?
        if (quantidadeVisivel <resultadosAtuais.length) {
            // TEM MAIS
            btnVerMais.style.display =
                "block";
        }else {
            btnVerMais.style.display =
                "none";
        }
    }

    // BOTÃO VER MAIS
    if (btnVerMais) {

        btnVerMais.addEventListener(
            "click",
            () => {
                // Adiciona mais 8
                quantidadeVisivel += 8;
                // Mostra novamente
                renderizarOfertas();
            }
        );
    }

    // CAMPO DE BUSCA
    if (campoBusca) {

        campoBusca.addEventListener(
            "input",
            () => {buscaAtual = campoBusca.value;aplicarFiltros();

            });
    }

    // BOTÕES DE FILTRO
    botoesFiltro.forEach(
        botao => {

            botao.addEventListener(
                "click",
                () => {

                    // REMOVE ATIVO
                    botoesFiltro.forEach(
                        btn => {
                            btn.classList.remove(
                                "ativo"
                            );
                        }
                    );
                    // ATIVA BOTÃO
                    botao.classList.add(
                        "ativo"
                    );
                    // GUARDA FILTRO
                    filtroAtual =
                        botao.dataset.filtro;
                    // ATUALIZA CARDS
                    aplicarFiltros();
                }
            );
        }
    );

});