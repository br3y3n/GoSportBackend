import express from "express";
import { obtenerResultado, agregarResultado } from "../controllers/controllerResultado.js";
const router = express.Router();
router.post('/agregarResultado', agregarResultado)
router.get('/obtenerResultado', obtenerResultado)

export default router