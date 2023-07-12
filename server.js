const express = require('express')
const app = express()
const cors = require('cors')
const logger = require("morgan")
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

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

app.use('/auth', require("./routes/auth"))

// Documents Route

app.use('/documents', require("./routes/documents"))

// Payment Verification

app.use('/payment', require("./routes/payment"))

// Notification

app.use(require("./routes/notification"))


app.get('/', (req, res) => {
    res.send('Welcome to server!')
})
