import { docsRefGenerator } from "../helpers/index.js"
import { ChangeNameModel, LossDocsModel, PublicNoticeModel, AffidavitModel, CorrectionNameAgeModel } from "../models/documents.js"
import validator from 'validator'

const changeName = async (req, res) =>{

    const { user, old_name, new_name, confirm_new_name, email, phone_number, amount, passport, birth, affidavit, identification, nin } =  req.body

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
        
        if(parseInt(amount) !== 3000){
            return res.status(401).json({error: "Change of name fee is ₦3,000"})
        }
        
        const docs_ref = docsRefGenerator()
    
        const changeNameData = await ChangeNameModel.create({ user, old_name, new_name, confirm_new_name, email, phone_number, amount, passport, birth, affidavit, identification, nin, docs_ref })
    
        return res.status(201).json({success: "Successful", data: changeNameData })

    }catch(err){
        console.log(err)
        res.status(500).json({error: "Server error"})
    }

}

const correctionNameAge = async (req, res) =>{

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
        console.log(amount)

        if(parseInt(amount) !== 4000){
            return res.status(401).json({ error: "Change of name fee is ₦4,000" })
        }

        const docs_ref = docsRefGenerator()
    
        const correctionNameAgeData = await CorrectionNameAgeModel.create({ user, old_name, new_name, confirm_new_name, email, phone_number, amount, passport, birth, affidavit, identification, nin, docs_ref })
    
        return res.status(201).json({success: "Successful", data: correctionNameAgeData })

    }catch(err){
        console.log(err)
        res.status(500).json({ error: "Server error" })
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

        const docs_ref = docsRefGenerator()
    
        const lossDocsData = await LossDocsModel.create({ user, full_name, email, amount, marriage, passport, birth, affidavit, identification, nin, docs_ref })
    
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

        const docs_ref = docsRefGenerator()
    
        const publicNoticeData = await PublicNoticeModel.create({ user, full_name, email, phone_number, amount, marriage, passport, birth, affidavit, identification, nin, docs_ref })
    
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

        const docs_ref = docsRefGenerator()
    
        const affidavitData = await AffidavitModel.create({ user, full_name, email, phone_number, amount, marriage, passport, birth, affidavit, identification, nin, docs_ref})
    
        return res.status(201).json({success: "Successful", data: affidavitData })

    }catch(err){
        console.log(err)
        res.status(500).json({error: "Server error"})
    }

}

export {
    changeName,
    correctionNameAge,
    lossDocs,
    publicNotice,
    affidavit
}