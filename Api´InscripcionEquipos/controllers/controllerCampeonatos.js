import Campeonatos from "../models/campeonatos.js";



const agregarCampeonato = async (req, res) => {
    try {
        //Se recupera del body todos los campos que se van a guardar del campeonato y se los guarda en la coleccion
        const campeonato = Campeonatos(req.body);
        const campeonatoSave = await campeonato.save()
        res.json(campeonatoSave)
    } catch (error) {
        console.log(error)
    }
}

const obtenerCampeonato = async (req, res) => {
    try {

        //se obtiene todos los campeonatos ,** se puede mejorar a que retorne los campeonatos activos**
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
        //se borra el campeonato que se decea en este caso se envia el id del campeonato que se va a eliminar y se elimina
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