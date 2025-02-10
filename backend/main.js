import express from "express"
import connection from "./db.js"
import "dotenv/config"
import { router } from "./router/router..js"
import cors from "cors"
const app=express()
app.use(cors())
app.use(express.json())
app.use(router)


app.listen(process.env.PORT,()=>{
    connection()
    console.log(`server started 🚀`);
}) 