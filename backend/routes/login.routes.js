import { Router } from "express";
import { prisma } from "../server.js";

export const loginRoutes = Router();

loginRoutes.post("/", async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Use o Prisma para consultar o banco de dados e encontrar o usuário pelo email e senha
    const usuario = await prisma.usuario.findFirst({
      where: {
        email: email,
        senha: senha,
      },
    });

    if (!usuario) {
      return res
        .status(401)
        .json({ message: "Não encontramos um usuário com essas credenciais" });
    }

    return res.json(usuario);
  } catch (erro) {
    console.error("Erro ao consultar o banco de dados:", erro);
    return res.status(401).json({ error: erro });
  }
});
