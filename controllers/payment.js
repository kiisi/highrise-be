import { serviceIdCodeGenerator } from "../helpers/index.js"
import { ChangeNameModel, LossDocsModel, PublicNoticeModel, AffidavitModel, CorrectionNameAgeModel } from "../models/documents.js"
import { NotificationModel } from '../models/notification.js'
import { ReferenceCodeModel } from "../models/referenceCode.js"

const changeNamePaymentVerification = async (req, res) =>{

    const { userId, serviceId } = req.body

    try {
        await ChangeNameModel.updateOne({ _id: serviceId }, {
            user_payment: true,
        });

        const data = await ChangeNameModel.findOne({ _id: serviceId })

        const serviceIdCode = data.docs_ref 

        const message = `You have successfully completed your Change Of Name process. Your verification ID is ${serviceIdCode}`;

        await NotificationModel.create({ user: userId, service: serviceId, service_id_code: serviceIdCode , message: message })
        
        await ReferenceCodeModel.create({ user: userId, reference_code: serviceIdCode, service_type: "change-of-name", service: serviceId })

        res.status(200).json({success: true})

    }catch(err){
        console.log(err)
        res.status(400).json({error: "Encountered an error!"})
    }
    
}

const correctionNameAgePaymentVerification = async (req, res) =>{

    const { userId, serviceId } = req.body

    try {
        await CorrectionNameAgeModel.updateOne({ _id: serviceId }, {
            user_payment: true,
        });

        const data = await CorrectionNameAgeModel.findOne({ _id: serviceId })

        const serviceIdCode = data.docs_ref

        const message = `You have successfully completed your Correction Of Name/Age process. Your verification ID is ${serviceIdCode}`;

        await NotificationModel.create({ user: userId, service: serviceId, service_id_code: serviceIdCode , message: message })
        
        await ReferenceCodeModel.create({ user: userId, reference_code: serviceIdCode, service_type: "change-of-name", service: serviceId })

        res.status(200).json({success: true})

    }catch(err){
        console.log(err)
        res.status(400).json({error: "Encountered an error!"})
    }
    
}

const lossDocsPaymentVerification = async (req, res) =>{

    const { userId, serviceId } = req.body

    try {
        await LossDocsModel.updateOne({ _id: serviceId }, {
            user_payment: true,
        });

        const data = await LossDocsModel.findOne({ _id: serviceId })

        const serviceIdCode = data.docs_ref

        const message = `You have successfully completed your Loss of Document process. Your verification ID is ${serviceIdCode}`;

        await NotificationModel.create({ user: userId, service: serviceId, service_id_code: serviceIdCode , message: message })
    
        await ReferenceCodeModel.create({ user: userId, reference_code: serviceIdCode, service_type: "loss-of-documents", service: serviceId })

        res.status(200).json({success: true})

    }catch(err){
        console.log(err)
        res.status(400).json({error: "Encountered an error!"})
    }
    
}

const publicNoticePaymentVerification = async (req, res) =>{

    const { userId, serviceId } = req.body


    try {
        await PublicNoticeModel.updateOne({ _id: serviceId }, {
            user_payment: true,
        });
        
        const data = await PublicNoticeModel.findOne({ _id: serviceId })

        const serviceIdCode = data.docs_ref

        const message = `You have successfully completed your Public Notice process. Your verification ID is ${serviceIdCode}`;

        await NotificationModel.create({ user: userId, service: serviceId, service_id_code: serviceIdCode , message: message })
        
        await ReferenceCodeModel.create({ user: userId, reference_code: serviceIdCode, service_type: "public-notice", service: serviceId })

        res.status(200).json({success: true})

    }catch(err){
        console.log(err)
        res.status(400).json({error: "Encountered an error!"})
    }
    
}

const affidavitPaymentVerification = async (req, res) =>{

    const { userId, serviceId } = req.body


    try {
        await AffidavitModel.updateOne({ _id: serviceId }, {
            user_payment: true,
        });
        
        const data = await AffidavitModel.findOne({ _id: serviceId })

        const serviceIdCode = data.docs_ref

        const message = `You have successfully completed your Swear of Afidavit process. Your verification ID is ${serviceIdCode}`;

        await NotificationModel.create({ user: userId, service: serviceId, service_id_code: serviceIdCode , message: message })
        
        await ReferenceCodeModel.create({ user: userId, reference_code: serviceIdCode, service_type: "affidavit", service: serviceId })
        
        res.status(200).json({success: true})

    }catch(err){
        console.log(err)
        res.status(400).json({error: "Encountered an error!"})
    }
    
}

const verifyCode = async (req, res) =>{
    const { reference_code } = req.body

    try{

        const data = await ReferenceCodeModel.findOne({reference_code: reference_code}).populate('user').populate('service').exec()

        if(!data){
            return res.status(403).json({error: "Invalid reference code"})
        }

        console.log(data)
        data.user.password = undefined

        if(data.verified_reference_code){
            return res.status(403).json({warn: "Already verified", data: data})
        }

        return res.status(200).json({success: "Reference code is valid", data: data})

    }catch(err){
        console.log("An unexpected error occurred!", err)
    }
}

const verifyPayment = async (req, res) =>{

    const { reference_code } = req.body

    try {
        const data = await ReferenceCodeModel.findOne({reference_code: reference_code})

        if(!data){
            return res.status(403).json({error: "Invalid reference code"})
        }

        if(data.verified_reference_code){
            return res.status(403).json({error: "Already verified"})
        }

        await ReferenceCodeModel.updateOne({ reference_code: reference_code }, {
            verified_reference_code: true,
        });

        res.status(200).json({success: "Verification Successful"})

    }catch(err){
        console.log(err)
        res.status(400).json({error: "Encountered an error!"})
    }
    
}

export {
    changeNamePaymentVerification,
    lossDocsPaymentVerification,
    publicNoticePaymentVerification,
    affidavitPaymentVerification,
    correctionNameAgePaymentVerification,
    verifyCode,
    verifyPayment
}