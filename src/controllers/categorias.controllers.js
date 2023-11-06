import { pool } from "../db.js";

export const getCategorias = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT id_categoria, categoria FROM categoria`
    );

    res.json(result);
  } catch (error) {
    res.send({
      ok: false,
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};
