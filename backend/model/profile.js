import mongoose from "mongoose"
const profileSchema=new mongoose.Schema({
    image:{type:String},
    username:{type:String,required:true},
    email:{type:String, required:true},
    phone:{type:Number,required:true},
    bio:{type:String,required:true},
    city:{type:String,required:true}
})
const profile=mongoose.model("profile",profileSchema)
export {profile}