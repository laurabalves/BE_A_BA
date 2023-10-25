-- CreateTable
CREATE TABLE "campo" (
    "idcampo" SERIAL NOT NULL,
    "nome_campo" VARCHAR(50) NOT NULL,
    "tipo" VARCHAR(50) NOT NULL,
    "idtemplate" INTEGER NOT NULL,

    CONSTRAINT "campo_pkey" PRIMARY KEY ("idcampo")
);

-- CreateTable
CREATE TABLE "upload" (
    "idupload" SERIAL NOT NULL,
    "nome_arquivo" VARCHAR(100) NOT NULL,
    "path" VARCHAR(100) NOT NULL,
    "data" TIMESTAMP(6) NOT NULL,
    "idtemplate" INTEGER NOT NULL,
    "idusuario" INTEGER NOT NULL,

    CONSTRAINT "upload_pkey" PRIMARY KEY ("idupload")
);

-- CreateTable
CREATE TABLE "usuario" (
    "idusuario" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "matricula" VARCHAR(50) NOT NULL,
    "isadm" BOOLEAN,
    "email" VARCHAR(50) NOT NULL,
    "senha" VARCHAR(50) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("idusuario")
);

-- CreateTable
CREATE TABLE "template" (
    "idtemplate" SERIAL NOT NULL,
    "nome_template" VARCHAR(100),
    "extensao" VARCHAR(50),
    "data_criacao" TIMESTAMP(6),
    "status" BOOLEAN,
    "idusuario" INTEGER,

    CONSTRAINT "template_pkey" PRIMARY KEY ("idtemplate")
);

-- AddForeignKey
ALTER TABLE "campo" ADD CONSTRAINT "campo_idtemplate_fkey" FOREIGN KEY ("idtemplate") REFERENCES "template"("idtemplate") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "upload" ADD CONSTRAINT "upload_idtemplate_fkey" FOREIGN KEY ("idtemplate") REFERENCES "template"("idtemplate") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "upload" ADD CONSTRAINT "upload_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "usuario"("idusuario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "template" ADD CONSTRAINT "template_idusuario_fkey" FOREIGN KEY ("idusuario") REFERENCES "usuario"("idusuario") ON DELETE NO ACTION ON UPDATE NO ACTION;
