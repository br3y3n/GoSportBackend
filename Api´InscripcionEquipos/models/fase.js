import mongoose from "mongoose";

const faseShema= mongoose.Schema({
    estado: {
        type: Boolean,
        require: true,
        trim: true
    },
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    
})

const Fase = mongoose.model("Fase", faseShema);

export default Fase;
