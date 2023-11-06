import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt.js";

import { getCategorias } from "../controllers/categorias.controllers.js";

const router = Router();

router.get("/categorias", validarJWT, getCategorias);

export default router;
