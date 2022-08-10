const conexao = require('../infraestrutura/conexao');

class Votacao {
  // cadastro de Eleitores
  cadastroEleitores(eleitor, res) {
    const sql = `INSERT INTO eleitores(nome_eleitor, cpf_eleitor, matricula_eleitor) SELECT x.nome_eleitor,x.cpf_eleitor,x.matricula_eleitor FROM (SELECT '${eleitor.nome}' nome_eleitor,'${eleitor.cpf}' cpf_eleitor,'${eleitor.matricula}' matricula_eleitor) x WHERE NOT EXISTS ( SELECT 1 FROM eleitores e WHERE UPPER (e.cpf_eleitor) = UPPER (x.cpf_eleitor));`;
    conexao.query(sql, [], (erro, resultados) => {
      if (erro) {
        console.log(erro);
      } else {
        if (resultados.rowCount == 0) {
          res.status(200).json('Eleitor já cadastrado');
        } else {
          res.status(200).json('Eleitor cadastrado com sucesso');
        }
      }
    });
  }

  // cadastro de Candidatos
  cadastroCandidatos(candidato, res) {
    const sql = `INSERT INTO candidatos (nome_candidato, cpf_candidato, matricula_candidato, numero_candidato, id_turno) SELECT x.nome_candidato, x.cpf_candidato, x.matricula_candidato, x.numero_candidato, x.id_turno FROM (SELECT '${candidato.nome}' nome_candidato, '${candidato.cpf}' cpf_candidato, '${candidato.matricula}' matricula_candidato, '${candidato.numero}' numero_candidato, ${candidato.turno} id_turno) x WHERE NOT EXISTS ( SELECT 1 FROM candidatos c WHERE UPPER (c.cpf_candidato) = UPPER (x.cpf_candidato) AND  (c.id_turno) = UPPER (x.id_turno) );`;
    conexao.query(sql, [], (erro, resultados) => {
      if (erro) {
        console.log(erro);
      } else {
        if (resultados.rowCount == 0) {
          res.status(204).json('Candidato já cadastrado');
        } else {
          res.status(200).json('Candidato cadastrado com sucesso');
        }
      }
    });
  }

  // cadastro de Turno
  cadastroTurno(turno, res) {
    const sql = `INSERT INTO turnos (nome_turno, status_turno )SELECT x.nome_turno, x.status_turno FROM (SELECT '${turno.nome}' nome_turno, false status_turno) x WHERE NOT EXISTS( SELECT 1 FROM turnos t WHERE (t.status_turno) = false);`;
    conexao.query(sql, [], (erro, resultados) => {
      if (erro) {
        console.log(erro);
      } else {
        if (resultados.rowCount == 0) {
          res
            .status(200)
            .json(
              'Turno em andamento, finalize o turno atual, para iniciar o próximo'
            );
        } else {
          res.status(200).json('Turno iniciado com sucesso');
        }
      }
    });
  }

  // cadastro de Voto
  validaVoto(voto, res) {
    const sql = `INSERT INTO voto_eleitor(id_eleitor, id_turno, status_voto_eleitor )SELECT x.id_eleitor, x.id_turno, x.status_voto_eleitor FROM (SELECT ${voto.eleitor} id_eleitor, ${voto.turno} id_turno, true status_voto_eleitor ) x WHERE NOT EXISTS(SELECT 1 FROM voto_eleitor t WHERE(t.id_eleitor) = (x.id_eleitor) AND (t.status_voto_eleitor) = true AND(t.id_turno) = (x.id_turno));`;
    conexao.query(sql, [], (erro, resultados) => {
      if (erro) {
        // console.log(erro);
        res.status(400).json('Eleitor Não Existe');
      } else {
        if (resultados.rowCount == 0) {
          res.status(200).json('Eleitor já votou');
        } else {
          res.status(200).json('Voto registrado');
          this.cadasteraVotoValido(voto);
        }
      }
    });
  }

  // cadastro de Voto Validado
  cadasteraVotoValido(voto) {
    const sql = `INSERT INTO public.votos(id_candidato, id_turno)VALUES (${voto.candidato},${voto.turno});`;
    conexao.query(sql, [], (erro, resultados) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log(resultados);
      }
    });
  }

  // ----------------------------------------------------------------------------------------------------------------------
  // Lista todos os Candidatos Cadastradas
  listaCandidatos(id, res) {
    const sql = `select * from candidatos WHERE id_turno = (select id_turno from turnos where id_turno = ${id})`;

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados.rows);
      }
    });
  }

  // Lista Resultado por turno
  listaResultados(id, res) {
    const sql = `SELECT count(c.nome_candidato), c.nome_candidato FROM votos v INNER JOIN candidatos c ON v.id_candidato = c.id_candidato WHERE v.id_turno = ${id} GROUP BY c.nome_candidato ORDER BY count(c.nome_candidato) DESC;`;

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados.rows);
      }
    });
  }

  listaEleitores(res) {
    const sql = 'SELECT * FROM eleitores';

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados.rows);
      }
    });
  }

  //----------------------------------------------------------------------------------------------------------------------------
  // Altera lider de GDM especificado pelo id

  finalizaTurno(turno, res) {
    const sql = `UPDATE public.turnos SET  status_turno = true	WHERE status_turno = false;`;

    conexao.query(sql, [], (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        if (resultados.rowCount == 0) {
          res.status(200).json('Não há turnos abertos');
        } else {
          res.status(200).json('Turno finalizado com sucesso');
        }
      }
    });
  }
  //----------------------------------------------------------------------------------------------------------------------------
  // // Exclui Atendimento especificado pelo id
  // deletaAtendimento(id, res) {
  //   const sql = 'DELETE FROM Atendimentos WHERE id=($1)';

  //   conexao.query(sql, [id], (erro, resultados) => {
  //     if (erro) {
  //       res.status(400).json(erro);
  //       console.log(sql);
  //     } else {
  //       res.status(200).json(resultados);
  //     }
  //   });
  // }
}
module.exports = new Votacao();
