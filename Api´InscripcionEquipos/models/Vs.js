import mongoose, { Schema } from "mongoose";

const VsShema = mongoose.Schema({
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
    estado:{
        type: Boolean,
        require: false
    }
   
})

const Vs = mongoose.model("Vs", VsShema);

export default Vs;