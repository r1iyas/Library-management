import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
    bookname:{type:String,required:true},
    author:{type:String,required:true},
    category:{type:String,required:true},
    totalcopies:{type:Number,required:true},
    availablecopies:{type:Number,required:true},
})

const Book=mongoose.model("book",bookSchema)

export default Book;