import { pool } from "../db.js";

export const getCursos = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT cu.id_curso, cu.nombre, cu.descripcion, cu.imagen, cu.horas_demanda, cu.id_usuario, 
             c.id_categoria, c.categoria, u.nombre as nombre_profesor, u.apellidos as apellidos_profesor
      FROM curso cu 
      INNER JOIN categoria_curso ca on cu.id_curso = ca.id_curso
      INNER JOIN categoria c on c.id_categoria = ca.id_categoria
      INNER JOIN usuario u on u.id_usuario = cu.id_usuario`
    );

    res.json(result);
  } catch (error) {
    res.send({
      ok: false,
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const getCursoById = async (req, res) => {
  try {
    const { id_curso } = req.params;
    const [result] = await pool.query(
      `SELECT cu.id_curso, cu.nombre, cu.descripcion, cu.imagen, cu.horas_demanda, cu.id_usuario, 
      c.id_categoria, c.categoria, u.nombre as nombre_profesor, u.apellidos as apellidos_profesor
      FROM curso cu 
      INNER JOIN categoria_curso ca on cu.id_curso = ca.id_curso
      INNER JOIN categoria c on c.id_categoria = ca.id_categoria
      INNER JOIN usuario u on u.id_usuario = cu.id_usuario 
      WHERE cu.id_curso = ?`,
      id_curso
    );

    res.json(result[0]);
  } catch (error) {
    res.send({
      ok: false,
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const createCurso = async (req, res) => {
  try {
    const {
      nombre,
      descripcion,
      imagen,
      horas_demanda,
      id_usuario,
      id_categoria,
    } = req.body;
    const [result] = await pool.query(
      `INSERT INTO CURSO (nombre, descripcion, imagen, horas_demanda, id_usuario)
        VALUES (?,?,?,?,?)`,
      [nombre, descripcion, imagen, horas_demanda, id_usuario]
    );

    const { insertId: id_curso } = result;

    if (id_curso) {
      const [rows] = await pool.query(
        `INSERT INTO CATEGORIA_CURSO (id_categoria, id_curso)
          VALUES (?,?)`,
        [id_categoria, id_curso]
      );

      const [resultCategoria] = await pool.query(
        `SELECT categoria FROM CATEGORIA WHERE id_categoria = ?`,
        id_categoria
      );

      res.send({
        id_curso,
        nombre,
        descripcion,
        imagen,
        horas_demanda,
        id_usuario,
        categoria: resultCategoria[0].categoria,
        ok: true,
        mensaje: "Curso registrado exitosamente",
      });
    }

    res.json(result[0]);
  } catch (error) {
    console.log(error);
    res.send({
      error,
      ok: false,
      mensaje: "Algo salió mal, inténtelo más tarde",
    });
  }
};

export const updateCurso = async (req, res) => {
  try {
    const { id_curso } = req.params;

    const {
      nombre,
      descripcion,
      imagen,
      horas_demanda,
      id_usuario,
      id_categoria,
    } = req.body;

    const [result] = await pool.query(
      `UPDATE CURSO SET nombre = ?, descripcion = ?, imagen = ?, horas_demanda = ?, id_usuario = ?
      WHERE id_curso = ?`,
      [nombre, descripcion, imagen, horas_demanda, id_usuario, id_curso]
    );

    const [rows] = await pool.query(
      `UPDATE CATEGORIA_CURSO SET id_categoria = ? WHERE id_curso = ?`,
      [id_categoria, id_curso]
    );

    const [resultCategoria] = await pool.query(
      `SELECT categoria FROM CATEGORIA WHERE id_categoria = ?`,
      id_categoria
    );

    res.send({
      id_curso,
      nombre,
      descripcion,
      imagen,
      horas_demanda,
      id_usuario,
      categoria: resultCategoria[0].categoria,
      ok: true,
      mensaje: "Información actualizada exitosamente",
    });
  } catch (error) {
    res.send({
      error,
      ok: false,
      mensaje: "Algo salió mal, inténtelo más tarde",
    });
  }
};
