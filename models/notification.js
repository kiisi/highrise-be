import mongoose from "mongoose"
const { ObjectId } = mongoose.Schema.Types

const notificationSchema = new mongoose.Schema({
    user: {
        type: ObjectId,
        required: true
    },
    service: {
        type: ObjectId,
        required: true
    },
    service_id_code:{
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
}, {timestamps: true})

const NotificationModel = mongoose.model("notification", notificationSchema)

export { NotificationModel }