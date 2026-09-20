const http = require('http')
const url = require('url')
const fs = require('fs')
const path = require('path')

const corsHeaders = {
    'Access-Control-Allow-Origin': 'http://127.0.0.1:5500',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
}

const DestinoBD = require('./DestinoBD')
const OfertaBD = require('./OfertaBD')


// ==========================================
// BUSCA TODOS OS DESTINOS
// ==========================================

function buscaDestinos(res) {

    DestinoBD.getDestinos(function(destinos) {

        var json = JSON.stringify(destinos)

        res.end(json)

    })

}


// ==========================================
// BUSCA SOMENTE AS PRAIAS POPULARES
// ==========================================

function buscaPraiasPopulares(res) {

    DestinoBD.getPraiasPopulares(function(destinos) {

        var json = JSON.stringify(destinos)

        res.end(json)

    })

}


// ==========================================
// BUSCA TODAS AS OFERTAS
// ==========================================

function buscaOfertas(res) {

    OfertaBD.getOfertas(function(ofertas) {

        var json = JSON.stringify(ofertas)

        res.end(json)

    })

}


// ==========================================
// MOSTRA ARQUIVOS
// ==========================================

function mostraArquivo(res, caminho, tipo) {

    fs.readFile(caminho, function(error, data) {

        if (error) {

            console.log(
                'ERRO AO ABRIR:',
                caminho
            )

            console.log(error)

            res.writeHead(404, {
                'Content-Type':
                    'text/plain;charset=utf-8'
            })

            res.end(
                'Arquivo não encontrado.'
            )

            return
        }

        console.log(
            'Arquivo carregado:',
            caminho
        )

        res.writeHead(200, {
            'Content-Type': tipo
        })

        res.end(data)

    })

}


// ==========================================
// CALLBACK
// ==========================================

var callback = function(req, res) {

    // ======================================
    // CORS
    // ======================================

    Object.entries(corsHeaders).forEach(
        ([chave, valor]) => {
            res.setHeader(chave, valor)
        }
    )

    // ======================================
    // REQUISIÇÃO OPTIONS
    // ======================================

    if (req.method === 'OPTIONS') {

        res.writeHead(204)
        res.end()

        return
    }


    var rota = url.parse(
        req.url,
        true
    )


    // ======================================
    // PÁGINA INICIAL
    // ======================================

    if (rota.pathname == '/') {

        mostraArquivo(
            res,
            '../index.html',
            'text/html;charset=utf-8'
        )


    // ======================================
    // PÁGINA DE DESTINOS
    // ======================================

    } else if (
        rota.pathname == '/destinos/'
    ) {

        mostraArquivo(
            res,
            '../DESTINOS/index.html',
            'text/html;charset=utf-8'
        )


    // ======================================
    // TODOS OS DESTINOS DO BANCO
    // ======================================

    } else if (
        rota.pathname == '/destinos'
    ) {

        res.writeHead(200, {
            'Content-Type':
                'application/json;charset=utf-8'
        })

        buscaDestinos(res)


    // ======================================
    // SOMENTE PRAIAS POPULARES
    // ======================================

    } else if (
        rota.pathname ==
        '/destinos/praias-populares'
    ) {

        res.writeHead(200, {
            'Content-Type':
                'application/json;charset=utf-8'
        })

        buscaPraiasPopulares(res)


    // ======================================
    // TODAS AS OFERTAS DO BANCO
    // ======================================

    } else if (
        rota.pathname == '/ofertas'
    ) {

        res.writeHead(200, {
            'Content-Type':
                'application/json;charset=utf-8'
        })

        buscaOfertas(res)


    // ======================================
    // CSS
    // ======================================

    } else if (
        rota.pathname.startsWith('/css/')
    ) {

        var arquivo =
            '..' + rota.pathname

        console.log(
            'CSS solicitado:',
            arquivo
        )

        mostraArquivo(
            res,
            arquivo,
            'text/css'
        )


    // ======================================
    // JAVASCRIPT
    // ======================================

    } else if (
        rota.pathname.startsWith('/js/')
    ) {

        var arquivo =
            '..' + rota.pathname

        mostraArquivo(
            res,
            arquivo,
            'application/javascript'
        )


    // ======================================
    // IMAGENS
    // ======================================

    } else if (
        rota.pathname.startsWith('/img/')
    ) {

        var arquivo =
            '..' + rota.pathname

        var extensao =
            path.extname(arquivo).toLowerCase()

        var tiposImagem = {

            '.png': 'image/png',

            '.jpg': 'image/jpeg',

            '.jpeg': 'image/jpeg',

            '.gif': 'image/gif',

            '.webp': 'image/webp',

            '.svg': 'image/svg+xml',

            '.ico': 'image/x-icon'

        }

        var tipo =
            tiposImagem[extensao] ||
            'application/octet-stream'

        console.log(
            'Imagem solicitada:',
            arquivo
        )

        mostraArquivo(
            res,
            arquivo,
            tipo
        )


    // ======================================
    // ROTA INVÁLIDA
    // ======================================

    } else {

        res.writeHead(404, {
            'Content-Type':
                'text/plain;charset=utf-8'
        })

        res.end(
            'Rota inválida.'
        )

    }

}


// ==========================================
// CRIA O SERVIDOR
// ==========================================

var server = http.createServer(callback)

server.listen(3000)

console.log(
    'Servidor rodando em http://localhost:3000'
)