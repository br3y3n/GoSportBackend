import equipoVs from "../helper/equipoVs.js";
import randomEquipo from "../helper/randomEquipos.js";
import Vs from "../models/Vs.js";
import InscripcionEquipos from "../models/inscripcionEquipos.js";

const enfrentamientos = async (req, res) => {

  // se obtiene de la cabezera de la peticion el id del campeonato que se esta jugando
  // luego se filtra los equipos que ganaron, es decir los que tengan el campo ganador como true
  // y se retorna los equipos ganadores
  const Idcampeonato = req.headers.authorization;
  try {
    const equipos = await InscripcionEquipos.find({ Idcampeonato });
    const ganadores = equipos.filter((equipo)=> equipo.ganador== 'true')
    res.send({ ganadores });
  } catch (error) {
    res.status(500).send("Error al obtener el equipo");
    console.log(error);
  }
};

const equiposInscritosCampeonato = async (req, res) => {
  const Idcampeonato = req.headers.authorization;
 
  try {
    const equipos = await InscripcionEquipos.find({ Idcampeonato });
    const equiposInscritos = equipos.filter((equipo) => equipo.Idcampeonato === Idcampeonato);
    const equiposGanador = equiposInscritos.filter((equipo)=> equipo.ganador == true)
    const equiposPerdedor = equiposInscritos.filter((equipo)=> equipo.ganador == false)
    res.send({ ganador:equiposGanador, 
      perdedor:equiposPerdedor
     });
  } catch (error) {
    res.status(500).send("Error al obtener el equipo");
    console.log(error);
  }
};

const guardarVs= async (req, res) => {

  //en este controller nos permite guardar los vs 
  // desde el front end se envia los equipos ganadores
  // y el id de la fase que se esta jugando
  const equipos = req.body.dataVs.equipos;
  
  const IdFasee  = req.body.dataVs.IdFase;
  //llamo la funcion randmEquipo y lo que hace esta funcion es organizar de difente manera el listado de los equipos
  const equiposSorteados = randomEquipo(equipos);
  const equipovs = equipoVs(equiposSorteados);
  // luego con la funciom equipoVs se forman los vs esta funcion toma el equipo con el equipo2 y los forma en vs 
  try {
    
    //utilizamos el promise all para asegurarnos de que todos los vs que nos devuelve la funcion equipoVs se guarden correctamente
      await Promise.all(equipovs.map(async (equipoFormado) => {

        console.log(equipoFormado)
        try {
         // inicialmente se guarda el nombre del equipo y el ID, despues se agrega la hora de juego y la fecha
          const resultado = new Vs({
            equipo1:{name: equipoFormado.team1.name,
              idEquipo: equipoFormado.team1.idEquipo
            },
            equipo2:{name: equipoFormado.team2.name,
              idEquipo: equipoFormado.team2.idEquipo},
            IdFase: IdFasee,
          });
          await resultado.save();
        } catch (error) {
          console.error('Error al guardar el equipo:', error);
        }
      }))

      res.send({
        msg: "Equipos sorteados correctamente",
      });
    

  } catch (error) {
    console.error('Error al obtener equipos:', error);
    res.status(500).send('Error al obtener equipos');
  }
}


 const obtenerVs  = async(req, res)=>{

  //se obtiene el id de la fase que se esta jugando en ese momento y se busca todos los vs que se encuentren en esa fase
  try{
    const {idfase} = req.headers
    const IdFase = idfase  
  
    if(IdFase){
      const vs= await Vs.find({IdFase})
      return res.send({
        msg: "id Encontrado",
        equipos: vs
      })
    }else{
      return res.send({
        msg:"id no encontrado"
      })
    }
    }catch(error){
      console.log(error)
    }
  }

  const obtenerVs1  = async(req, res)=>{

    //se obtiene un Vs en especifico desde la params de la ruta se obtiene la fase que se desea retornar
    const {id} = req.params
    const {idfase} = req.headers
    const IdFase = idfase  
    try{
      if(IdFase){
        const vs= await Vs.findById(id)
        return res.send({
          msg: "id Encontrado",
          equipos: vs
        })
      }else{
        return res.send({
          msg:"id no encontrado"
        })
      }
      }catch(error){
        console.log(error)
      }
    }

  const actualizarVs =async (req, res)=>{
    const id= req.params.id
    const {equipo1, equipo2,IdFase, fecha, hora } = req.body
    if([id,equipo1,equipo2,IdFase,fecha, hora].includes('')){
      return res.send({
        msg:"todos los campos son obligatorios"
      })
    }
    const vs = await Vs.findById(id)
    if(!vs){
      return res.send({
        msg: "VS no existe"
      })
    }
    try {
      vs.equipo1 = equipo1
      vs.equipo2 = equipo2
      vs.IdFase = IdFase
      vs.fecha = fecha
      vs.hora = hora
      await vs.save()

      return res.send({
        msg: "Cronograma agregado correctamente"
      })
      
    } catch (error) {
      console.log(error)
    }
    
  }
 
export { enfrentamientos, guardarVs ,obtenerVs, actualizarVs, obtenerVs1};
