const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    full_name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase:true
    },
    password: {
        type: String,
        required: false,
        default: null
    },
    auth_type: {
        type: String,
        toLowerCase: true,
        enum: ["google", "password"],
        trim: true,
        required:true
    },
    verified_email: {
        type: Boolean,
        default: false
    }
},{timestamps: true})


userSchema.pre("save", async function(next){
    if(this.auth_type === 'password'){
        const salt = await bcrypt.genSalt(12)

        this.password = await bcrypt.hash(this.password, salt)
    }

    next()
})

const userModel = mongoose.model("user", userSchema)

module.exports = userModel