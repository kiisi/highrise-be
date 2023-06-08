const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema.Types

// Change Of Name Model

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
    nin: {
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

// Loss Of Documents Model

const LossDocsSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    nin: {
        type: Number,
        required: true
    },
    marriage: {
        type: String,
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

const LossDocsModel = mongoose.model("loss-of-documents", LossDocsSchema);


// Public Notice Model

const PublicNoticeSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    nin: {
        type: Number,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    marriage: {
        type: String,
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

const PublicNoticeModel = mongoose.model("public-notice", PublicNoticeSchema);


// Affidavit Notice Model

const AffidavitSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    nin: {
        type: Number,
        required: true
    },
    phone_number: {
        type: Number,
        required: true
    },
    marriage: {
        type: String,
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

const AffidavitModel = mongoose.model("affidavit", AffidavitSchema);

module.exports = {
    ChangeNameModel,
    LossDocsModel,
    PublicNoticeModel,
    AffidavitModel
}