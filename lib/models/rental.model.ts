import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: [256, 'Invalid length. Maximum is 256 characters'],
        lowerCase: true
    },
    description: {
        type: String,
        required: true,
        lowerCase: true
    },
    rentalType: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
        lowerCase: true
    },
    images: [
        {
            type: String,
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amenities: [
        {
            type: String,

        }
    ],
    geoLocation: {
        type: String,
    },
    rentalsRules: [
        {
            type: String,
        }
    ],
    availableRooms: {
        type: Number
    },
    rentalsNear: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rental'
        }
    ],
    serviceFee: [
        {
            paidBy: String,
            amount: Number,
        }
    ],
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        }
    ],
    rentalStatus: {
        type: Boolean,
        required: true,
        defualt: true,
    },

})

const Rental = mongoose.models.Rental || mongoose.model('Rental', rentalSchema)

export default Rental