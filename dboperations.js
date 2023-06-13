const config = require('./dbconfig');
const sql = require('mssql');

async function getData() {
    try {
        let pool = await sql.connect(config);
        console.log("Sql server connected...");
        return pool;
    } catch (error) {
        console.log("Error: " + error);
    }
}

async function getPessoa(id) {
    try {
        let pool = await getData();
        let res = await pool.request().query(`select * from ObterPessoaPorId(${id})`);

        return res.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function getPessoas() {
    try {
        let pool = await getData();
        let res = await pool.request().query(`select * from ObterPessoas()`);

        return res.recordsets;
    } catch (error) {
        console.log(error);
    }
}

async function excluirPessoa(id) {
    try {
        let pool = await getData();
        let res = await pool.request().query(`EXEC ExcluirRegistro @id = ${id};`);

        return res
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getdata: getData,
    pessoa: getPessoa,
    pessoas: getPessoas,
    excluirPessoa: excluirPessoa,
}