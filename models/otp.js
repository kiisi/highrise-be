const mongoose = require("mongoose")

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

const otpModel = mongoose.model("otp", otpSchema)

module.exports = otpModel