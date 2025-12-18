import mongoose,{Mongoose,Schema} from "mongoose";

const loginSchema =new Schema({

    username:{type:String,required:true},
    password:{type:String,required:true},
    role:{type:String,required:true},
})

const logindata=mongoose.model("Login",loginSchema)

export default logindata


