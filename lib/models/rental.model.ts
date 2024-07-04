import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: [256, 'Invalid length. Maximum is 256 characters'],
        lowerCase: true
    },
    apartmentType: {
        type: String,
        required: true,
    }
    ,
    description: {
        type: String,
        required: true,
        lowerCase: true
    },
    rentalType: [
        {
        type: String,
       }
   ],
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
        type: {
            name: String,
            address: String,
            latitude: Number,
            longitude: Number
        }
    },
    rentalRules: [
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
    serviceFee: {
        type: {
            paidBy: String,
            amount: Number,
        }
    },
    rentalOffers: [
        {
            type: String
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
    },
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    updatedAt: {
        type: Date,
        default: () => new Date()
    }
})

rentalSchema.pre('save', function(next) {
    this.updatedAt = Date.now() as any
    next()
})

const Rental = mongoose.models.Rental || mongoose.model('Rental', rentalSchema)

export default Rental