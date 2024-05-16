import express from "express";
import { enfrentamientos, obtenerEquipos } from "../controllers/controllerVs.js";
const router = express.Router();
router.get('/vs', enfrentamientos)
router.post('/obtenerEquipos', obtenerEquipos)
export default router