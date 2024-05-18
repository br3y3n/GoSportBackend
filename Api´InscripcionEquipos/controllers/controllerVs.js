import equipoVs from "../helper/equipoVs.js";
import randomEquipo from "../helper/randomEquipos.js";
import Vs from "../models/Vs.js";
import InscripcionEquipos from "../models/inscripcionEquipos.js";
import Fase from "../models/fase.js";
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


const guardarVs= async (req, res) => {
  try {
    const equipos = req.body.dataVs.equipos;
    const IdFasee  = req.body.dataVs.IdFase;
      const equiposSorteados = randomEquipo(equipos.equiposInscritos);
      const equipovs = equipoVs(equiposSorteados);
      await Promise.all(equipovs.map(async (equipoFormado) => {
        try {
          const resultado = new Vs({
            equipo1: equipoFormado.team1,
            equipo2: equipoFormado.team2,
            IdFase: IdFasee,
          });
          await resultado.save();
        } catch (error) {
          console.error('Error al guardar el equipo:', error);
        }
      }));

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
    console.log(idfase)
    const IdFase = idfase
    console.log(IdFase)
    if(IdFase){
      const vs= await Vs.find({IdFase})
      console.log(vs)
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

    }
  }

 
export { enfrentamientos, guardarVs ,obtenerVs};
