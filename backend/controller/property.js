import Property from "../model/property.js";


export const getProperty=async(req,res)=>{
    try{
        const data=await Property.find().select("-userId")
        res.send(data)

    }catch(err){
        return res.status(500).json({msg:"error in getProperty"})
    }
}