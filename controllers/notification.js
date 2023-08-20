import { NotificationModel } from "../models/notification.js"

const notify = async (req, res) => {

    try {
        const { id } = req.body

        const data = await NotificationModel.find({ user: id }).sort({"createdAt": -1})

        console.log(data)

        res.status(200).json({ success: true, data: data })

    } catch (err) {
        console.log(err)
        res.status(200).json({ error: "Error loading notifications!" })
    }

}

export { notify }