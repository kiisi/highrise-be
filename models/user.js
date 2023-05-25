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
    const salt = await bcrypt.genSalt()

    this.password = await bcrypt.hash(this.password, salt)

    next()
})

userSchema.statics.login = async function(email, password){

    const user = await UserModel.findOne(email)

        if(user){

            if(user.auth_type === "password"){
                let isAuthenticated = await bcrypt.compare(user.password, password)
                if(isAuthenticated){
                    user.password = undefined
                    return user
                }
                throw Error("account not found")
            }

            if(user.auth_type === "google"){
                user.password = undefined
                return user
            }

        }else{
            throw Error("account not found")
        }
}

const userModel = mongoose.model("user", userSchema)

module.exports = userModel