import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    MerchantRequestID: {
        type: String,
        required: true,
    },
    CheckoutRequestID: {
        type: String,
        required: true,
    },
    ResultCode: {
        type: String,
    },
    ResultDesc: {
        type: String,
    },
    amount: {
        type: Number,
    },
    mpesaReceiptNumber: {
        type: String,
    },
    transactionDate: {
        type: Date,
    },
    mpesaPhoneNumber: {
        type: String,
    },
    typeOfPayment: {
        type: String,
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

paymentSchema.pre('save', function (next) {
    this.updatedAt = Date.now() as any
    next()
} )

const Payment = mongoose.models.Payment || mongoose.model('Payment', paymentSchema)

export default Payment