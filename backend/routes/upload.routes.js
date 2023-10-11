import { Router } from "express";
import multer from "multer";
const path = "path";
import { prisma } from "../server.js";

export const uploadRoutes = Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "routes/upload/"); // Pasta onde os arquivos serão armazenados temporariamente
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

uploadRoutes.post("/", upload.single("csvFile"), async (req, res) => {
  try {
    const { originalname, path } = req.file;

    // Defina as variáveis idtemplate e idusuario com os valores apropriados
    const idtemplate = 1; // Substitua pelo ID apropriado
    const idusuario = 1; // Substitua pelo ID apropriado

    // Insira os dados no banco de dados usando o Prisma
    const upload = await prisma.upload.create({
      data: {
        nome_arquivo: originalname,
        path,
        data: new Date(),
        idtemplate,
        idusuario,
      },
    });

    res.status(201).json(upload);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Ocorreu um erro ao fazer upload do arquivo CSV." });
  }
});
