const { ChangeNameModel, LossDocsModel, PublicNoticeModel, AffidavitModel } = require("../models/documents")
const validator = require('validator');



const changeName = async (req, res) =>{

    const { user, old_name, new_name, confirm_new_name, email, phone_number, amount, passport, birth, affidavit, identification, nin} =  req.body


    if(!user || !old_name || !new_name || !confirm_new_name || !email || !phone_number || !amount || !passport || !birth || !affidavit || !identification || !nin){
        return res.status(401).json({error: "All fields are required!"})
    }

    if(new_name !== confirm_new_name){
        return res.status(401).json({error: "New name confirmation failed!"})
    }

    // Validate Email

    if (!validator.isEmail(email)) {
        return res.status(404).json({ error: "Invalid Email" })
    }

    try{
        if(parseInt(amount) !== 5000){
            return res.status(401).json({error: "Change of name fee is ₦5,000"})
        }
    
        const changeNameData = await ChangeNameModel.create({ user, old_name, new_name, confirm_new_name, email, phone_number, amount, passport, birth, affidavit, identification, nin})
    
        return res.status(201).json({success: "Successful", data: changeNameData })

    }catch(err){
        console.log(err)
        res.status(500).json({error: "Server error"})
    }

}


const lossDocs = async (req, res) =>{

    const { user, full_name, email, amount, marriage, passport, birth, affidavit, identification, nin} =  req.body

    if(!user || !full_name|| !email || !amount || !marriage || !passport || !birth || !affidavit || !identification || !nin){
        return res.status(401).json({error: "All fields are required!"})
    }

    // Validate Email

    if (!validator.isEmail(email)) {
        return res.status(404).json({ error: "Invalid Email" })
    }

    try{
        if(parseInt(amount) !== 7500){
            return res.status(401).json({error: "Loss of Documents fee is ₦7,500"})
        }
    
        const lossDocsData = await LossDocsModel.create({ user, full_name, email, amount, marriage, passport, birth, affidavit, identification, nin})
    
        return res.status(201).json({success: "Successful", data: lossDocsData })

    }catch(err){
        console.log(err)
        res.status(500).json({error: "Server error"})
    }
}


const publicNotice = async (req, res) =>{

    const { user, full_name, email, phone_number, amount, marriage, passport, birth, affidavit, identification, nin} =  req.body

    if(!user || !full_name || !email || !phone_number || !amount || !marriage || !passport || !birth || !affidavit || !identification || !nin){
        return res.status(401).json({error: "All fields are required!"})
    }

    // Validate Email

    if (!validator.isEmail(email)) {
        return res.status(404).json({ error: "Invalid Email" })
    }

    try{
        if(parseInt(amount) !== 15000){
            return res.status(401).json({error: "Public Notice fee is ₦15,000"})
        }
    
        const publicNoticeData = await PublicNoticeModel.create({ user, full_name, email, phone_number, amount, marriage, passport, birth, affidavit, identification, nin})
    
        return res.status(201).json({success: "Successful", data: publicNoticeData })

    }catch(err){
        console.log(err)
        res.status(500).json({error: "Server error"})
    }

}

const affidavit = async (req, res) =>{

    const { user, full_name, email, phone_number, amount, marriage, passport, birth, affidavit, identification, nin} =  req.body

    if(!user || !full_name || !email || !phone_number || !amount || !marriage || !passport || !birth || !affidavit || !identification || !nin){
        return res.status(401).json({error: "All fields are required!"})
    }

    // Validate Email

    if (!validator.isEmail(email)) {
        return res.status(404).json({ error: "Invalid Email" })
    }

    try{
        if(parseInt(amount) !== 15000){
            return res.status(401).json({error: "Swear Of Affidavit fee is ₦15,000"})
        }
    
        const affidavitData = await AffidavitModel.create({ user, full_name, email, phone_number, amount, marriage, passport, birth, affidavit, identification, nin})
    
        return res.status(201).json({success: "Successful", data: affidavitData })

    }catch(err){
        console.log(err)
        res.status(500).json({error: "Server error"})
    }

}

module.exports = {
    changeName,
    lossDocs,
    publicNotice,
    affidavit
}