import Resultado from '../models/resultado.js'

const obtenerResultado = async (req, res) => {
    try {
        const resultado = await Resultado.find({})
        res.send({ resultado })
    } catch (error) {
        res.status(500).send('Error al obtener el equipo')

        console.log(error)
    }
}
const agregarResultado = async (req, res) => {
    try {
        const resultado = Resultado(req.body);
        const resultadoSave = await resultado.save()
        res.json(resultadoSave)
    } catch (error) {
        console.log(error)
    }
}



export {
    obtenerResultado,
    agregarResultado
}