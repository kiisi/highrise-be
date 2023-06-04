const { ChangeNameModel } = require("../models/documents")

const changeName = async (req, res) =>{

    const { user, old_name, new_name, confirm_new_name, email, phone_number, amount, passport, birth, affidavit, identification} =  req.body

    console.log(req.body)

    if(!user || !old_name || !new_name || !confirm_new_name || !email || !phone_number || !amount || !passport || !birth || !affidavit || !identification){
        return res.status(401).json({error: "All fields are required!"})
    }

    if(new_name !== confirm_new_name){
        return res.status(401).json({error: "New name confirmation failed!"})
    }

    try{
        if(parseInt(amount) !== 5000){
            return res.status(401).json({error: "Change of name fee is ₦5,000"})
        }
    
        const changeNameData = await ChangeNameModel.create({ user, old_name, new_name, confirm_new_name, email, phone_number, amount, passport, birth, affidavit, identification})
    
        return res.status(200).json({success: "Successful", data: changeNameData })

    }catch(err){
        console.log(err)
        res.status(500).json({error: "Server error"})
    }

}

module.exports = {
    changeName
}