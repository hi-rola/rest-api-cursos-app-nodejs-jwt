import jwt from "jsonwebtoken";
import { SECRET_JWT_SEED } from "../config.js";

export const validarJWT = (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(403).json({
      mensaje: "Error en el token",
    });
  }

  try {
    const { id_usuario, nombreCompleto } = jwt.verify(token, SECRET_JWT_SEED);
    req.id_usuario = id_usuario;
    req.nombreCompleto = nombreCompleto;
  } catch (error) {
    return res.status(404).json({
      mensaje: "Token no valido",
    });
  }

  next();
};
