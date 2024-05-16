import mongoose from "mongoose";

const VsShema = mongoose.Schema({
    equipo1: {
        type: String,
        require: true,
        trim: true
    },
    equipo2: {
        type: String,
        require: true,
        trim: true
    },
    IdFase: {
        type: mongoose.Types.ObjectId,
        require: false,
        trim: true
    },
    fecha: {
        type: String,
        require: false,
        trim: true
    },
    hora: {
        type: String,
        require: false,
        trim: true
    },
    lugar:{
        type: String,
        requiere: false,
        trim: true
    },
    IdResultado:{
        type:String,
        require: false,
        trim: true
    }
})

const Vs = mongoose.model("Vs", VsShema);

export default Vs;