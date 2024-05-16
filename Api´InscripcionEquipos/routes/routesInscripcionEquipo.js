import express from "express";
import {
    agregarInscripcionEquipo,
    modificarInscripcionEquipo,
    borrarInscripcionEquipo
} from "../controllers/controllerInscripcionEquipo.js";

const router = express.Router();
router.post('/agregarInscripcion', agregarInscripcionEquipo)
router.patch('/modificarInscripcion/:id', modificarInscripcionEquipo)
router.delete('/borrarInscripcion/:id', borrarInscripcionEquipo)
export default router