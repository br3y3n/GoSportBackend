import Fase from "../models/fase.js";
import mongoose from "mongoose";

const crearFase = async (req, res) => {
    try {

        //se obtiene del los datos para crear una nueva fase 
        const estado = req.body.estado;
        const nombre = req.body.nombreFase;

        //se  Genera un ObjectId personalizado para poder enviarlo al front y guardarlo en el local storage
        const customObjectId = new mongoose.Types.ObjectId();
        const fase = new Fase({
            _id: customObjectId, // Asigna el ObjectId personalizado al campo _id
            estado: estado,
            nombre: nombre
        });

        await fase.save();
        res.json({ msg: "Fase creada correctamente", _id: customObjectId }); // Envía el ObjectId al frontend
    } catch (error) {
        res.status(500).send('Error al crear la fase');
        console.log(error);
    }
}

const actuazarFase = async (req, res) => {
    const estado = req.body.estado;
    const nombre = req.body.nombreFase;
    const id = req.params
    try {

        const fase = await Fase.findById(id)

        fase.estado = estado
        fase.nombre = nombre
        await fase.save();
        res.json({ msg: "Fase actualizada correctamente",}); // Envía el ObjectId al frontend
    } catch (error) {
        res.status(500).send('Error al crear la fase');
        console.log(error);
    }
}

export {
    crearFase,
    actuazarFase
}