const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const ChangeNameSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        required: true
    },
    old_name: {
        type: String,
        required: true
    },
    new_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    passport: {
        type: String,
        required: true
    },
    birth: {
        type: String,
        required: true
    },
    affidavit: {
        type: String,
        required: true
    },
    identification: {
        type: String,
        required: true
    },
    user_payment:{
        type: Boolean,
        default:false
    }
})

const ChangeNameModel = mongoose.model("change-of-name", ChangeNameSchema);


module.exports = {
    ChangeNameModel
}