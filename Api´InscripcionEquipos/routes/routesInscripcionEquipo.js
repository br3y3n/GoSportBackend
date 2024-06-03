import express from "express";
import {
    agregarInscripcionEquipo,
    modificarInscripcionEquipo,
    borrarInscripcionEquipo,
    obtenerEquipo,
    obtenerEquipos
} from "../controllers/controllerInscripcionEquipo.js";

const router = express.Router();
router.get('/obtenerEquipo/:id', obtenerEquipo)
router.get('/obtenerEquipos',obtenerEquipos)
router.post('/agregarInscripcion', agregarInscripcionEquipo)
router.patch('/modificarInscripcion/:id', modificarInscripcionEquipo)
router.delete('/borrarInscripcion/:id', borrarInscripcionEquipo)
export default router