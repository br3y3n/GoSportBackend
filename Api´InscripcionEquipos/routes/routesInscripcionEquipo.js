import express from "express";
import {
    agregarInscripcionEquipo,
    modificarInscripcionEquipo,
    borrarInscripcionEquipo,
    obtenerEquipo
} from "../controllers/controllerInscripcionEquipo.js";

const router = express.Router();
router.get('/obtenerEquipo/:id', obtenerEquipo)
router.post('/agregarInscripcion', agregarInscripcionEquipo)
router.patch('/modificarInscripcion/:id', modificarInscripcionEquipo)
router.delete('/borrarInscripcion/:id', borrarInscripcionEquipo)
export default router