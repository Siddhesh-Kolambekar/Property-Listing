import mongoose from "mongoose";
import "dotenv/config"

const connection=async()=>{
    const url=process.env.Mongo_url
    try{
       await mongoose.connect("mongodb+srv://vijaynimar:X2DCUTXzFRG9L2ec@property.ylzok.mongodb.net/?retryWrites=true&w=majority&appName=property")
        console.log("connected to mongoDb");
    }catch(err){
        console.log(err);
        console.log("error in mongo connection");
    }
}
export default connection 