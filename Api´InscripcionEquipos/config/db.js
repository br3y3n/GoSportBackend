import mongoose from "mongoose";

const connectionDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://GoSport:e4t5La0iPpalsVTT@atlascluster.aiyeayr.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster')
        console.log("connection established")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

export default connectionDB;