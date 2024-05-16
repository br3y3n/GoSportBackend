import mongoose from "mongoose";

const connectionDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/GoSport')
        console.log("connection established")
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

export default connectionDB;