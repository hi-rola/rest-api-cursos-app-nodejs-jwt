import { Router } from "express";
import {
  getUsuariosByRolEstudiante,
  getUsuarioEstudianteById,
  updateEstadoEstudiante,
  updateEstudiante,
  suscribirseEstudianteCurso,
} from "../controllers/usuarios.controllers.js";

import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.get("/usuarios-estudiante", validarJWT, getUsuariosByRolEstudiante);
router.get(
  "/usuarios-estudiante/:id_usuario",
  validarJWT,
  getUsuarioEstudianteById
);
router.patch(
  "/usuarios-estudiante/:id_usuario",
  validarJWT,
  updateEstadoEstudiante
);
router.put("/usuarios-estudiante/:id_usuario", validarJWT, updateEstudiante);
router.post("/usuarios-curso", validarJWT, suscribirseEstudianteCurso);

export default router;
