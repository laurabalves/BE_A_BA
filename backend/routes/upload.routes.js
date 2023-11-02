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
      },
    });

    const campos = await prisma.campo.findMany({
      where: {
        idtemplate: idtemplateInt,
      },
    });

    const urlPython = "http://127.0.0.1:5000/validate-upload"; // Substitua pela URL correta
    // const formData = new FormData();
    // const fileBlob = createReadStream(path);

    // Adicione o arquivo ao FormData
    // formData.append("file", fileBlob, {
    //   filename: originalname,
    // });
    // formData.append("idtemplate", idtemplate);
    // formData.append("idusuario", idusuario);
    const headers = {
      // ...formData.getHeaders(),
      "Content-Type": "application/json", // Defina o Content-Type como application/json
    };

    const body = {
      path,
      colunas: campos,
    };

    console.log(body);
    const teste = await axios.post(urlPython, body, {
      headers,
    });

    res.status(201).json(upload);
  } catch (error) {
    console.error(error);

    res
      .status(500)
      .json({ error: "Ocorreu um erro ao fazer upload do arquivo." });
  }
});
