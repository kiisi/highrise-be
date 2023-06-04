const { ChangeNameModel } = require("../models/documents")


const verifyPayment = async (req, res) =>{

    const { id } = req.body


    try {
        const data = await ChangeNameModel.updateOne({ _id: id }, {
            user_payment: true,
        });
        console.log(data)
        res.json({data})

    }catch(err){
        console.log(err)
    }
    
}


module.exports = {
    verifyPayment
}