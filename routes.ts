import { Router } from "express";
import { UsuariosController } from "./src/controllers/usuariosController";

const routes = Router();
routes.post("/usuarios", new UsuariosController().cadastroUsuarios);

routes.post("/login", new UsuariosController().loginUsuarios);

routes.post("/token", new UsuariosController().buscaUsuarioPorToken);

export default routes;