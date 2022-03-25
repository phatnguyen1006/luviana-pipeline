import mongoose from "mongoose"
import Address from "./address.model.js"



const apartmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name of apartment is required!"]
    },
    address: {
        apartmentNumber: {
            type: String,
            required: [true, "Apartment number is required!"]
        },
        street: {
            type: String,
            required: [true, "Street is required!"]
        },
        district: {
            type: String,
            required: [true, "District is required!"]
        },
        province: {
            type: String,
            required: [true, "Province is required!"]
        }, 
        country: {
            type: String,
            required: [true, "Country is required"]
        }
    },
    type: {
        type: String,
        required: [true, "Type of appartment is required!"],
        enum: ["motel", "hotel", "homestay", "house", "apartment", "resort"]
    },
    rating: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
        required: [true, "Description of appartment is required!"]
    }

})

const Apartment = mongoose.model("Apartment", apartmentSchema);

export default Apartment
