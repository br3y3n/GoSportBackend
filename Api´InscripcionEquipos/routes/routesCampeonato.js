import express from "express";
import {agregarCampeonato, obtenerCampeonato,borrarCampeonato } from "../controllers/controllerCampeonatos.js";

const router = express.Router();
router.post('/agregarCampeonato', agregarCampeonato)
router.get('/obtenerCampeonato', obtenerCampeonato)
router.delete('/borrarCampeonato/:id', borrarCampeonato)
export default router