import equipoVs from "../helper/equipoVs.js";
import randomEquipo from "../helper/randomEquipos.js";
import Vs from "../models/Vs.js";
import InscripcionEquipos from "../models/inscripcionEquipos.js";

const enfrentamientos = async (req, res) => {
  const Idcampeonato = req.headers.authorization;
 
  try {
    const equipos = await InscripcionEquipos.find({ Idcampeonato });
    const equiposInscritos = equipos.filter((equipo) => equipo.Idcampeonato === Idcampeonato);
    res.send({ equiposInscritos });
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
  const equipos = req.body.dataVs.equipos;
  
  const IdFasee  = req.body.dataVs.IdFase;
  const equiposSorteados = randomEquipo(equipos);
  const equipovs = equipoVs(equiposSorteados);
  console.log(equipovs[0].team1)
  console.log(equipovs[0].team2)
  try {
    
      await Promise.all(equipovs.map(async (equipoFormado) => {

        console.log(equipoFormado)
        try {
         
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
