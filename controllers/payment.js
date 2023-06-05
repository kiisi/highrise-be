const { ChangeNameModel, LossDocsModel, PublicNoticeModel, AffidavitModel } = require("../models/documents")


const changeNamePaymentVerification = async (req, res) =>{

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

const lossDocsPaymentVerification = async (req, res) =>{

    const { id } = req.body


    try {
        const data = await LossDocsModel.updateOne({ _id: id }, {
            user_payment: true,
        });
        console.log(data)
        res.json({data})

    }catch(err){
        console.log(err)
    }
    
}

const publicNoticePaymentVerification = async (req, res) =>{

    const { id } = req.body


    try {
        const data = await PublicNoticeModel.updateOne({ _id: id }, {
            user_payment: true,
        });
        console.log(data)
        res.json({data})

    }catch(err){
        console.log(err)
    }
    
}

const affidavitPaymentVerification = async (req, res) =>{

    const { id } = req.body


    try {
        const data = await AffidavitModel.updateOne({ _id: id }, {
            user_payment: true,
        });
        console.log(data)
        res.json({data})

    }catch(err){
        console.log(err)
    }
    
}


module.exports = {
    changeNamePaymentVerification,
    lossDocsPaymentVerification,
    publicNoticePaymentVerification,
    affidavitPaymentVerification
}