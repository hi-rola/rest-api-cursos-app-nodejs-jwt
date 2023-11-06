import { pool } from "../db.js";

export const totalUsuarios = async (req, res) => {
  try {
    const [result] = await pool.query(
      `
      WITH cte_u AS
        (
          SELECT count(*) usuarios
          from usuario 
          where rol = 	1
          
        ),
        cte_p AS (
          SELECT count(*) profesores
          from usuario 
          where rol = 	2
        )
      SELECT u.usuarios , p.profesores
      FROM  cte_u u, cte_p p
      `
    );
    res.json(result[0]);
  } catch (error) {
    res.send({
      ok: false,
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const categoriasCursos = async (req, res) => {
  try {
    const [result] = await pool.query(
      `
      WITH cte_w AS
        (
          SELECT count(*) web
          from categoria_curso
          where categoria_curso.id_categoria = 1
          
        ),
        cte_m AS (
          SELECT count(*) movil
          from categoria_curso
          where categoria_curso.id_categoria = 3
          
        ),
        cte_t AS (
          SELECT count(*) testing
          from categoria_curso
          where categoria_curso.id_categoria = 6
          
        ),
        cte_p AS (
          SELECT count(*) programacion
          from categoria_curso
          where categoria_curso.id_categoria = 2
          
        )
      SELECT w.web , m.movil, t.testing, p.programacion
      from  cte_w w, cte_m m, cte_t t, cte_p p
      `
    );
    res.json(result[0]);
  } catch (error) {
    res.send({
      ok: false,
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const usuariosPorGenero = async (req, res) => {
  try {
    const [result] = await pool.query(
      `
      WITH cte_f AS
        (
          SELECT count(*) femenino
          from usuario 
          where genero = 	'F' AND rol = 1
          
        ),
        cte_m AS (
          SELECT count(*) masculino
          from usuario 
          where genero = 	'M' AND rol = 1
        )
      SELECT f.femenino , m.masculino
      FROM  cte_f f, cte_m m
      `
    );
    res.json(result[0]);
  } catch (error) {
    res.send({
      ok: false,
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};
