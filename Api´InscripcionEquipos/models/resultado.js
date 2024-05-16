import mongoose from "mongoose";

const resultadoShema = mongoose.Schema({
    golesEquipo1: {
        type: Number,
        require: true,
        trim: true
    },
    golesEquipo2: {
        type: Number,
        require: true,
        trim: true
    },
    tarjetasAmarillas_e1: {
        type: Number,
        require: false,
        trim: true
    },
    tarjetasAmarillas_e2: {
        type: Number,
        require: false,
        trim: true
    },
    tarjetasRojas_e1: {
        type: Number,
        require: false,
        trim: true
    },
    tarjetasRojas_e2:{
        type: Number,
        requiere: false,
        trim: true
    },
    faltas_e1:{
        type: Number,
        require: false,
        trim: true
    },
    faltas_e2:{
        type: Number,
        require: false,
        trim: true
    }
})

const Resultado = mongoose.model("Resultado", resultadoShema);

export default Resultado;