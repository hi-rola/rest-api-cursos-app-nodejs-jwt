import { Router } from "express";

import { validarJWT } from "../middlewares/validar-jwt.js";

import {
  totalUsuarios,
  categoriasCursos,
  usuariosPorGenero,
} from "../controllers/estadisticas.controllers.js";

const router = Router();

router.get("/estadisticas-usuarios", validarJWT, totalUsuarios);
router.get("/estadisticas-categorias", validarJWT, categoriasCursos);
router.get("/estadisticas-genero", validarJWT, usuariosPorGenero);

export default router;
