import jwt from "jsonwebtoken";
import { createTransport } from "nodemailer";
import { customAlphabet } from 'nanoid'

// Create JWT Token

const createJWT = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 24 * 60 * 60
    })
}

const serviceIdCodeGenerator = (serviceId) =>{
    return `HIGHRISE-${serviceId}`;
}

const docsRefGenerator = () =>{
    const ref = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)()

    return `ref-${ref}`;
}

export { createJWT, serviceIdCodeGenerator, docsRefGenerator }