const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

const referenceCodeSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        required: true
    },
    reference_code:{
        type: String,
        required: true
    },
    verified_reference_code: {
        type: Boolean,
        default: false
    }
}, {timestamps: true})

const referenceCodeModel = mongoose.model("referenceCode", referenceCodeSchema)

module.exports = referenceCodeModel