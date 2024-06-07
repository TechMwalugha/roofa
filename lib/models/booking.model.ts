import mongoose from "mongoose";
import { string } from "zod";

const bookingSchema = new mongoose.Schema({
    MerchantRequestID: {
        type: String,
        required: true,
    },
    bookedBy: {
        type: mongoose.Schema.Types.ObjectId || null,
        ref: 'User'
    },
    apartmentBooked: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rental',
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    fullName: {
        type: String,
        lowercase: true,
    },
    reportingDate: {
        type: Date,
        required: true
    }, 
    identityNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    isBookingSettled: {
        type: Boolean,
        default: false
    },
    isPaymentMade: {
        type: {
            isMade: Boolean,
            reason: String,
        }
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

bookingSchema.pre('save', function(next) {
    this.updatedAt = Date.now() as any
    next()
})

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema)

export default Booking