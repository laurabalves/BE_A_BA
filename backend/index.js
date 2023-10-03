import express from "express";
import cors from "cors";
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

const app = express();
app.use(express.json());
app.use(cors(corsOptions));

import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "postgres",
  password: "postgres",
  port: 5432,
});

app.get("/", (req, res) => {
  res.json({
    message: "aplicação online",
  });
});

app.post("/login", async (req, res) => {
  const email = req.body.email;
  const senha = req.body.senha;

  try {
    const resultado = await pool.query(
      `select * from beaba.usuario u where email='${email}' and senha='${senha}' limit 1`
    );

    if (resultado.rows.length <= 0) {
      return res
        .status(400)
        .json({ message: "Não encontramos usuarios com essas credenciais" });
    }

    return res.send(resultado.rows[0]);
  } catch (erro) {
    console.error("Erro ao consultar o banco de dados:", erro);
    return res.status(400).json({ error: erro });
  }
});

app.get("/get-template/:userid", (req, res) => {
  const id = req.params.userid;

  return res.send(id);
});

//chamada da api
app.listen(3333, () => {
  console.info("Rodando Backend na porta 3333");
});
