import { Router } from "express";
import multer from "multer";
const path = "path";
import { prisma } from "../server.js";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";
import { createReadStream } from "fs";
export const uploadRoutes = Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(
      null,
      "C:/Users/980190/Documents/BE_A_BA/projetos/BE_A_BA/python/arquivos"
    ); // Pasta onde os arquivos serão armazenados temporariamente
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage, // Use a configuração de storage em vez do destino
});

let idtemplate = null;
let idusuario = null;
uploadRoutes.post("/", upload.single("file"), async (req, res) => {
  try {
    const { originalname, path } = req.file;
    const idtemplate = req.query.idtemplate || req.body.idtemplate;
    const idusuario = req.query.idusuario || req.body.idusuario;

    const idtemplateInt = parseInt(idtemplate, 10);
    const idusuarioInt = parseInt(idusuario, 10);

    if (isNaN(idtemplateInt) || isNaN(idusuarioInt)) {
      return res.status(400).json({
        error: "idtemplate e idusuario devem ser números inteiros válidos.",
      });
    }

    // Agora você pode usá-las com segurança
    const upload = await prisma.upload.create({
      data: {
        nome_arquivo: originalname,
        path,
        data: new Date(),
        idtemplate: idtemplateInt,
        idusuario: idusuarioInt,
        status: "validando",
      },
    });
    console.log("upload => ", upload);

    const campos = await prisma.campo.findMany({
      where: {
        idtemplate: idtemplateInt,
      },
    });

    const urlPython = "http://127.0.0.1:5000/validate-upload"; // Substitua pela URL correta

    const headers = {
      "Content-Type": "application/json", // Defina o Content-Type como application/json
    };

    const body = {
      idupload: upload.idupload,
      path,
      colunas: campos,
    };

    console.log(body);
    axios.post(urlPython, body, {
      headers,
    });

    console.log("pos python");
    return res.status(201).json(upload);
  } catch (error) {
    console.error(error);

    return res
      .status(400)
      .json({ error: "Ocorreu um erro ao fazer upload do arquivo." });
  }
});

uploadRoutes.post("/is-template-valid", async (req, res) => {
  const error = req.body.error;
  const idupload = req.body.idupload;

  const status = !error ? "validado" : "invalido";

  const updated = await prisma.upload.update({
    where: {
      idupload: Number(idupload),
    },
    data: {
      status,
    },
  });

  console.log("updated => ", updated);

  return res.json(updated);
});

uploadRoutes.get("/resgatar-arquivos", async (req, res) => {
  try {
    const allarquivos = await prisma.upload.findMany({
      select: {
        idupload: true,
        nome_arquivo: true,
        idusuario: true,
        criartemplate: {
          select: {
            nome: true,
          },
        },
      },
    });
    res.json(allarquivos);
  } catch (error) {
    console.error("Erro ao acessar todos os arquivos cadastrados:", error);
    res.status(500).send("Erro ao acessar todos os arquivos cadastrados");
  }
});

uploadRoutes.get("/arquivos/:id", async (req, res) => {
  const arq = parseInt(req.params.id);
  try {
    const arquivo = await prisma.upload.findUnique({
      where: {
        idupload: arq,
      },
    });

    if (arquivo) {
      res.json(arquivo);
    } else {
      res.status(404).json({ error: "Arquivo não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar o arquivo" });
  }
});

uploadRoutes.get("/download/:idupload", async (req, res) => {
  const idupload = parseInt(req.params.idupload);

  const upload = await prisma.upload.findUnique({
    where: {
      idupload: idupload,
    },
  });

  if (!upload) {
    res.status(404).send("Arquivo não encontrado");
    return;
  }

  const filePath = upload.path;
  console.log(filePath);
  // Envia o arquivo para o cliente
  res.setHeader(
    "Content-Disposition",
    'attachment; filename="' + upload.nome_arquivo + '"'
  );
  res.sendFile(filePath);
});

uploadRoutes.get("/is-template-valid/:idupload", async (req, res) => {
  const idupload = parseInt(req.params.idupload);

  try {
    const upload = await prisma.upload.findUnique({
      where: {
        idupload: idupload,
      },
    });

    if (upload) {
      res.json({ status: upload.status });
    } else {
      res.status(404).json({ status: "Upload não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar o status do upload", error);
    res.status(500).json({ status: "Erro interno do servidor" });
  }
});
