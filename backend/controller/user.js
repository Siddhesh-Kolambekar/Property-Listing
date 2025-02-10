import { user } from "../model/user.js";
import { registerOtp } from "../model/registerOtp.js";
import jwt from "jsonwebtoken"
// import Redis from "ioredis";
import argon2 from "argon2"
import "dotenv/config"
// const redis=new Redis(process.env.redis_url)

export const registration=async(req,res)=>{
    const{username,email,password,otp}=req.body
    if(!username || !email  || !password || !otp){
        return res.status(404).json({msg:"all fields are required"})
    }
    try{
        const userExist=await user.findOne({email})
        if(userExist){
            return res.status(400).json({msg:"user already exist"})
        }
        const hash=await argon2.hash(password)
        const otpTrue=await registerOtp.findOne({email})
        if(otp==otpTrue.otp){
            await registerOtp.deleteOne({email})
        }
        else{
            return res.status(404).json({msg:"wrong Otp"})
        }
        const newUser=new user({
            username,
            email,
            password:hash
        })
        // const clientList = await redis.call('CLIENT', 'LIST');
        // const connections = clientList.split('\n');
        // const activeConnections = connections.length;
        // if (activeConnections <= 40) {
        //     await redis.set(email, hash);   
        // }
        const data=await newUser.save()
        // console.log(data._id.toHexString())
        
        res.status(201).json({msg:"registration sucessfully"})
    }catch(err){
        console.log(err);
        return res.status(500).json({msg:"server error in registration"})
    }
}


export const login=async(req,res)=>{
    
    const{email,password}=req.body
    // console.log(email);
    if (!email || !password) {
        return res.status(400).json({ msg: "Email and password are required" });
    }
    // console.log(email);
    try{
        // const redisExist=await redis.get(email)
        // if(redisExist!==null){
        //     const hashed=await argon2.verify(redisExist,password)
        //     if(hashed){
        //     const token=jwt.sign({email:email},process.env.jwt_key,{expiresIn:"2day"})
        //     return res.status(200).json({token:token})
        //     }else{
        //         return res.status(401).json({msg:"Invalid credentials"})
        //     }
        // }
        const dbExist=await user.findOne({email})
        if(!dbExist){
            return res.status(404).json({msg:"User not exist"})
        }
        const hashed=await argon2.verify(dbExist.password,password)
        if(hashed){
        const token=jwt.sign({email:email},process.env.jwt_key,{expiresIn:"2day"})
        // console.log(token)
        return res.status(200).json({token:token})
        }
        return res.status(401).json({msg:"Invalid credentials"})

    }catch(err){
        console.log(err);
        res.status(500).json({msg:"server error in login"})
    }
}