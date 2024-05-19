import Campeonatos from "../models/campeonatos.js";



const agregarCampeonato = async (req, res) => {
    try {
        const campeonato = Campeonatos(req.body);
        const campeonatoSave = await campeonato.save()
        res.json(campeonatoSave)
    } catch (error) {
        console.log(error)
    }
}

const obtenerCampeonato = async (req, res) => {
    try {
        const campeonatoEnEjecucion = await Campeonatos.find({})
        res.send({ campeonatoEnEjecucion })
    } catch (error) {
        res.status(500).send('Error al obtener el equipo')

        console.log(error)
    }
}

const borrarCampeonato= async (req, res) => {
    const { id } = req.params

    try {
        const campeonato = await Campeonatos.findByIdAndDelete(id);
        if (!campeonato) {
            return res.status(404).json({ msg: "campeonato no encontrado" });
        }
        res.json({ msg: "campeonato borrado correctamente" });
    } catch (error) {
        console.log(error)
    }
}
export {
    agregarCampeonato,
    obtenerCampeonato,
    borrarCampeonato
}