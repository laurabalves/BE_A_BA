import { Router } from "express";
import { prisma } from "../server.js";
import axios from "axios";
import path from "path";

export const templatesRoutes = Router();

//rota para criar template
templatesRoutes.post("/", async (req, res) => {
  const { nomeTemplate, extensao, idusuario, colunas } = req.body;

  try {
    const novoTemplate = await prisma.template.create({
      data: {
        nome_template: nomeTemplate,
        extensao,
        data_criacao: new Date(),
        status: false,
        idusuario,
      },
    });

    const campos = colunas.map((col) => {
      return { ...col, idtemplate: novoTemplate.idtemplate };
    });

    const totalDeCamposInseridos = await prisma.campo.createMany({
      data: campos,
    });

    const { data: pathTemplate } = await axios.post(
      "http://127.0.0.1:5000/criar-template-2",
      {
        nomeTemplate,
        extensao,
        colunas,
      }
    );

    await prisma.template.update({
      where: { idtemplate: novoTemplate.idtemplate },
      data: {
        path: pathTemplate,
      },
    });

    res.status(201).json({
      created: true,
      template: novoTemplate,
      totalCampos: totalDeCamposInseridos,
    });
  } catch (erro) {
    console.error("Erro ao criar template:", erro);
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

//rota para atualizar templates
templatesRoutes.put("/:templateId", async (req, res) => {
  const templateId = parseInt(req.params.templateId);
  const isActive = req.body.isActive;

  console.log(templateId, "Status:", isActive);

  try {
    const template = await prisma.template.update({
      where: { idtemplate: templateId },
      data: { status: isActive },
    });

    res.json(template);
  } catch (erro) {
    console.error("Erro ao atualizar o template:", erro);
    res.status(500).json({ error: "Erro no servidor." });
  }
});

// rota para fazer o download do arquivo
templatesRoutes.get("/:id", async (req, res) => {
  const idTemplate = parseInt(req.params.id);

  try {
    const template = await prisma.template.findUnique({
      where: { idtemplate: idTemplate },
    });

    if (!template.path) {
      return res.status(400).json({ message: "File not found" });
    }

    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${template.nome_template}.${template.extensao}"`
    );
    if (template) {
      res.sendFile(template.path);
    } else {
      res.status(404).json({ error: "Template não encontrado" });
    }
  } catch (error) {
    console.error("Erro ao buscar o template:", error);
    res.status(500).json({ error: "Erro no servidor" });
  }
});
