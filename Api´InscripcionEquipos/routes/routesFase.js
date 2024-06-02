import express from "express";
import { crearFase, actuazarFase } from "../controllers/controllerFase.js";
const router = express.Router();
router.post('/obtener', crearFase)
router.put('/actualizarFase/:id',actuazarFase )
export default router