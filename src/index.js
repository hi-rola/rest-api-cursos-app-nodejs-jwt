import express from "express";
import cors from "cors";

import { PORT } from "./config.js";

import authRoutes from "./routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    mensaje: "Endpoint no encontrado",
  });
});

app.listen(PORT);
console.log("Corriendo en 3000");
