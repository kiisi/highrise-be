import mongoose from "mongoose"

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    expires_at:{
        type: Date,
        required: true
    }
}, {timestamps: true})

const OtpModel = mongoose.model("otp", otpSchema)

export { OtpModel }