import mongoose from "mongoose"
import Apartment from "./apartment.model.js";



const roomSchema = new mongoose.Schema({
    apartmentId: {
        type: mongoose.Types.ObjectId,
        required: [true, "Apartment id of room is required!"],
        ref: Apartment
    },
    price: {
        type: Number,
        required: [true, "Price of room is required!"]
    },
    description: {
        type: String,
        required: [true, "Description of room is required!"]
    },
    capacity: {
        type: Number,
        required: [true, "Capacity of room is required!"]
    },
    rating: {
        type: Number,
        required: [true, "Rating of room is required!"]
    },
    thumbnail: {
        type: String,
        required: [true, "Thumbnail of room is required!"]
    },
    pictures: [{
        type: String,
    }],
    isAvailable: {
        type: Boolean,
        default: true,
        required: true
    },
    facilities: [{
        type: String
    }]
})

const Room = mongoose.model("Room", roomSchema);

export default Room