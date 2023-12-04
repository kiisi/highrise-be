import jwt from "jsonwebtoken";
import { UserModel } from "../models/user.js"

export const protectedResources = (req, res, next) => {

    //authorization -> Bearer token

    const {authorization} = req.headers

    if(!authorization){
        return res.status(401).json({error: "Unauthorized"})
    }

    const token = authorization.replace("Bearer ","")
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, payload)=>{
        if(error){
            return res.status(401).json({error: "Unauthorized"})
        }

        const { id } = payload;

        UserModel.findById(id)
        .then(dbUser=>{
            const user = dbUser
            if(user?.password) {
                user.password = undefined
            }
            req.dbUser = user
            // forward the request to the next middleware or next route
            next();
        })
        .catch(err=>console.log(err))        
    })
}