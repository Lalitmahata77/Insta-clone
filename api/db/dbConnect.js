import mongoose from "mongoose";
const dbConnect = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`DB conected successfully`);
        
    } catch (error) {
        console.log(error.message);
        process.exit(1)
        
    }
}

export default dbConnect