import mongoose, {Schema} from "mongoose";

const studentSchema =new Schema({
    name:{type:String,required:true},
    department:{type:String,required:true},
    year:{type:String,required:true},
    email:{type:String,required:true},
    phoneno:{type:String,required:true},

    commonkey:{type:Schema.Types.ObjectId,ref:"Login"}
})

const studentdata =mongoose.model("student",studentSchema)

export default studentdata