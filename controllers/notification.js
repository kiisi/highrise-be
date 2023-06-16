const NotificationModel = require("../models/notification")

const notify = async (req, res) => {

    try {
        const { id } = req.body

        const data = await NotificationModel.find({ user: id })

        console.log(data)

        res.status(200).json({ success: true, data: data })

    } catch (err) {
        console.log(err)
        res.status(200).json({ error: "Error loading notifications!" })
    }

}

module.exports = { notify }