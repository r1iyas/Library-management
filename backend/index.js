import mongoose from "mongoose";
import express, { request } from "express";
import cors from "cors";
import bcrypt from "bcrypt"
import studentdata from "./model/studentreg.js";
import logindata from "./model/login.js";
import multer from "multer";
import Book from "./model/addbook.js";
import issueRequest from "./model/IssueRequest.js";



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

server.get("/studentdata/:id",async(req,res)=>{
    try{
        const result=await studentdata.findOne({commonkey:req.params.id})
        if(result){
            res.status(200).json({statuscode:200,result})
        }
        else{
            res.status(400).json({statuscode:400,message:"try again"})
        }
    }catch(error){
        console.log(error);
        
        res.status(500).json({statuscode:500,message:"server error"})
    }
})

server.post("/add",async(req,res)=>{
    
    try{
        const {bookname,author,category,totalcopies,availablecopies} =req.body
    

    const newBook =await Book.create({
        bookname,
        author,
        category,
        totalcopies,
        availablecopies
    })

    res.json({message:"book added successfully"});

}catch(error){
    res.status(500).json({message:"error adding book"});
}

})

server.get("/get", async (req, res) => {
    try {
        const books = await Book.find();  // fetch all books from DB
        res.status(200).json(books);
    } catch (error) {
        console.log("Error fetching books:", error);
        res.status(500).json({ message: "Server error fetching books" });
    }
});

server.get("/get/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Error fetching book" });
  }
});





server.get("/get", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

server.delete("/delete/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});


server.put("/update/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBook);
  } catch (err) {
    res.status(500).json({ message: "Update failed" });
  }
});


server.post("/issueRequest",async(req,res)=>{
  try{
    const {bookId,bookName,userId,userName}=req.body;

    if(!bookId || !bookName || !userId || !userName){

      return res.status(400).json({
        message:"all fields are required"
      })
    }

    const existingRequest =await issueRequest.findOne({
      bookId,userId,status:"pending"
    })

    if(existingRequest){
      return res.status(400).json({
        message:"you are already requested this book"

      })
    }

    const newRequest =new issueRequest({
      bookId,bookName,userId,userName
    })

    await newRequest.save();

    res.status(201).json({
      message:"issue request sent successfully",
      request:newRequest
    })

  }catch(error){
    console.error("issue request error:",error);
    res.status(500).json({
      message:"server error"
    })
  }
})

server.get("/adminIssueRequests",async (req,res)=>{
  try{
    const requests =await issueRequest.find().sort({createdAt:-1});
    res.status(200).json(requests);


  }catch(error){
    console.error(error);
    res.status(500).json({message:"server error"})
  }
}

)

server.put("/adminIssueRequestsApprove/:id",async (req,res)=>{
  try{
    const request =await issueRequest.findById(req.params.id);
    
    if(!request){
      return res.status(404).json({message:"Request not found"})
    }
    if(request.status !=="pending"){
      return res.status(400).json({message:"request already proccessed"})

    }
    const book =await Book.findById(request.bookId);

    if(!book || book.availablecopies<=0){
      return res.status(400).json({message:"Book not available "})
    }

    request.status ="approved";
    request.issueDate=new Date();
    await request.save();

    book.availablecopies -=1;
    await book.save();

    res.status(200).json({message:"Request approved successfully"})

  }catch(error){
    console.error(error);
    res.status(500).json({message:"server error"})

  }

});

server.put("/adminIssueRequestReject/:id",async(req,res)=>{
    try{
      const request =await issueRequest.findById(req.params.id);

      if(!request){
        return res.status(404).json({message:"request not found"});
      }

      if(request.status!=="pending"){
        return res.status(400).json({message:"request already processed"})
      }

      request.status ="rejected";
      await request.save();

      res.status(200).json({message:"request rejected successfully"})

     

    }catch(error){
      console.error(error)
       res.status(500).json({message:"server error"})
    }
})