import InscripcionEquipos from "../models/inscripcionEquipos.js";
import Campeonatos from "../models/campeonatos.js";
import randomEquipo from "../helper/randomEquipos.js";
import equipoVs from "../helper/equipoVs.js";
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
    const { nombreEquipo, nombreCapitan, contactoUno, contactoDos, jornada, participantes } = req.body
    const Idcampeonato = await Campeonatos.findById()
    const equipoInscrito = await InscripcionEquipos.findById(id)
    if (!equipoInscrito) {
        const error = new Error("Equipo Inscrito no encontrado")
        return res.status(400).json({ msg: error })
    }

    try {
        equipoInscrito.nombreEquipo = nombreEquipo,
        equipoInscrito.nombreCapitan = nombreCapitan,
        equipoInscrito.contactoUno = contactoUno,
        equipoInscrito.contactoDos = contactoDos,
        equipoInscrito.jornada = jornada,
        equipoInscrito.Idcampeonato = Idcampeonato 
        equipoInscrito.participantes = participantes,    
        await equipoInscrito.save()
        res.json({ msg: "campos del equipo modificados correctamente" })
    } catch (error) {
        console.log(error)
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
    const {idcampeonato} = req.headers
    //const {IdVs}= req.headers

    try {
        const equiposInscritos = await InscripcionEquipos.find(idcampeonato);
        console.log(equiposInscritos)
        const equipo = equiposInscritos.filter((equipo)=> equipo._id === id)
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
    obtenerEquipo
}