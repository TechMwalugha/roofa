import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true
    },
    image: {
        type: String,
        default: "/assets/account-profile.png"
    },
    password: {
        type: String
    },
    signInType: {
        type: String,
    },
    isEmailVerified: {
        type: Boolean
    },
    verificationToken: {
        type: String,
    },
    role: {
        type: String,
        default: "user"
    },
    accountStatus: {
        type: Boolean,
        default: true
    },
    payments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Payment'
        }
    ],
    rentalHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property'
        }
    ],
    favorites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Property'
        }
    ],
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Booking'
        }
    ],
    notifications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Notification'
        }
    ],
    createdAt: {
        type: Date,
        default: () => new Date()
    },
    updatedAt: {
        type: Date,
        default: () => new Date()
    }
})

userSchema.pre('save', function(next) {
    this.updatedAt = Date.now() as any
    next()
})

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User