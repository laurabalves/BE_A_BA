CREATE TABLE beaba.Usuario (
	idUsuario SERIAL NOT NULL,
    nome varchar(100) not null,
    matricula varchar(50) not null,
    isAdm boolean,
    email varchar(50) not null,
    senha varchar(50) not null,
    PRIMARY KEY (idUsuario)
);


CREATE TABLE beaba.CriarTemplate (
  idCriarTemplate SERIAL NOT NULL,
  nome_template VARCHAR(100),
  extensao VARCHAR(50),
  data_criacao TIMESTAMP,
  status VARCHAR(50),
  idUsuario INT, --  coluna que armazenará a chave estrangeira
  PRIMARY KEY (idCriarTemplate),
  FOREIGN KEY (idUsuario) REFERENCES beaba.Usuario(idUsuario) -- chave estrangeira
);
	

 create table beaba.Campo(
	idCampo SERIAL not null,
	nome_campo varchar (50)not null,
	tipo VARCHAR (50) not null,
	idCriarTemplate INT not null,
	primary key (idCampo),
	foreign key (idCriarTemplate) references beaba.CriarTemplate(idCriarTemplate)
);

create table beaba.Upload(
	idUpload SERIAL not null,
	nome_arquivo varchar(100) not null,
	path varchar(100) not null,
	data timestamp(10) not null,
	idCriarTemplate int not null,
	idUsuario int not null,
	primary key (idUpload),
	foreign key (idUsuario) references beaba.CriarTemplate(idCriarTemplate)

);
 
-- INSERT INTO beaba.Usuario (nome,matricula,isAdm,email,senha) VALUES ('Laura Beatriz','111',true,'laura@email.com','123');
-- INSERT INTO beaba.Usuario (nome,matricula,isAdm,email,senha) VALUES ('Eliete Alves','112',false,'eliete@email.com','123');

-- select * from beaba.usuario where email='laura@email.com' and senha='123'