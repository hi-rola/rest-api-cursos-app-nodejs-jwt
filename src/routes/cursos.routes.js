import { Router } from "express";

import {
  getCursos,
  getCursoById,
  createCurso,
  updateCurso,
} from "../controllers/cursos.controllers.js";

import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/cursos", validarJWT, getCursos);
router.get("/cursos/:id_curso", validarJWT, getCursoById);
router.post("/cursos", validarJWT, createCurso);
router.put("/cursos/:id_curso", validarJWT, updateCurso);

export default router;
