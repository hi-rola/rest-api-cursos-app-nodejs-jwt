import { Router } from "express";

import {
  login,
  registrar,
  renovarToken,
} from "../controllers/auth.controllers.js";

import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post("/login", login);
router.post("/registrar", registrar);
router.get("/renovarToken", validarJWT, renovarToken);

export default router;
