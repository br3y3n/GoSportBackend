import express from "express";
import { obtenerResultado, agregarResultado, lengthResultadosVs, equiposClasificados } from "../controllers/controllerResultado.js";
const router = express.Router();
router.post('/agregarResultado', agregarResultado)
router.get('/obtenerResultado', obtenerResultado)
router.get('/lenResultadoVs', lengthResultadosVs)
router.get('/equiposClasificados', equiposClasificados)

export default router