const Votacao = require('../models/queryApi');

module.exports = (app) => {
  //Cria Rota GET listando Eleitores
  app.get('/eleitores', (req, res) => {
    Votacao.listaEleitores(res);
  });

  //Cria Rota GET listando Candidatos
  app.get('/candidatos/:id', (req, res) => {

    const id = parseInt(req.params.id)

    Votacao.listaCandidatos(id,res);
  });

  // //Cria Rota GET de membros recebendo parametros de requisição
  // app.get('/membro/:id', (req, res) => {

  //     const id = parseInt(req.params.id)

  //     Votacao.buscaMembroPorId(id, res)
  // })

  //------------------------------------------------------------------------------------------------------------------------
  //Cria Rota de cadastro de Eleitor
  app.post('/eleitor', (req, res) => {
    const eleitor = req.body;

    Votacao.cadastroEleitores(eleitor, res);
  });

  //Cria Rota de cadastro de Candidato
  app.post('/candidato', (req, res) => {
    const candidato = req.body;

    Votacao.cadastroCandidatos(candidato, res);
  });

  //Cria Rota de cadastro de turno
  app.post('/turno', (req, res) => {
    const turno = req.body;

    Votacao.cadastroTurno(turno, res);
  });

  // //Cria Rota de cadastro de ministerios
  // app.post('/ministerios', (req, res) => {
  //   const ministerio = req.body;
  //   const tipo = parseInt(req.body.tipo);

  //   Votacao.cadastroMinisterio(ministerio, tipo, res);
  // });

  // //Cria Rota de cadastro de Membro em ministerio
  // app.post('/membrosministerio', (req, res) => {
  //   const membro = parseInt(req.body.id_membro);
  //   const ministerio = parseInt(req.body.id_ministerio);

  //   Votacao.cadastroMembroMinisterio(membro, ministerio, res);
  // });

  //----------------------------------------------------------------------------------------------------------------------

  // Faz alteração no turno, alterando o status
  app.patch('/finalizaturno', (req, res) => {
    const turno = req.body;

    Votacao.finalizaTurno(turno, res);
  });

  // // Faz alteração no lider de ministerios cadastrados
  // app.patch('/liderministerio/:id', (req, res) => {
  //   const id = parseInt(req.params.id);
  //   const membro = req.body;

  //   Votacao.cadastraLiderMinisterio(id, membro, res);
  // });

  //----------------------------------------------------------------------------------------------------------------------
  // Exclui Votacao especificado pelo id
  //   app.delete('/atendimentos/:id', (req, res) => {
  //     const id = parseInt(req.params.id);

  //     Votacao.deletaAtendimento(id, res);
  //   });
};
