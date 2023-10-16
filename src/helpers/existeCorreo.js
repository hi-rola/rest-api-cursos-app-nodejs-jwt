import { pool } from "../db.js";

export const existeCorreo = async (correo) => {
  const [rows] = await pool.query(
    `SELECT correo FROM USUARIO where correo = ?`,
    correo
  );
  if (rows.length === 1) return true;
  return false;
};
