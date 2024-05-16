import express from "express";
import cors from "cors";
import connectionDB from "./config/db.js";
import inscripcionEquiposRouter from "./routes/routesInscripcionEquipo.js";
import campeonatosRouter from "./routes/routesCampeonato.js";
import VSRouter from "./routes/routesVS.js";
import faseRouter from "./routes/routesFase.js";

const app = express();
app.use(express.json())
connectionDB();
const allowedDomains = ["http://localhost:5173"]
const corsOptions = {
    origin: function (origin, callback) {
        if (allowedDomains.indexOf(origin) !== 1) {
            callback(null, true)
        } else {
            callback(new Error("No permitido por cors"))
        }
    }
};
app.use(cors(corsOptions))

app.use('/equipo', inscripcionEquiposRouter);
app.use('/campeonatos', campeonatosRouter);
app.use('/enfrentamiento', VSRouter);
app.use('/fases', faseRouter);
const PORT = 4000;

app.listen(PORT, () => {
    console.log("server working properly")
});