import express from "express";
import cors from "cors";

import { PORT } from "./config.js";

import authRoutes from "./routes/auth.routes.js";

import usuariosRoutes from "./routes/usuarios.routes.js";
import cursosRouter from "./routes/cursos.routes.js";
import categoriasRoutes from "./routes/categorias.routes.js";
import profesoresRoutes from "./routes/profesores.routes.js";
import estadisticasRoutes from "./routes/estadisticas.routes.js";
import comentariosRoutes from "./routes/comentarios.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api", usuariosRoutes);
app.use("/api", cursosRouter);
app.use("/api", categoriasRoutes);
app.use("/api", profesoresRoutes);
app.use("/api", estadisticasRoutes);
app.use("/api", comentariosRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    mensaje: "Endpoint no encontrado",
  });
});

app.listen(PORT);
console.log("Corriendo en 3000");
