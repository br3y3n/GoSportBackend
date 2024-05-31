import mongoose from "mongoose";
import { Schema } from "mongoose";
const resultadoShema = mongoose.Schema({
    equipo1: {
        type: Schema.Types.Mixed,
        require: true,
        trim: true
    },
    equipo2: {
        type: Schema.Types.Mixed,
        require: true,
        trim: true
    },
    IdVs:{
        type:String,
        require: false,
        trim: true
    },
    IdFase:{
        type:String,
        require: false,
        trim: true
    },
    EstadoPartido:{
        type:Boolean,
        require: false,
        trim: true
    }
})

const Resultado = mongoose.model("Resultado", resultadoShema);

export default Resultado;