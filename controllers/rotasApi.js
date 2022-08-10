const Votacao = require('../models/queryApi');

module.exports = (app) => {
  //Cria Rota GET listando Eleitores
  app.get('/eleitores', (req, res) => {
    Votacao.listaEleitores(res);
  });

  //Cria Rota GET listando Candidatos
  app.get('/candidatos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    Votacao.listaCandidatos(id, res);
  });

  //Cria Rota GET listando resultado por turno
  app.get('/resultado/:id', (req, res) => {
    const id = parseInt(req.params.id);

    Votacao.listaResultados(id, res);
  });

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

  //Cria Rota de cadastro de Votos
  app.post('/voto', (req, res) => {
    const voto = req.body;

    Votacao.validaVoto(voto, res);
  });

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
