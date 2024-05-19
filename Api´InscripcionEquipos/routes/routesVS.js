import express from "express";
import { enfrentamientos, guardarVs, obtenerVs, actualizarVs} from "../controllers/controllerVs.js";
const router = express.Router();
router.get('/vs', enfrentamientos);
router.post('/guardarvs', guardarVs);
router.get('/obtenervs', obtenerVs);
router.patch('/agregarCronograma/:id', actualizarVs);
export default router