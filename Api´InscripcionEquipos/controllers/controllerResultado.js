import Vs from '../models/Vs.js'
import Resultado from '../models/resultado.js'

const obtenerResultado = async (req, res) => {
   
    const {idfase} = req.headers
    const IdFase = idfase 
   
    try {
        const resultado = await Resultado.find({IdFase})
        
        res.send({ resultado })
    } catch (error) {
        res.status(500).send('Error al obtener el equipo')

        console.log(error)
    }
}

const lengthResultadosVs = async (req, res) => {
   
    const {idfase} = req.headers
    const IdFase = idfase 
   
    try {
        const resultado = await Resultado.find({IdFase})
        const vs = await Vs.find({IdFase})
       
        if(resultado.length == vs.length){

            res.send({ estado:false })
        }
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
    agregarResultado,
    lengthResultadosVs
}