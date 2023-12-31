import { Router } from "express";
import { prisma } from "../server.js";

export const usuariosRoutes = Router();

//rota para mostrar todos os usuarios
usuariosRoutes.get("/", async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json(usuarios);
  } catch (error) {
    console.error("Erro ao acessar o banco de dados:", error);
    res.status(500).send("Erro interno do servidor");
  }
});

//rota para mostar templates de acordo com id
usuariosRoutes.get("/:id/templates", async (req, res) => {
  const userId = parseInt(req.params.id);

  try {
    const templates = await prisma.criartemplate.findMany({
      where: {
        idusuario: userId,
      },
    });

    res.json(templates);
  } catch (error) {
    console.error("Erro ao acessar o banco de dados:", error);
    res.status(500).send("Erro interno do servidor");
  }
});

//atualizar permissoes

usuariosRoutes.put("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const { isadm } = req.body; // Agora estamos capturando "isadm" do corpo da solicitação

  console.log(" usuário:", userId);
  console.log("Dados no corpo da solicitação:", req.body);

  try {
    const updatedUser = await prisma.usuario.update({
      where: { idusuario: userId },
      data: { isadm },
    });

    console.log("Usuário atualizado com sucesso:", updatedUser);

    res.json(updatedUser);
  } catch (error) {
    console.error("Erro ao atualizar as permissões do usuário:", error);

    res.status(500).send("Erro interno do servidor");
  }
});

//ota para adicionar usuarios
usuariosRoutes.post("/", async (req, res) => {
  const { nome, matricula, isadm, email, senha } = req.body;

  try {
    // Crie o usuário no banco de dados usando o Prisma
    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        matricula,
        isadm,
        email,
        senha,
      },
    });

    res.status(201).json(novoUsuario);
  } catch (erro) {
    console.error("Erro ao criar usuário:", erro);
    res.status(500).json({ error: "Erro ao criar usuário." });
  }
});
