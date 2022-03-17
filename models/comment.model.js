import mongoose from "mongoose"
import User from "./user.model";



const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: true
    },
    content: {
        type: String,
        required: true
    },
    vote: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
})

const Comment = mongoose.model("Comment", commentSchema);

export default Comment