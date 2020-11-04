const User = require("../models/user")
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const expressJwt = require("express-jwt")
exports.registrationForm = (req, res) => {
    res.sendFile("registration.html", { root: './public' })
}
exports.loginForm = (req, res) => {
    res.sendFile("login.html", { root: './public' })
}

exports.signup = (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }
    const user = new User(req.body)
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "NOT able to save user in DB"
            })
        }
        res.redirect("/api/login");
    })
}

exports.signin = (req, res) => {
    const errors = validationResult(req)
    const { email, password } = req.body

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "USER email does not exits"
            })
        }

        if (!user.autheticate(password)) {
            return res.status(401).json({
                error: "Email and password do not match"
            })
        }


        //create token
        const token = jwt.sign({ _id: user._id }, process.env.SECRET)
        //put token in cookie
        res.cookie("token", token, { expire: new Date() + 999 })
        res.cookie("id", user._id)
        res.cookie("islogdinSuccess", true)

        //send response to front end
        const { _id, firstname, email, role } = user
        res.redirect("/api/dashboard");


    })

}

exports.signout = (req, res) => {
    res.clearCookie("token")
    res.clearCookie("id")
    res.clearCookie("islogdinSuccess")

    res.redirect("/api/login")
}

//protected routes
exports.isSignedIn = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})


