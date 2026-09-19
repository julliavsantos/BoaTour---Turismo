const mysql = require('mysql')

class DestinoBD {

    static connect() {

        const connection = mysql.createConnection({

            host: 'localhost',
            user: 'root',
            password: '',
            database: 'boatour_bd'

        })

        connection.connect()

        return connection
    }


    // BUSCA TODOS OS DESTINOS
    static getDestinos(callback) {

        const connection = DestinoBD.connect()

        var sql = 'SELECT * FROM destinos'

        connection.query(sql, function(error, results) {

            if (error) {

                console.log('ERRO AO BUSCAR DESTINOS:', error)

                connection.end()

                return
            }

            callback(results)

            connection.end()

        })
    }


    // BUSCA SOMENTE AS PRAIAS POPULARES
    static getPraiasPopulares(callback) {

        const connection = DestinoBD.connect()

        var sql = `
            SELECT * FROM destinos
            WHERE praia_popular = 1
        `

        connection.query(sql, function(error, results) {

            if (error) {

                console.log('ERRO AO BUSCAR PRAIAS POPULARES:', error)

                connection.end()

                return
            }

            callback(results)

            connection.end()

        })
    }


    // BUSCA UM DESTINO PELO ID
    static getDestinoById(id, callback) {

        const connection = DestinoBD.connect()

        var sql = 'SELECT * FROM destinos WHERE id_destino = ?'

        connection.query(sql, id, function(error, results) {

            if (error) {

                console.log('ERRO AO BUSCAR DESTINO:', error)

                connection.end()

                return
            }

            if (results.length == 0) {

                console.log('Destino não encontrado.')

                connection.end()

                return
            }

            var destino = results[0]

            callback(destino)

            connection.end()

        })
    }

}

module.exports = DestinoBD