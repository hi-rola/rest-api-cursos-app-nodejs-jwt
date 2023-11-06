import { pool } from "../db.js";

export const getProfesores = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT id_usuario, nombre, apellidos, edad, genero, correo, rol, estado 
      FROM USUARIO WHERE rol = 2 ORDER BY apellidos`
    );

    res.json(result);
  } catch (error) {
    res.send({
      ok: false,
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};
