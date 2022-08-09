const Atendimento = require('../models/queryApi');

module.exports = (app) => {
  //Cria Rota GET de Membros Geral
  app.get('/membros', (req, res) => {
    Atendimento.listaAtendimentos(res);
  });

  //Cria Rota GET de membros recebendo parametros de requisição
  app.get('/membro/:id', (req, res) => {

      const id = parseInt(req.params.id)

      Atendimento.buscaMembroPorId(id, res)
  })

  //Cria Rota de cadastro de cargos -------------------------------------------------------------------------------------------------------------
  app.post('/cargos', (req, res) => {
    const cargo = req.body;

    Atendimento.cadastroCargo(cargo, res);
  });

  //Cria Rota de cadastro de ministerios
  app.post('/ministerios', (req, res) => {
    const ministerio = req.body;
    const tipo = parseInt(req.body.tipo);

    Atendimento.cadastroMinisterio(ministerio, tipo, res);
  });

  //Cria Rota de cadastro de GDM
  app.post('/gdm', (req, res) => {
    const gdm = req.body;

    Atendimento.cadastroGdm(gdm, res);
  });

  //Cria Rota de cadastro de GDM
  app.post('/tipoministerio', (req, res) => {
    const tipo = req.body;

    Atendimento.cadastroTipoMinisterio(tipo, res);
  });

  //Cria Rota de cadastro de Membro
  app.post('/membros', (req, res) => {
    const membro = req.body;

    Atendimento.cadastroMembro(membro, res);
  });

  //Cria Rota de cadastro de Membro em ministerio
  app.post('/membrosministerio', (req, res) => {
    const membro = parseInt(req.body.id_membro);
    const ministerio = parseInt(req.body.id_ministerio);

    Atendimento.cadastroMembroMinisterio(membro, ministerio, res);
  });

  //-----------------------------------------------------------------------------------------

  // Faz alteração no lider de gdm's cadastrados
  app.patch('/lidergdm/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const membro = req.body;

    Atendimento.cadastraLiderGdm(id, membro, res);
  });

  // Faz alteração no lider de ministerios cadastrados
  app.patch('/liderministerio/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const membro = req.body;

    Atendimento.cadastraLiderMinisterio(id, membro, res);
  });

  // Exclui Atendimento especificado pelo id ------------------------------------------------------------------------------------------------------
  //   app.delete('/atendimentos/:id', (req, res) => {
  //     const id = parseInt(req.params.id);

  //     Atendimento.deletaAtendimento(id, res);
  //   });
};
