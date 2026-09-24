const mysql = require('mysql');
const bcrypt = require('bcrypt');

class UsuariosBD {

    static connect() {

        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'boatour_bd'
        });

        connection.connect();

        return connection;
    }


    // CADASTRAR USUÁRIO
    static async addUsuario(usuario, callback) {

        const connection = UsuariosBD.connect();

        const {
            nome,
            cpf,
            email,
            senha,
            termos_aceitos
        } = usuario;


        // Verifica se os campos foram preenchidos
        if (!nome || !cpf || !email || !senha) {

            connection.end();

            return callback({
                error: 'Preencha todos os campos.'
            });
        }


        // Verifica se aceitou os termos
        if (!termos_aceitos) {

            connection.end();

            return callback({
                error: 'Você precisa aceitar os Termos de Uso e a Política de Privacidade.'
            });
        }


        // Criptografa (faz o hash) da senha
        const senhaHash = await bcrypt.hash(senha, 10);


        const dados = {
            nome: nome,
            cpf: cpf,
            email: email,
            senha: senhaHash,
            termos_aceitos: termos_aceitos
        };


        const sql = 'INSERT INTO usuarios SET ?';


        connection.query(sql, dados, (error, results) => {

            if (error) {

                connection.end();

                // CPF ou e-mail já cadastrados
                if (error.code === 'ER_DUP_ENTRY') {

                    return callback({
                        error: 'CPF ou e-mail já cadastrado.'
                    });
                }

                return callback({
                    error: 'Erro ao cadastrar usuário.'
                });
            }


            callback({
                message: 'Usuário cadastrado com sucesso!'
            });

            connection.end();
        });
    }



    // LOGIN
    static async login(usuario, callback) {

        const connection = UsuariosBD.connect();

        const {
            cpf,
            senha
        } = usuario;


        // Verifica se CPF e senha foram preenchidos
        if (!cpf || !senha) {

            connection.end();

            return callback({
                error: 'Digite o CPF e a senha.'
            });
        }


        // Procura o usuário pelo CPF
        const sql = `
            SELECT
                id_usuario,
                nome,
                cpf,
                email,
                senha
            FROM usuarios
            WHERE cpf = ?
        `;


        connection.query(
            sql,
            [cpf],
            async (error, results) => {

                if (error) {

                    connection.end();

                    return callback({
                        error: 'Erro ao realizar login.'
                    });
                }


                // CPF não encontrado
                if (results.length === 0) {

                    connection.end();

                    return callback({
                        error: 'CPF ou senha incorretos.'
                    });
                }


                const usuarioBanco = results[0];


                // Compara a senha digitada
                // com o hash armazenado no banco
                const senhaValida = await bcrypt.compare(
                    senha,
                    usuarioBanco.senha
                );


                if (!senhaValida) {

                    connection.end();

                    return callback({
                        error: 'CPF ou senha incorretos.'
                    });
                }


                // Login realizado
                callback({

                    message: 'Login realizado com sucesso!',

                    usuario: {
                        id_usuario: usuarioBanco.id_usuario,
                        nome: usuarioBanco.nome,
                        cpf: usuarioBanco.cpf,
                        email: usuarioBanco.email
                    }

                });


                connection.end();
            }
        );
    }



    // LISTAR USUÁRIOS
    static getUsuarios(callback) {

        const connection = UsuariosBD.connect();

        const sql = `
            SELECT
                id_usuario,
                nome,
                cpf,
                email,
                termos_aceitos,
                data_cadastro
            FROM usuarios
        `;


        connection.query(sql, (error, results) => {

            if (error) {

                connection.end();

                return callback({
                    error: 'Erro ao buscar usuários.'
                });
            }


            callback(results);

            connection.end();
        });
    }

}


module.exports = UsuariosBD;