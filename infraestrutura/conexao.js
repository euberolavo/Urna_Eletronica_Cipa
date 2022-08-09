const pg = require('pg');

const config = {
    host: 'localhost',
    user: 'postgres',     
    password: 'Onco1010',
    database: 'Urna_Cipa',
    port: 5432,
    ssl: false
};

const conexao = new pg.Client(config);

module.exports = conexao
