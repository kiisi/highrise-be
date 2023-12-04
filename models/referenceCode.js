import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema.Types

const referenceCodeSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: "user"
    },
    service: {
        type: ObjectId,
        required: true,
        refPath: "service_type"
    },
    reference_code: {
        type: String,
        required: true
    },
    service_type: {
        type: String,
        required: true,
        enum: ["change-of-name", "correction-of-name-age", "loss-of-documents", "public-notice", "affidavit"],
    },
    verified_reference_code: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

const ReferenceCodeModel = mongoose.model("referenceCode", referenceCodeSchema)

export { ReferenceCodeModel }
