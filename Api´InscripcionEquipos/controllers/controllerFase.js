import Fase from "../models/fase.js";
import mongoose from "mongoose";

const crearFase = async (req, res) => {
    try {
        const estado = req.body.estado;
        const nombre = req.body.nombreFase;

        // Genera un ObjectId personalizado
        const customObjectId = new mongoose.Types.ObjectId();

        // Crea un nuevo documento con el ObjectId personalizado
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

export {
    crearFase
}