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

userSchema.statics.login = async function(email, password, auth_type){

    console.log(email, password, auth_type)
    const user = await this.findOne({email, auth_type})
    console.log(user)

        if(user){

            if(auth_type === "password" && user.auth_type === "password"){
                let isAuthenticated = await bcrypt.compare(password, user.password)
                if(isAuthenticated){
                    user.password = undefined
                    return user
                }
                console.log(isAuthenticated)
                throw Error("account not found")
            }else if(auth_type === "google" && user.auth_type === "google"){
                user.password = undefined
                return user
            }else{
                throw Error("account not found")
            }

        }else{
            throw Error("account not found")
        }
}

const userModel = mongoose.model("user", userSchema)

module.exports = userModel