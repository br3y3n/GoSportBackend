import mongoose from "mongoose";

const connectionDB = async () => {
    try {
        const dbURI ='mongodb+srv://GoSport:e4t5La0iPpalsVTT@atlascluster.aiyeayr.mongodb.net/goSport';
        await mongoose.connect(dbURI, { useNewUrlParser: true });
        console.log("Connection established to goSport database");
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        process.exit(1);
    }
};

export default connectionDB;
