import { Router } from "express";
import { usuariosRoutes } from "./usuarios.routes.js";
import { templatesRoutes } from "./templates.routes.js";
import { loginRoutes } from "./login.routes.js";

const allRoutes = Router();

allRoutes.use("/usuarios", usuariosRoutes);
allRoutes.use("/templates", templatesRoutes);
allRoutes.use("/login", loginRoutes);

export default allRoutes;
