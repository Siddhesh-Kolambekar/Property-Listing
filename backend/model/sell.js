import mongoose from "mongoose";
const sellingSchema=new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        required: true,
        ref: "user"
    },
    email:{type:String,required:true},
    properties:[String]
})

const sale=mongoose.model("sale",sellingSchema)
export {sale}