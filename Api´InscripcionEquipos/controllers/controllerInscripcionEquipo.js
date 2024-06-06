import InscripcionEquipos from "../models/inscripcionEquipos.js";
import Campeonatos from "../models/campeonatos.js";
const agregarInscripcionEquipo = async (req, res) => {
    const { nombreEquipo } = req.body;
    const existInscripcion = await InscripcionEquipos.findOne({ nombreEquipo })
    if (existInscripcion) {
        const error = new Error("Equipo ya esta  inscrito")
        return res.status(400).json({ msg: error.message })
    }
    try {
        const equipoInscrito = InscripcionEquipos(req.body);
        const equipoInscritoSave = await equipoInscrito.save()
        res.json(equipoInscritoSave)
    } catch (error) {
        console.log(error)
    }
}

const modificarInscripcionEquipo = async (req, res) => {
    const { id } = req.params;
    const { estadoGanador} = req.body;

    try {
        const resultado = await InscripcionEquipos.updateOne(
            { _id: id },
            { $set: { ganador: estadoGanador } }
        );

        if (resultado.nModified === 0) {
            return res.status(404).json({ msg: "Equipo Inscrito no encontrado o sin cambios" });
        }

        res.json({ msg: "Campo del equipo modificado correctamente" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error al modificar el equipo", error });
    }
}

const borrarInscripcionEquipo = async (req, res) => {
    const { id } = req.params

    try {
        const equipoInscrito = await InscripcionEquipos.findByIdAndDelete(id);
        if (!equipoInscrito) {
            return res.status(404).json({ msg: "equipo no encontrado" });
        }
        res.json({ msg: "equipo borrado correctamente" });
    } catch (error) {
        console.log(error)
    }
}
const obtenerEquipo = async (req, res) => {
    const { id } = req.params
   // se obtiene un equipo, en  este caso se envia el ID desde el cliente se busca con el findbyid y se encuentra retorna ese equipo
    try {
        const equipo = await InscripcionEquipos.findById(id)
        if (!equipo) {
            return res.status(404).json({ msg: "equipo no encontrado" });
        }
        res.json({ equipo: equipo });
    } catch (error) {
        console.log(error)
    }
}
const obtenerEquipos = async (req, res) => {
    const { IdCampeonato } = req.headers
    // se obtiene todos los equipos que se encuentran  inscritos a ese campeonato
    try {
        const equipo = await InscripcionEquipos.find({IdCampeonato})
        if (!equipo) {
            return res.status(404).json({ msg: "equipo no encontrado" });
        }
        res.json({ equipo: equipo });
    } catch (error) {
        console.log(error)
    }
}

export {
    agregarInscripcionEquipo,
    modificarInscripcionEquipo,
    borrarInscripcionEquipo,
    obtenerEquipo,
    obtenerEquipos
}