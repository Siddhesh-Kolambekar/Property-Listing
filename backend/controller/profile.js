import { profile } from "../model/profile.js";
import { user } from "../model/user.js";
import jwt from "jsonwebtoken"
import "dotenv/config"
import {v2} from "cloudinary"
v2.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret,
  });
  
export const uploadProfile=async(req,res)=>{
    const token=req.headers.authorization
    const {username,bio,phone,city}=req.body
    if(!token){
        return res.status(404).json({msg:"send token"})
    }
    try{
        const decoded=jwt.verify(token,process.env.jwt_key)
        if(!decoded){
            return res.status(403).json({msg:"Invlaid token"})
        }
        const {email}=decoded
        const userExist=await user.findOne({email})
        if(!userExist){
            return res.status(404).json({msg:"invalid user"})
        }
        const x=await v2.uploader.upload(req.file.path)
        const profileExists=await profile.findOne({email})
        if(profileExists){
            return res.status(404).json({msg:"profile alreday exists"})
        }
        const newProfile=new profile({
            image:x.secure_url,
            username,
            bio,
            email,
            city
        })
        await newProfile.save();

        return res.status(200).json({ msg: "Profile uploaded successfully"});
    }catch(err){
        return res.status(500).json({msg:"error in Upload profile"})
    }
}