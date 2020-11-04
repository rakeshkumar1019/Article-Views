const User = require("../models/user")

exports.dashboard = (req, res) => {
    if (req.cookies.islogdinSuccess) {
        let id = req.cookies.id
        User.findById(id).exec((err, profile) => {
            if (err || !profile) {
                return res.status(400).json({
                    error: "No profile was found"
                })
            }
            profile.salt = undefined
            profile.encry_password = undefined
            res.render('dashboard', { profile: profile })
        })
    } else {
        res.redirect("/api/login")
    }

}