import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bcrypt from "bcrypt"
import studentdata from "./model/studentreg.js";
import logindata from "./model/login.js";
import multer from "multer";


mongoose.connect("mongodb://localhost:27017/LibraryManagement").then(()=>{
    console.log("mongodb connected successfully");
    
}).catch((error)=>{
    console.error("mongodb connection error")
})

const server =express()

server.use(express.json());
server.use(cors({
    origin:'*'
}))

server.listen(5000,()=>{
    console.log("server started")
})
// ----------------- Multer Configuration -----------------
const storage = multer.diskStorage({
  destination: "uploads/", // all files will be stored in 'uploads/' folder
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // unique filename
  },
});

const upload = multer({ storage });
server.use("/uploads", express.static("uploads"));


server.post("/addstudent",async (req,res)=>{
    console.log(req.body)
    const {name,department,year,email,phoneno,password}=req.body
    try{  
        const exist =await logindata.findOne({username:email})
        if(exist){
            return res.status(409).json({message:"student already exist"})

        }
        const hashedpassword =await bcrypt.hash(password,8)
        const login=await logindata.create({username:email,password:hashedpassword,role:"student"})
        await studentdata.create({commonkey:login._id,name,department,year,email,phoneno})

        return res.status(200).json({statuscode:200,message:"student registed successfully"})

    }
    catch(error){
         console.log(error);

         res.status(500).json({statuscode:500,message:"server error"})
    }
   

    
})

server.post("/addlogindata",async (req,res)=>{
    console.log(req.body);
    const{email,password}=req.body

    try{
        const user=await logindata.findOne({username:email})
        console.log(user,'..');

        if(!user){
            return res.json({statuscode:400,message:"user not existed"})
        }

        const passwordvalue =await bcrypt.compare(password,user.password)
        if(!passwordvalue){
            return res.status(400).json({statuscode:400,message:"password is invalid"})
        }
        return res.status(200).json({message:"login successfully",user})
    }catch(error){
        console.log(error);
        res.status(500).json({statuscode:500,message:"server error"});
    }
})
