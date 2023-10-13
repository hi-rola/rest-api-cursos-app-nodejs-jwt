import jwt from "jsonwebtoken";
import { SECRET_JWT_SEED } from "../config.js";

export const generarJWT = (id_usuario, nombreCompleto) => {
  const payload = { id_usuario, nombreCompleto };

  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      SECRET_JWT_SEED,
      {
        expiresIn: "24h",
      },
      (error, token) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
};
