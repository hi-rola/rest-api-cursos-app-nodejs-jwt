import { pool } from "../db.js";

export const getComentarios = async (req, res) => {
  try {
    const { id_curso } = req.params;
    const [result] = await pool.query(
      `
      SELECT  uc.id_usuario_comentario_curso, u.id_usuario, u.nombre, 
              u.apellidos,u.correo, uc.comentario
      FROM USUARIO_COMENTARIO_CURSO uc
      INNER JOIN USUARIO u on uc.id_usuario = u.id_usuario
      WHERE uc.id_curso = ?
      `,
      id_curso
    );

    res.json(result);
  } catch (error) {
    res.send({
      ok: false,
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const publicarComentario = async (req, res) => {
  try {
    const { id_usuario, id_curso, comentario } = req.body;
    const [result] = await pool.query(
      `
      INSERT INTO USUARIO_COMENTARIO_CURSO (id_usuario, id_curso, comentario)
      VALUES (?,?,?)
      `,
      [id_usuario, id_curso, comentario]
    );

    const { insertId: id_usuario_comentario_curso } = result;

    res.send({
      id_usuario_comentario_curso,
      id_usuario,
      id_curso,
      comentario,
      ok: true,
      mensaje: "Mensaje publicado",
    });
  } catch (error) {
    res.send({
      error,
      ok: false,
      mensaje: "Algo salió mal, inténtelo más tarde",
    });
  }
};
