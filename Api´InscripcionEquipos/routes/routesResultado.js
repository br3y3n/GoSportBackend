import express from "express";
import { obtenerResultado, agregarResultado, lengthResultadosVs } from "../controllers/controllerResultado.js";
const router = express.Router();
router.post('/agregarResultado', agregarResultado)
router.get('/obtenerResultado', obtenerResultado)
router.get('/lenResultadoVs', lengthResultadosVs)

export default router