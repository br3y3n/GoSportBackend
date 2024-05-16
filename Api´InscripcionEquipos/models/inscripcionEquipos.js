import mongoose from 'mongoose'
const participanteSchema = new mongoose.Schema({
    N: { type: Number, required: true },
    nombreJugador: { type: String, required: true },
    ficha: { type: Number, required: true },
    dorsal: { type: Number, required: true },
});
const inscripcionEquiposSchema = mongoose.Schema({
    nombreEquipo: {
        type: String,
        require: true,
        trim: true
    },
    nombreCapitan: {
        type: String,
        require: true,
        trim: true
    },
    contactoUno: {
        type: Number,
        require: true,
        trim: true
    },
    contactoDos: {
        type: Number,
        require: true,
        trim: true
    },
    jornada: {
        type: String,
        require: true,
        trim: true
    },
    Idcampeonato:{
        type: String,
        require: true,
        trim: true
    },
    participantes: [participanteSchema],

})

const InscripcionEquipos = mongoose.model("InscripcionEquipos", inscripcionEquiposSchema)

export default InscripcionEquipos;