import express from "express";
import cors from "cors";
import routes from "./routes/index.routes.js";
import { PrismaClient } from "@prisma/client";

const app = express();

const PORT = process.env.PORT || 4000;
export const prisma = new PrismaClient();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5000"],
  })
);

//rota de validação online
app.get("/", (req, res) => {
  res.json({
    message: "aplicação online",
  });
});

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
