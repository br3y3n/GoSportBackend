import express from "express";
import { crearFase } from "../controllers/controllerFase.js";
const router = express.Router();
router.post('/obtener', crearFase)
export default router