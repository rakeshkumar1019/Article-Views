require('dotenv').config()
const mongoose = require("mongoose")
const express = require("express")

const app = express()
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const ejs = require("ejs")

//my routes
const authRoutes = require("./routes/auth")
const dashboardRoutes = require("./routes/dashboard")
const profileRoutes = require("./routes/profile")
const articleRoutes = require("./routes/article")


//DBCONNECTION
mongoose.connect(process.env.DATABASE,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    }).then(() => {
        console.log("DB CONNECTED")
    })
// Middlware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(express.static('uploads'))
app.set('view engine', 'ejs');

//my routes
app.use("/api", authRoutes)
app.use("/api", dashboardRoutes)
app.use("/api", profileRoutes)
app.use("/api", articleRoutes)
//PORT
const port = process.env.PORT || 8000
app.listen(port, () => {
    console.log(`app is running at ${port}`)
})