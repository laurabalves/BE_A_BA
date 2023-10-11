import { Router } from "express";
import { usuariosRoutes } from "./usuarios.routes.js";
import { templatesRoutes } from "./templates.routes.js";
import { loginRoutes } from "./login.routes.js";
import { uploadRoutes } from "./upload.routes.js";

//todas as rotas

const allRoutes = Router();

allRoutes.use("/usuarios", usuariosRoutes);
allRoutes.use("/templates", templatesRoutes);
allRoutes.use("/login", loginRoutes);
allRoutes.use("/upload", uploadRoutes);

export default allRoutes;
