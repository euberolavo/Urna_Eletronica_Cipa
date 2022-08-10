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
    const sql = `INSERT INTO candidatos (nome_candidato, cpf_candidato, matricula_candidato, numero_candidato) SELECT x.nome_candidato, x.cpf_candidato, x.matricula_candidato, x.numero_candidato FROM (SELECT '${candidato.nome}' nome_candidato, '${candidato.cpf}' cpf_candidato, '${candidato.matricula}' matricula_candidato, '${candidato.numero}' numero_candidato) x WHERE NOT EXISTS ( SELECT 1 FROM candidatos c WHERE UPPER (c.cpf_candidato) = UPPER (x.cpf_candidato));`;
    conexao.query(sql, [], (erro, resultados) => {
      if (erro) {
        console.log(erro);
      } else {
        if (resultados.rowCount == 0) {
          res.status(200).json('Candidato já cadastrado');
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

  // cadastroTipoMinisterio(tipo, res) {
  //   const sql =
  //     'INSERT INTO tipos_ministerio(tipo) SELECT x.tipo FROM (SELECT $1 tipo) x WHERE NOT EXISTS(SELECT 1 FROM tipos_ministerio t WHERE UPPER (t.tipo) = UPPER (x.tipo))';
  //   conexao.query(sql, [tipo.tipo], (erro, resultados) => {
  //     if (erro) {
  //       console.log(erro);
  //     } else {
  //       if (resultados.rowCount == 0) {
  //         res.status(200).json('Tipo de Ministerio já cadastrado');
  //       } else {
  //         res.status(200).json('Tipo de Ministerio cadastrado com sucesso');
  //       }
  //     }
  //   });
  // }

  // cadastroMembroMinisterio(membro, ministerio, res) {
  //   const sql = `INSERT INTO public.membros_ministerios(membro, ministerio)VALUES( ${membro}, ${ministerio});`;
  //   conexao.query(sql, [], (erro, resultados) => {
  //     if (erro) {
  //       console.log(erro);
  //     } else {
  //       res.status(200).json('Membro cadastrado no ministerio com sucesso');
  //     }
  //   });
  // }

  // ----------------------------------------------------------------------------------------------------------------------
  // Lista todos os Especialidades Cadastradas
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

  // // Lista todos os atendimentos Cadastrados

  // buscaMembroPorId(id, res) {
  //   const sql = `select * from membros where membros.id=${id}`;

  //   conexao.query(sql, (erro, resultados) => {
  //     if (erro) {
  //       res.status(400).json(erro);
  //     } else {
  //       res.status(200).json(resultados.rows);
  //     }
  //   });
  // }

  //-------------------------------------------------------------------------------------------------------------------------
  // // Lista atendimento especificado pelo id

  // buscaAtendimentoPorId(id, res) {
  //   const sql = `SELECT atendimentos.id, pacientes.nome_paciente, pacientes.data_nasc_paciente, atendimentos.data_consulta, especialidades.especialidade FROM atendimentos INNER JOIN pacientes ON atendimentos.id_paciente = pacientes.id INNER JOIN especialidades ON atendimentos.id_especialidade = especialidades.id WHERE atendimentos.id = ${id}`;

  //   conexao.query(sql, (erro, resultados) => {
  //     const atendimento = resultados.rows[0];
  //     if (erro) {
  //       res.status(400).json(erro);
  //     } else {
  //       res.status(200).json(atendimento);
  //     }
  //   });
  // }

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

  // cadastraLiderGdm(id, membro, res) {
  //   const sql = `UPDATE gdm SET lider_gdm=${membro.id_membro} WHERE gdm.id=${id}`;

  //   conexao.query(sql, [], (erro, resultados) => {
  //     if (erro) {
  //       res.status(400).json(erro);
  //     } else {
  //       res.status(200).json(resultados);
  //     }
  //   });
  // }

  // // Altera paciente especificado pelo id
  // alteraPaciente(id, valores, res) {
  //   const sql =
  //     'UPDATE pacientes SET nome_paciente = ($1) , data_nasc_paciente = ($2), cpf_paciente = ($3)  WHERE id = ($4);';

  //   conexao.query(
  //     sql,
  //     [valores.nome, valores.data_nasc, valores.cpf, id],
  //     (erro, resultados) => {
  //       if (erro) {
  //         res.status(400).json(erro);
  //       } else {
  //         res.status(200).json(resultados);
  //       }
  //     }
  //   );
  // }

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
