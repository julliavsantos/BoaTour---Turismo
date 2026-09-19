// ==========================================
// OFERTAS
// ==========================================

fetch('/ofertas')

    .then(response => response.json())

    .then(ofertas => {

        var lista =
            document.getElementById('listaOfertas');

        lista.innerHTML = '';


        // ======================================
        // CRIA OS CARDS
        // ======================================

        ofertas.forEach(oferta => {

            // Calcula o desconto
            var desconto = Math.round(
                (
                    (oferta.preco_anterior -
                    oferta.preco_atual)
                    /
                    oferta.preco_anterior
                ) * 100
            );


            // Define a categoria
            var categoria = '';

            if (oferta.pacote) {

                categoria = 'pacote';

            } else if (oferta.nacional) {

                categoria = 'nacional';

            } else if (oferta.internacional) {

                categoria = 'internacional';

            }


            // Define se é destaque
            var destaque =
                oferta.destaque ? 'sim' : 'nao';


            // ==================================
            // CRIA O CARD
            // ==================================

            lista.innerHTML += `

                <div
    class="card-oferta"
    data-categoria="${categoria}"
    data-destaque="${destaque}"
    data-descricao="${oferta.descricao || ''}"
    data-passagem="${oferta.passagem_aerea}"
    data-hospedagem="${oferta.hospedagem}"
    data-passeios="${oferta.passeios}"
    data-dias="${oferta.dias}"
>

                    <div class="imagem-oferta">

                        <img
                            src="../${oferta.imagem}"
                            alt="${oferta.titulo}"
                        >

                        <span class="desconto">
                            -${desconto}%
                        </span>

                    </div>


                    <div class="info-oferta">

                        <h3>
                            ${oferta.titulo}
                        </h3>


                        <p>
                            ${oferta.dias} dias
                            ${oferta.passagem_aerea ? ' • Voo' : ''}
                            ${oferta.hospedagem ? ' • Hotel' : ''}
                            ${oferta.passeios ? ' • Passeios' : ''}
                        </p>


                        <div class="precos">

                            <span class="preco-antigo">

                                R$ ${Number(
                                    oferta.preco_anterior
                                ).toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2
                                })}

                            </span>


                            <strong>

                                R$ ${Number(
                                    oferta.preco_atual
                                ).toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2
                                })}

                            </strong>

                        </div>

                    </div>

                </div>

            `;

        });


        // ======================================
        // FILTROS
        // ======================================

        const filtros =
            document.querySelectorAll('.filtro');


        const cards =
            document.querySelectorAll('.card-oferta');


        function filtrarOfertas(
            filtroSelecionado
        ) {

            cards.forEach(function(oferta) {

                const categoria =
                    oferta.getAttribute(
                        'data-categoria'
                    );

                const destaque =
                    oferta.getAttribute(
                        'data-destaque'
                    );


                // ==============================
                // TODAS AS OFERTAS
                // ==============================

                if (
                    filtroSelecionado === 'todas'
                ) {

                    // "Todas" mostra somente
                    // as ofertas em destaque

                    if (
                        destaque === 'sim'
                    ) {

                        oferta.style.display = '';

                    } else {

                        oferta.style.display = 'none';

                    }

                }


                // ==============================
                // CATEGORIAS
                // ==============================

                else {

                    if (
                        categoria ===
                        filtroSelecionado
                    ) {

                        oferta.style.display = '';

                    } else {

                        oferta.style.display = 'none';

                    }

                }

            });

        }


        // ======================================
        // CLIQUE NOS FILTROS
        // ======================================

        filtros.forEach(function(filtro) {

            filtro.addEventListener(
                'click',
                function() {

                    filtros.forEach(
                        function(botao) {

                            botao.classList.remove(
                                'ativo'
                            );

                        }
                    );


                    this.classList.add(
                        'ativo'
                    );


                    const filtroSelecionado =
                        this.getAttribute(
                            'data-filtro'
                        );


                    filtrarOfertas(
                        filtroSelecionado
                    );

                }
            );

        });


        // ======================================
        // FILTRO INICIAL
        // ======================================

        filtrarOfertas('todas');

    })


    // ==========================================
    // ERRO
    // ==========================================

    .catch(error => {

        console.log(
            'Erro ao carregar ofertas:',
            error
        );


        var lista =
            document.getElementById(
                'listaOfertas'
            );


        if (lista) {

            lista.innerHTML = `

                <p class="erro-ofertas">
                    Não foi possível carregar as ofertas.
                </p>

            `;

        }

    });
