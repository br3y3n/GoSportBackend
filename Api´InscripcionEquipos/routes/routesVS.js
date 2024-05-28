import express from "express";
import { enfrentamientos, guardarVs, obtenerVs, obtenerVs1, actualizarVs} from "../controllers/controllerVs.js";
const router = express.Router();
router.get('/vs', enfrentamientos);
router.post('/guardarvs', guardarVs);
router.get('/obtenervs', obtenerVs);
router.get('/obtenervs1/:id', obtenerVs1)
router.patch('/agregarCronograma/:id', actualizarVs);
export default router