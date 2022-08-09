class Tabelas {
  init(conexao) {
    this.conexao = conexao;

    this.criarCargos();
    this.criarGdm();
    this.criarTiposMinisterios();
    this.criarMinisterios();
    this.criarMembros();
    this.criarMembrosMinisterios();
    this.criarLiderMinisterio();
    this.criarLiderGdm();
  }

  criarCargos() {
    const sql =
      'CREATE TABLE IF NOT EXISTS cargos(id serial NOT NULL, nome_cargo varchar(20) NOT NULL, PRIMARY KEY (id))';

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log('Tabela Cargos criada com sucesso');
      }
    });
  }

  criarGdm() {
    const sql =
      'CREATE TABLE IF NOT EXISTS gdm (id serial NOT NULL, nome_gdm varchar(20) NOT NULL, lider_gdm integer, PRIMARY KEY (id))';

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log('Tabela Gdm criada com sucesso');
      }
    });
  }

  criarMinisterios() {
    const sql =
      'CREATE TABLE IF NOT EXISTS ministerios (id serial NOT NULL, nome_ministerio varchar(20) NOT NULL, tipo_ministerio integer NOT NULL, lider_ministerio integer, PRIMARY KEY (id),FOREIGN KEY (tipo_ministerio) REFERENCES tipos_ministerio (id))';

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log('Tabela Ministerios criada com sucesso');
      }
    });
  }

  criarTiposMinisterios() {
    const sql =
      'CREATE TABLE IF NOT EXISTS tipos_ministerio (id serial NOT NULL ,tipo varchar(20) NOT NULL,PRIMARY KEY (id))';

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log('Tabela Tipos Ministerios criada com sucesso');
      }
    });
  }

  criarMembros() {
    const sql =
      'CREATE TABLE IF NOT EXISTS Membros (id serial NOT NULL , nome varchar(20) NOT NULL,sexo varchar(10) NOT NULL,data_nasc date,estado_civil varchar(10) NOT NULL,cpf char(20),endereço integer,cel char(20),email varchar(30),data_entrada_igreja date,batizado boolean,data_batismo date,cargo integer,gdm integer,PRIMARY KEY (id),FOREIGN KEY (cargo) REFERENCES cargos (id),FOREIGN KEY (ministerio) REFERENCES ministerios (id),FOREIGN KEY (gdm) REFERENCES gdm (id))';

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log('Tabela Membros criada com sucesso');
      }
    });
  }

  criarMembrosMinisterios() {
    const sql =
      'CREATE TABLE IF NOT EXISTS membros_ministerios (id serial NOT NULL , membro integer,ministerio integer,PRIMARY KEY (id),FOREIGN KEY (membro) REFERENCES membros (id),FOREIGN KEY (ministerio) REFERENCES ministerios (id))';

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log('Tabela Membros Ministerios criada com sucesso');
      }
    });
  }

  criarLiderGdm() {
    const sql =
      'CREATE TABLE IF NOT EXISTS lider_gdm (id serial NOT NULL , membro integer,gdm integer,PRIMARY KEY (id),FOREIGN KEY (membro) REFERENCES membros (id),FOREIGN KEY (gdm) REFERENCES gdm (id))';

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log('Tabela Líder GDM criada com sucesso');
      }
    });
  }
  criarLiderMinisterio() {
    const sql =
      'CREATE TABLE IF NOT EXISTS lider_ministerio (id serial NOT NULL , membro integer,ministerio integer,PRIMARY KEY (id),FOREIGN KEY (membro) REFERENCES membros (id),FOREIGN KEY (ministerio) REFERENCES ministerios (id))';

    this.conexao.query(sql, (erro) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log('Tabela Líder Ministerios criada com sucesso');
      }
    });
  }
}

module.exports = new Tabelas();
