import { pool } from "../db.js";
import { existeCorreo } from "../helpers/existeCorreo.js";
import bcrypt from "bcrypt";

export const getUsuariosByRolEstudiante = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT id_usuario, nombre, apellidos, edad, genero, correo, rol, estado
      FROM USUARIO WHERE rol = 1 ORDER BY apellidos`
    );

    res.json(result);
  } catch (error) {
    res.send({
      ok: false,
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const getUsuarioEstudianteById = async (req, res) => {
  try {
    const [result] = await pool.query(
      `SELECT id_usuario, nombre, apellidos, edad, genero, correo, rol, estado
      FROM USUARIO WHERE id_usuario = ? `,
      [req.params.id_usuario]
    );

    res.json(result[0]);
  } catch (error) {
    res.send({
      ok: false,
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const registrarEstudiante = async (req, res) => {
  try {
    const { nombre, apellidos, edad, genero, correo, contrasena, rol, estado } =
      req.body;

    const correoValido = await existeCorreo(correo);

    if (correoValido) {
      return res.send({
        ok: false,
        mensaje: "Correo existente, ingrese otro por favor",
      });
    }

    const contrasenaEncriptada = bcrypt.hashSync(contrasena, 10);

    const [result] = await pool.query(
      `INSERT INTO USUARIO (nombre, apellidos, edad, genero, correo, contrasena, rol, estado)
      VALUES (?,?,?,?,?,?,?,?)
      `,
      [
        nombre,
        apellidos,
        edad,
        genero,
        correo,
        contrasenaEncriptada,
        rol,
        estado,
      ]
    );

    res.send({
      id_usuario: result.insertId,
      nombre,
      apellidos,
      edad,
      genero,
      correo,
      rol,
      estado,
      ok: true,
      mensaje: "Usuario registrado exitosamente",
    });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: "Algo salió mal, inténtelo más tarde",
    });
  }
};

export const updateEstudiante = async (req, res) => {
  try {
    const { nombre, apellidos, edad, genero, rol, estado } = req.body;
    const { id_usuario: id } = req.params;

    const [result] = await pool.query(
      `UPDATE USUARIO SET nombre = ?, apellidos = ?, edad = ?,
      genero = ?, rol = ?, estado = ? WHERE id_usuario = ?`,
      [nombre, apellidos, edad, genero, rol, estado, id]
    );

    if (result.affectedRows === 1) {
      const [result] = await pool.query(
        `SELECT id_usuario, nombre, apellidos, edad, genero, correo, rol, estado
      FROM USUARIO WHERE id_usuario = ? `,
        [id]
      );

      res.send({
        result: result[0],
        ok: true,
        mensaje: "Información actualizada exitosamente",
      });
    } else {
      res.send({
        error,
        ok: false,
        mensaje: "Algo salió mal, intentelo más tarde",
      });
    }
  } catch (error) {
    res.send({
      error,
      ok: false,
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const updateEstadoEstudiante = async (req, res) => {
  try {
    const { estado } = req.body;
    const { id_usuario: id } = req.params;

    const [rows] = await pool.query(
      `UPDATE USUARIO SET estado = ? WHERE id_usuario = ?`,
      [estado, id]
    );

    if (rows.affectedRows === 1) {
      const [result] = await pool.query(
        `SELECT id_usuario, nombre, apellidos, edad, genero, correo, rol, estado
      FROM USUARIO WHERE id_usuario = ? `,
        [id]
      );

      const {
        id_usuario,
        nombre,
        apellidos,
        edad,
        genero,
        correo,
        rol,
        estado,
      } = result[0];

      res.send({
        id_usuario,
        nombre,
        apellidos,
        edad,
        genero,
        correo,
        rol,
        estado,
        ok: true,
        mensaje: "Estatus actualizado exitosamente",
      });
    } else {
      res.send({
        ok: false,
        mensaje: "Algo salió mal, intentelo más tarde",
      });
    }
  } catch (error) {
    res.send({
      ok: false,
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const suscribirseEstudianteCurso = async (req, res) => {
  try {
    const { id_usuario, id_curso } = req.body;
    const [result] = await pool.query(
      `INSERT INTO USUARIO_CURSO (id_usuario, id_curso)
       VALUES (?,?)`,
      [id_usuario, id_curso]
    );

    if (result.affectedRows === 1) {
      res.send({
        id_usuario,
        id_curso,
        ok: true,
        mensaje: "Suscripción agregada",
      });
    }

    console.log(result);
  } catch (error) {
    res.send({
      ok: false,
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};
