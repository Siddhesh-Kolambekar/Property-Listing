import { Router } from "express";
import { registration,login } from "../controller/user.js";
import { sendRegisterOtp } from "../controller/nodemailer.js";
import { getProperty } from "../controller/property.js";
import { sell } from "../controller/sell.js";
import { upload } from "../middleware/upload.js";
import { profileMulter } from "../middleware/upload.js";
import { uploadProfile } from "../controller/profile.js";
const router=Router()
router.post("/sign-in",registration)
router.post("/log-in",login)
router.post("/otp-register",sendRegisterOtp)
router.post("/uploadProperty",upload,sell)
router.get("/propertyget",getProperty)
router.post("/profileUpload",profileMulter.single("profile"),uploadProfile)
export {router}