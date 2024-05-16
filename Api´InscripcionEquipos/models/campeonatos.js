import mongoose from "mongoose";

const campeonatoShema = mongoose.Schema({
    diciplina: {
        type: String,
        require: true,
        trim: true
    },
    categoria: {
        type: String,
        require: true,
        trim: true
    },
    modalidad: {
        type: String,
        require: true,
        trim: true
    },
    fechaInicio: {
        type: String,
        require: true,
        trim: true
    },
    fechaFin: {
        type: String,
        require: true,
        trim: true
    },
    nombre:{
        type: String,
        requiere: true,
        trim: true
    },
    descripcion:{
        type: String,
        require: true,
        trim: true
    },
    inicioIncripcion:{
        type:String,
        require: true,
        trim: true
    },
    finIncripcion:{
        type:String,
        require: true,
        trim:true
    },
    cantidadEquipos:{
        type: String,
        require:true,
        trim:true
    },
    estado:{
        type:Boolean,
        require: false,
        trim: true
    }
});

const Campeonatos = mongoose.model("campeonatos", campeonatoShema);

export default Campeonatos;