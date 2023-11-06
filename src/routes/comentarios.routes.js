import { Router } from "express";
import { validarJWT } from "../middlewares/validar-jwt.js";

import {
  getComentarios,
  publicarComentario,
} from "../controllers/comentarios.controllers.js";

const router = Router();

router.get("/comentarios/:id_curso", validarJWT, getComentarios);
router.post("/comentarios", validarJWT, publicarComentario);

export default router;
