const conexao = require('../infraestrutura/conexao');

class Votacao {
  // cadastro de Eleitores
  cadastroCargo(cargo, res) {
    const sql =
      'INSERT INTO cargos(nome_cargo) SELECT x.nome_cargo  FROM (SELECT $1 nome_cargo) x WHERE NOT EXISTS(SELECT 1 FROM cargos c WHERE UPPER (c.nome_cargo) = UPPER (x.nome_cargo))';
    conexao.query(sql, [cargo.cargo], (erro, resultados) => {
      if (erro) {
        console.log(erro);
      } else {
        if (resultados.rowCount == 0) {
          res.status(200).json('Cargo já cadastrado');
        } else {
          res.status(200).json('Cargo cadastrado com sucesso');
        }
      }
    });
  }

  cadastroMinisterio(ministerio, tipo, res) {
    const sql = `INSERT INTO ministerios(nome_ministerio, tipo_ministerio)SELECT x.nome_ministerio,x.tipo_ministerio  FROM (SELECT '${ministerio.ministerio}' nome_ministerio, ${tipo} tipo_ministerio) x WHERE NOT EXISTS(SELECT 1 FROM ministerios m WHERE UPPER (m.nome_ministerio) = UPPER (x.nome_ministerio))`;
    conexao.query(sql, [], (erro, resultados) => {
      if (erro) {
        console.log(erro);
      } else {
        if (resultados.rowCount == 0) {
          res.status(200).json('Ministerio já cadastrado');
        } else {
          res.status(200).json('Ministerio cadastrado com sucesso');
        }
      }
    });
  }

  cadastroGdm(gdm, res) {
    const sql = `INSERT INTO gdm(nome_gdm)SELECT x.nome_gdm  FROM (SELECT '${gdm.gdm}' nome_gdm) x WHERE NOT EXISTS(SELECT 1 FROM gdm g WHERE UPPER (g.nome_gdm) = UPPER (x.nome_gdm))`;
    conexao.query(sql, [], (erro, resultados) => {
      if (erro) {
        console.log(erro);
      } else {
        if (resultados.rowCount == 0) {
          res.status(200).json('GDM já cadastrado');
        } else {
          res.status(200).json('GDM cadastrado com sucesso');
        }
      }
    });
  }

  cadastroTipoMinisterio(tipo, res) {
    const sql =
      'INSERT INTO tipos_ministerio(tipo) SELECT x.tipo FROM (SELECT $1 tipo) x WHERE NOT EXISTS(SELECT 1 FROM tipos_ministerio t WHERE UPPER (t.tipo) = UPPER (x.tipo))';
    conexao.query(sql, [tipo.tipo], (erro, resultados) => {
      if (erro) {
        console.log(erro);
      } else {
        if (resultados.rowCount == 0) {
          res.status(200).json('Tipo de Ministerio já cadastrado');
        } else {
          res.status(200).json('Tipo de Ministerio cadastrado com sucesso');
        }
      }
    });
  }

  cadastroMembro(membro, res) {
    const sql = `INSERT INTO membros(nome,sexo, data_nasc, estado_civil, cpf, endereco, cel, email, data_entrada_igreja, batizado, data_batismo, cargo, ministerio, gdm)SELECT x.nome, x.sexo, x.data_nasc, x.estado_civil, x.cpf, x.endereco, x.cel, x.email, x.data_entrada_igreja, x.batizado, x.data_batismo, x.cargo, x.ministerio,x.gdm  FROM (SELECT '${membro.nome}'	nome, '${membro.sexo}'	sexo, '${membro.data_nasc}'::date	data_nasc, '${membro.estado_civil}'	estado_civil, ${membro.cpf}	cpf, ${membro.endereco}	endereco, ${membro.cel}	cel, '${membro.email} '	email, '${membro.data_entrada_igreja} '::date	data_entrada_igreja, '${membro.batizado} '::boolean	batizado,'${membro.data_batismo} '::date	data_batismo, ${membro.cargo}	cargo, ${membro.ministerio}	ministerio, ${membro.gdm}	gdm) x WHERE NOT EXISTS(SELECT 1 FROM membros	m WHERE UPPER (m.nome) = UPPER (x.nome)OR m.cpf::bigint = x.cpf);`;
    conexao.query(sql, [], (erro, resultados) => {
      if (erro) {
        console.log(erro);
      } else {
        if (resultados.rowCount == 0) {
          res.status(202).json('Membro já cadastrado');
        } else {
          res.status(200).json('Membro cadastrado com sucesso');
        }
      }
    });
  }

  cadastroMembroMinisterio(membro, ministerio, res) {
    const sql = `INSERT INTO public.membros_ministerios(membro, ministerio)VALUES( ${membro}, ${ministerio});`;
    conexao.query(sql, [], (erro, resultados) => {
      if (erro) {
        console.log(erro);
      } else {
        res.status(200).json('Membro cadastrado no ministerio com sucesso');
      }
    });
  }

  // --------------------------------------------------------------------------------------------------
  
  // Lista todos os atendimentos Cadastrados
  buscaMembroPorId(id, res) {
    const sql = `select * from membros where membros.id=${id}`;

    conexao.query(sql, (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados.rows);
      }
    });
  }

  // // Lista todos os Especialidades Cadastradas
  // listaEspecialidades(res) {
  //   const sql = 'SELECT * FROM Especialidades';

  //   conexao.query(sql, (erro, resultados) => {
  //     if (erro) {
  //       res.status(400).json(erro);
  //     } else {
  //       res.status(200).json(resultados.rows);
  //     }
  //   });
  // }

  // // Lista todos os Pacientes Cadastradas
  // listaPacientes(res) {
  //   const sql = 'SELECT * FROM Pacientes';

  //   conexao.query(sql, (erro, resultados) => {
  //     if (erro) {
  //       res.status(400).json(erro);
  //     } else {
  //       res.status(200).json(resultados.rows);
  //     }
  //   });
  // }

  // // Lista atendimento especificado pelo id---------------------------------------------------------------------------------
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

  // // Lista Especialidade especifica pelo id
  // buscaEspecialidadePorId(id, res) {
  //   const sql = `SELECT * FROM Especialidades WHERE id=${id}`;

  //   conexao.query(sql, (erro, resultados) => {
  //     const atendimento = resultados.rows[0];
  //     if (erro) {
  //       res.status(400).json(erro);
  //     } else {
  //       res.status(200).json(atendimento);
  //     }
  //   });
  // }

  // // Lista Paciente especificado pelo id
  // buscaPacientePorId(id, res) {
  //   const sql = `SELECT * FROM Pacientes WHERE id=${id}`;

  //   conexao.query(sql, (erro, resultados) => {
  //     const atendimento = resultados.rows[0];
  //     if (erro) {
  //       res.status(400).json(erro);
  //     } else {
  //       res.status(200).json(atendimento);
  //     }
  //   });
  // }

  //--------------------------------------------------------------------------------------
  // Altera lider de GDM especificado pelo id
  cadastraLiderGdm(id, membro, res) {
    const sql = `UPDATE gdm SET lider_gdm=${membro.id_membro} WHERE gdm.id=${id}`;

    conexao.query(sql, [], (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  // Altera lider de ministerio especificado pelo id
  cadastraLiderMinisterio(id, membro, res) {
    const sql = `UPDATE ministerios SET lider_ministerio=${membro.id_membro} WHERE ministerios.id=${id}`;

    conexao.query(sql, [], (erro, resultados) => {
      if (erro) {
        res.status(400).json(erro);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

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

  // // Altera Especialidade especificado pelo id
  // alteraEspecialidade(id, valores, res) {
  //   const sql =
  //     'UPDATE especialidades SET especialidade = ($1)  WHERE id = ($2);';

  //   conexao.query(sql, [valores.especialidade, id], (erro, resultados) => {
  //     if (erro) {
  //       res.status(400).json(erro);
  //     } else {
  //       res.status(200).json(resultados);
  //     }
  //   });
  // }

  // // Altera Atendimento especificado pelo id
  // alteraAtendimento(id, valores, res) {
  //   const sql =
  //     'UPDATE atendimentos SET id_paciente = ($1), data_consulta = ($2), id_especialidade = ($3)  WHERE id = ($4);';

  //   conexao.query(
  //     sql,
  //     [valores.paciente, valores.dataConsulta, valores.especialidade, id],
  //     (erro, resultados) => {
  //       if (erro) {
  //         res.status(400).json(erro);
  //       } else {
  //         res.status(200).json(resultados);
  //       }
  //     }
  //   );
  // }

  // // Exclui Atendimento especificado pelo id ------------------------------------------------------------------------------
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

  // // Exclui Especialidade especificado pelo id
  // deletaEspecialidade(id, res) {
  //   const sql = 'DELETE FROM Especialidades WHERE id=($1)';

  //   conexao.query(sql, [id], (erro, resultados) => {
  //     if (erro) {
  //       res.status(400).json(erro);
  //     } else {
  //       res.status(200).json(resultados);
  //     }
  //   });
  // }

  // // Exclui Paciente especificado pelo id
  // deletaPaciente(id, res) {
  //   const sql = 'DELETE FROM Pacientes WHERE id=($1)';

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
