class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarEleitores();
    this.criarCandidatos();
    this.criarTurnos();
    this.criarVotos();
    this.criarVotoEleitor();

  }

  criarEleitores() {
    const sql =
      'CREATE TABLE IF NOT EXISTS eleitores (id_eleitor serial NOT NULL, nome_eleitor varchar(40) NOT NULL, cpf_eleitor varchar(20) NOT NULL, matricula_eleitor varchar(10) NOT NULL, PRIMARY KEY (id_eleitor));';

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log('Tabela Eleitores criada com sucesso');
      }
    });
  }

  criarCandidatos() {
    const sql =
      'CREATE TABLE IF NOT EXISTS candidatos (id_candidato serial NOT NULL, nome_candidato varchar(40) NOT NULL, cpf_candidato varchar(20) NOT NULL,matricula_candidato varchar(20) NOT NULL,numero_candidato varchar(10) NOT NULL,PRIMARY KEY (id_candidato));';

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log('Tabela Candidatos criada com sucesso');
      }
    });
  }

  criarTurnos() {
    const sql =
      'CREATE TABLE IF NOT EXISTS turnos(id_turno serial NOT NULL, nome_turno varchar(40) NOT NULL, status_turno BOOLEAN, PRIMARY KEY (id_turno));';

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log('Tabela Turnos criada com sucesso');
      }
    });
  }

  criarVotos() {
    const sql =
      'CREATE TABLE IF NOT EXISTS votos(id_voto serial NOT NULL, id_candidato integer,id_turno integer,PRIMARY KEY (id_voto),FOREIGN KEY (id_candidato) REFERENCES candidatos (id_candidato),FOREIGN KEY (id_turno) REFERENCES turnos (id_turno));';

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log('Tabela Votos criada com sucesso');
      }
    });
  }

  criarVotoEleitor() {
    const sql =
      'CREATE TABLE IF NOT EXISTS voto_eleitor(id_voto_eleitor serial NOT NULL ,id_eleitor integer,id_turno integer,status_voto_eleitor BOOLEAN,PRIMARY KEY (id_voto_eleitor),FOREIGN KEY (id_eleitor) REFERENCES eleitores (id_eleitor),FOREIGN KEY (id_turno) REFERENCES turnos (id_turno));';

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log('Tabela Voto_Eleitor criada com sucesso');
      }
    });
  }
}

module.exports = new Tabelas();
