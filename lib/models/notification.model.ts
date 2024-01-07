import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    to: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true,
    },
    read: {
        type: Boolean,
        default: false
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

notificationSchema.pre('save', function(next) {
    this.updatedAt = Date.now() as any 
    next()
})

const Notification = mongoose.models.Notification || mongoose.model('Notification', notificationSchema)

export default Notification