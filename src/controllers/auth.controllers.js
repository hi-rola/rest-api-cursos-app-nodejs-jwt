import { pool } from "../db.js";
import bcrypt from "bcrypt";
import { generarJWT } from "../helpers/jwt.js";

import { existeCorreo } from "../helpers/existeCorreo.js";

export const login = async (req, res) => {
  try {
    const { correo, contrasena } = req.body;

    const [rows] = await pool.query(
      `SELECT contrasena FROM USUARIO WHERE correo = ?`,
      [correo]
    );

    if (rows.length === 0) {
      return res.send({
        ok: false,
        mensaje: "Correo y/o contraseña incorrectos",
      });
    }

    const validarContrasena = bcrypt.compareSync(
      contrasena,
      rows[0].contrasena
    );

    const usurio = await getUsuaurio(correo);

    const token = await generarJWT(
      usurio.id_usuario,
      usurio.nombre + " " + usurio.apellidos
    );

    if (validarContrasena) {
      return res.send({
        id_usuario: usurio.id_usuario,
        nombre: usurio.nombre,
        apellidos: usurio.apellidos,
        edad: usurio.edad,
        genero: usurio.genero,
        correo: usurio.correo,
        rol: usurio.rol,
        estado: usurio.estado,
        token,
        ok: true,
      });
    } else {
      return res.send({
        ok: false,
        mensaje: "Correo y/o contraseña incorrectos",
      });
    }
  } catch (error) {
    res.send({
      ok: false,
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const registrar = async (req, res) => {
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

    const token = await generarJWT(result.insertId, nombre + " " + apellidos);

    res.send({
      id_usuario: result.insertId,
      nombre,
      apellidos,
      edad,
      genero,
      correo,
      rol,
      estado,
      token,
      ok: true,
      mensaje: "Usuario registrado exitosamente",
    });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

export const renovarToken = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT id_usuario, nombre, apellidos, edad, genero, correo, rol, estado
       FROM usuario WHERE id_usuario = ?`,
      [req.id_usuario]
    );

    const { id_usuario, nombre, apellidos, edad, genero, correo, rol, estado } =
      rows[0];

    const token = await generarJWT(id_usuario, nombre + " " + apellidos);

    res.send({
      id_usuario,
      nombre,
      apellidos,
      edad,
      genero,
      correo,
      rol,
      estado,
      token,
      ok: true,
    });
  } catch (error) {
    res.send({
      ok: false,
      mensaje: "Algo salió mal, intentelo más tarde",
    });
  }
};

const getUsuaurio = async (correo) => {
  const [usuario] = await pool.query(
    `SELECT id_usuario, nombre, apellidos, edad, genero, correo, rol, estado
     FROM USUARIO WHERE correo = ?`,
    [correo]
  );
  return usuario[0];
};
