import Vs from '../models/Vs.js'
import InscripcionEquipos from '../models/inscripcionEquipos.js'
import Resultado from '../models/resultado.js'

const obtenerResultado = async (req, res) => {

    //se obtine desde la cabezera de la peticion el 
    //id de la fase que se esta jugando luego se busca todos los resultados que se encuentren de esa fase
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
   // en estre controller nos permite verificar que todos los resultados
   // se hallan llenado, una ves se llenen todos los resultados le indicamos que la fase ya se termino para poder pasar otra 
    const {idfase} = req.headers
    const IdFase = idfase 
   
    try {

        //se obtiene el id de la fase que se esta jugando en ese momento y se busca todos 
        //los resultados que hallan de esa fase y todos los vs que hallan de esa misma fase 
        //si los resultados son igual con los vs quiere decir que ya se guardaron todos los resultados 
        // y se indica que la fase ya se termino para poder pasar otra
        const resultado = await Resultado.find({IdFase})
        const vs = await Vs.find({IdFase})
       
        if(resultado.length == vs.length){

            res.send({ estadoFase:false })
        }else{
            res.send({estadoFase:true})
        }
    } catch (error) {
        res.status(500).send('Error al obtener el equipo')

        console.log(error)
    }
}
const agregarResultado = async (req, res) => {

    //se recupera del  body todos los campos que se van a guardar del resultado
    try {
        const resultado = Resultado(req.body);
        const resultadoSave = await resultado.save()
        res.json(resultadoSave)
    } catch (error) {
        console.log(error)
    }
}

const equiposClasificados = async(req, res)=>{

    //Esta controller nos permite saber que equipo gano y el campo del equipio se actualiza segun sea el caso
    // si perdio el campo ganador se pasa a flase y si gano a true
    const {idfase} = req.headers
    const IdFase = idfase  

    //se obtiene de la cabezera de la peticion el id de fase que se esta jugando en ese momento
    // y se busca todos los resultados que esa fase tiene
try {
    const resultado = await Resultado.find({IdFase})

   await Promise.all(resultado.map(async(result)=>{
    //utilizamos una promesa para asegurarnos de que todos los equipos se les actualiazo su campo ganador correspondiente
    // luego se mapea los resultados uno por uno para poder hacer la actualizacion correctamente 
    try {
        const resulEquipo1 = result.equipo1.numeroGoles
        //se guarda en una variable los goles que obtuvo el equipo 1
        const resulEquipo2 = result.equipo2.numeroGoles
        //se guarda en una variable los goles que obtuvo el equipo 2
        if(resulEquipo1 < resulEquipo2){
            //si los goles del equipo son mayor a los del equipo dos quiere decir que el equipo 1 gano
            //se obtiene el id del equipo que gano para poder actualizar el campo que se quiere con el metodo updateOne
            const id = result.equipo1.idEquipo
            const equipo = await InscripcionEquipos.updateOne(
                { _id: id },
                { $set: { ganador: true } }
            );
        }else{
            //si no quiere decir que el equipo 2 y se hace lo mismo se obtiene el id y se actualiza
            const id = result.equipo2.idEquipo
            const equipo = await InscripcionEquipos.updateOne(
                { _id: id },
                { $set: { ganador: false } }
            );
        }
    } catch (error) {
        console.log(error)
    }
   }))

   return res.status(200).json({
    msg: "estado modificado correctamente"
   })
    
} catch (error) {
    console.log(error)
}

}



export {
    obtenerResultado,
    agregarResultado,
    lengthResultadosVs,
    equiposClasificados
}