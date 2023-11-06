import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt.js";

import { getProfesores } from "../controllers/profesores.controllers.js";

const router = Router();

router.get("/profesores", validarJWT, getProfesores);

export default router;
