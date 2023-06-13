var express = require('express');
var router = express.Router();
const sql = require('../dboperations');

let PESSOAS = [];
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Trabalho Banco de dados!', pessoas: PESSOAS });
});

// Test connection
router.get('/conntect', (req, res, next) => {
  sql.getdata().then();
  return res.send({
    message: 'Connected!'
  })
});

router.get('/excluir-pessoa/:id', async (req, res, next) => {
  const id = req.params.id;
  const pessoa = await sql.excluirPessoa(id);
  return res.status(200).send({
    message: 'Pessoa excluido com sucesso!',
  })
});

router.all('/listar-pessoa/:id', async (req, res, next) => {
  const id = req.params.id;
  const pessoa = await sql.pessoa(id);
  return res.status(200).send({
    pessoa: pessoa[0],
  })
})

router.all('/listar-pessoas', async (req, res, next) => {
  const pessoas = await sql.pessoas();
  listarPessoas();
  return res.status(200).send({
    pessoas: pessoas[0],
  })
})

async function listarPessoas() {
  const pessoas_ = await sql.pessoas();
  PESSOAS = pessoas_[0]
  return pessoas_[0]
}

module.exports = router;
