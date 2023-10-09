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


--TABELAS NOVASSSSS--
CREATE TABLE beaba.usuario (
	idUsuario SERIAL NOT NULL,
    nome varchar(100) not null,
    matricula varchar(50) not null,
    isadm boolean,
    email varchar(50) not null,
    senha varchar(50) not null,
    PRIMARY KEY (idUsuario)
);

select * from beaba.usuario


CREATE TABLE beaba.template (
  idtemplate SERIAL NOT NULL,
  nome_template VARCHAR(100),
  extensao VARCHAR(50),
  data_criacao TIMESTAMP,
  status boolean,
  idUsuario INT, 
  PRIMARY KEY (idtemplate),
  FOREIGN KEY (idUsuario) REFERENCES beaba.Usuario(idUsuario)
);

insert into beaba.criartemplate (nome_template, extensao, data_criacao,status,idusuario) values ('textil', 'CSV','2023-10-03 14:01:10-10','Ativo', '1')
insert into beaba.criartemplate (nome_template, extensao, data_criacao,status,idusuario) values ('promoções', 'XLSX','2020-10-03 14:01:10-10','Desativado', '2')
insert into beaba.criartemplate (nome_template, extensao, data_criacao,status,idusuario) values ('promoções', 'XLSX','2020-10-03 14:01:10-10','Desativado', '2')
	
select * from beaba.template  
 
create table beaba.campo(
	idCampo SERIAL not null,
	nome_campo varchar (50)not null,
	tipo VARCHAR (50) not null,
	idtemplate INT not null,
	primary key (idCampo),
	foreign key (idTemplate) references beaba.template(idTemplate)
);
	


select * from beaba.campo

create table beaba.upload(
	idUpload SERIAL not null,
	nome_arquivo varchar(100) not null,
	path varchar(100) not null,
	data timestamp(10) not null,
	idtemplate int not null,
	idUsuario int not null,
	primary key (idUpload),
	foreign key (idUsuario) references beaba.usuario(idusuario),
	foreign key (idTemplate) references beaba.template(idtemplate)

);
select * from beaba.Upload