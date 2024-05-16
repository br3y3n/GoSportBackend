import equipoVs from "../helper/equipoVs.js";
import randomEquipo from "../helper/randomEquipos.js";
import Vs from "../models/Vs.js";
import InscripcionEquipos from "../models/inscripcionEquipos.js";
import Fase from "../models/fase.js";
import mongoose from "mongoose";
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


const obtenerEquipos = async (req, res) => {
  try {
    const equipos = req.body.dataVs.equipos;
    const { IdFasee } = req.body.dataVs;

    // Verifica si ya existe un equipo con el mismo IdFase
    const equipoFormado = await Vs.findOne({ IdFase: IdFasee });

    if (equipoFormado) {
      const equiposActivos = await Vs.find({ IdFase: IdFasee });
      res.send({
        msg: "Equipos activos",
        equipos: equiposActivos,
      });
    } else {
      const equiposSorteados = randomEquipo(equipos.equiposInscritos);
      const equipovs = equipoVs(equiposSorteados);

      // Usa el mismo ObjectId para todos los equipos
      const idFaseObject = new mongoose.Types.ObjectId(IdFasee);

      await Promise.all(equipovs.map(async (equipoFormado) => {
        try {
          const resultado = new Vs({
            equipo1: equipoFormado.team1,
            equipo2: equipoFormado.team2,
            IdFase: idFaseObject,
          });
          await resultado.save();
        } catch (error) {
          console.error('Error al guardar el equipo:', error);
        }
      }));

      res.send({
        msg: "Equipos sorteados correctamente",
        equipos: equipovs,
      });
    }
  } catch (error) {
    console.error('Error al obtener equipos:', error);
    res.status(500).send('Error al obtener equipos');
  }
};

export { enfrentamientos, obtenerEquipos };
