const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const otpSchema = new mongoose.Schema({
    user:{
        type: ObjectId,
        ref: "user",
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    verification_mode: {
        type: String,
        required: true,
        enum: ["email"]
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const otpModel = mongoose.model("otp", otpSchema)

module.exports = otpModel