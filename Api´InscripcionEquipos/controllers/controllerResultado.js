import Resultado from "../models/resultado"

const obtenerResultado = async (req, res) => {
    try {
        const resultado = await Resultado.find({})
        res.send({ resultado })
    } catch (error) {
        res.status(500).send('Error al obtener el equipo')

        console.log(error)
    }
}

export {
    obtenerResultado
}