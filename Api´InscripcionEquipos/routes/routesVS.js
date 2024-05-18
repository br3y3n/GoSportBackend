import express from "express";
import { enfrentamientos, guardarVs, obtenerVs} from "../controllers/controllerVs.js";
const router = express.Router();
router.get('/vs', enfrentamientos)
router.post('/guardarvs', guardarVs);
router.get('/obtenervs', obtenerVs)
export default router