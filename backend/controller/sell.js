import "dotenv/config"
import {v2} from "cloudinary"
import fs from "fs";
import Property from "../model/property.js";
import { sale } from "../model/sell.js";
import { user } from "../model/user.js";
import jwt from "jsonwebtoken"
v2.config({
    cloud_name:process.env.cloud_name,
    api_key:process.env.api_key,
    api_secret:process.env.api_secret,
  });
  

  export const sell=async(req,res)=>{
    const{title,price,category,longitude,latitude,phone,city,length,breadth,bhk,description,established}=req.body
    const token=req.headers.authorization
    if(!title || !price || !category || !longitude ||!latitude ||!phone || !city || !length || !breadth ||!bhk || !description ||!established){
        return res.status(401).json({msg:"All fields are required"})
    }
    const lon = parseFloat(longitude);
    const lat = parseFloat(latitude);
    const coordinates=[lon,lat]
    if(!token){
        return res.status(403).json({msg:"token required"})
    }
    try{
        const decoded=jwt.verify(token,process.env.jwt_key)
        const email=decoded.email
        console.log(email)
        const userExist=await user.findOne({email})
        if(!userExist){
            for (let i = 0; i < req.files.length; i++) {
                fs.unlink(req.files[i].path, (err) => {
                    if (err) {
                        console.error("Error deleting the file from the server:", err);
                    }
                });
            }
            return res.status(404).json({msg:"user not found"})
        }
        const uploadedUrls = [];
        if(req.files){
        for (let i = 0; i < req.files.length; i++) {
        let x = await v2.uploader.upload(req.files[i].path);
        fs.unlink(req.files[i].path, (err) => {
        if (err) {
            console.error("Error deleting the file from the server:", err);
        }
        });
        uploadedUrls.push(x.secure_url);
    }
} 
    const newProperty = new Property({
        userId: userExist._id, 
        title,
        price,
        imageUrls:uploadedUrls,  
        location: {
          type: "Point",
          coordinates: coordinates,
        },
        category,
        phone,
        city,
        length,
        breadth,
        bhk,
        established,
        description
      });
      const addedProperty=await newProperty.save()
      await newProperty.populate("userId")
      const saleExist=await sale.findOne({email})
      if(saleExist){
        saleExist.properties.push(addedProperty._id.toHexString())
        await saleExist.save() 
        await saleExist.populate("userId")
      }else{
        const newSaller=new sale({
            userId:userExist._id,
            email:email,
            properties:[addedProperty._id.toHexString()]
        })
        await newSaller.save() 
      } 
      return res.status(200).json({msg:"New Property added sucessfully"})
    }catch(err){
        console.log(err);
        res.status(500).json({msg:"error in uploading file"})
    }
  }