import mongoose,{Schema} from "mongoose";

const issueRequestSchema = new Schema({

    bookId: {
      type: mongoose.Schema.Types.ObjectId,required: true
    },

    bookName: {
      type: String,required: true
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,required: true
    },

    userName: {
      type: String,required: true
    },

    status: {
      type: String,enum: ["pending", "approved", "rejected"],
      default: "pending"
    },

    requestDate: {
      type: Date,default: Date.now
    },

    issueDate: {
      type: Date
    },

    returnDate: {
      type: Date
    }
  },
  { timestamps: true }

)
issueRequestSchema.index(
  { bookId: 1, userId: 1, status: 1 }
);

const issueRequest =mongoose.model("issuerequest",issueRequestSchema)

export default issueRequest;