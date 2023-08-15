import express from 'express'
const app = express()
import cors from 'cors'
import logger from "morgan"
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import auth from "./routes/auth.js"
import documents from "./routes/documents.js"
import payment from "./routes/payment.js"
import notification from "./routes/notification.js"

dotenv.config()
app.set("trust proxy", 1);
app.use(cookieParser())
const corsOption = {
    origin: ['http://localhost:5173', 'https://highriseweb.netlify.app', "https://high-risenews.ng"],
    // origin: 'https://highriseweb.netlify.app',
    credentials:true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOption)) 
app.use(logger("dev"))
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGODB_URI)
.then(()=> {
    app.listen(PORT, ()=> console.log(`Server is running live: http:localhost:${PORT}`))
    console.log('connected')
})
.catch(error => console.log(error))

app.use(express.json())
app.use(express.urlencoded({extended: true}));

// Auth Route

app.use('/auth', auth)

// Documents Route

app.use('/documents', documents)

// Payment Verification

app.use('/payment', payment)

// Notification

app.use(notification)


app.get('/', (req, res) => {
    res.send('Welcome to server!')
})
