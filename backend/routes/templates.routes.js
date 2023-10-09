import { Router } from "express";
import { prisma } from "../server.js";

export const templatesRoutes = Router();

//rota para criar template
templatesRoutes.post("/", async (req, res) => {
  const { nome_template, extensao, data_criacao, status, idusuario } = req.body;

  try {
    const novoTemplate = await prisma.template.create({
      data: {
        nome_template,
        extensao,
        data_criacao,
        status,
        idusuario,
      },
    });

    res.status(201).json(novoTemplate);
  } catch (erro) {
    console.error("Erro ao criar usuário:", erro);
    res.status(500).json({ error: "Erro ao criar template." });
  }
});

//rota para listar todos os templates por usuario
templatesRoutes.get("/usuario/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const templates = await prisma.template.findMany({
      where: {
        idusuario: Number(id),
      },
      include: {
        campo: true,
        usuario: true,
      },
    });

    res.json(templates);
  } catch (erro) {
    console.error("Erro ao listar templates de um usuário:", erro);
    res.status(500).json({ error: "Erro ao listar templates de um usuário." });
  }
});

//rota para mostrar todos os templates existentes
templatesRoutes.get("/alltemplates", async (req, res) => {
  try {
    const alltemaplates = await prisma.template.findMany({
      include: {
        usuario: true,
      },
    });
    res.json(alltemaplates);
  } catch (error) {
    console.error("Erro ao acessar todos os templates cadastrados:", error);
    res.status(500).send("Erro ao acessar todos os templates cadastrados");
  }
});

//rota para criar os campos do templates
templatesRoutes.post("/campo", async (req, res) => {
  const { campo } = req.body;

  try {
    const totalDeCamposInseridos = await prisma.campo.createMany({
      data: campo,
    });

    res.status(201).json(totalDeCamposInseridos);
  } catch (erro) {
    console.error("Erro ao criar campo de template:", erro);
    res.status(500).json({ error: "Erro ao criar campo de template." });
  }
});
