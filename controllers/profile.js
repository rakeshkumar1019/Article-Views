const User = require("../models/user")

exports.profileForm = (req, res) => {
    if (req.cookies.islogdinSuccess) {
        let id = req.params.id
        User.findById(id).exec((err, profile) => {
            if (err || !profile) {
                return res.status(400).json({
                    error: "No profile was found"
                })
            }
            profile.salt = undefined
            profile.encry_password = undefined
            res.render("profile", { profile: profile })
        })
    } else {
        res.redirect("/api/login")
    }
}

exports.updateProfile = (req, res) => {
    if (req.cookies.islogdinSuccess) {
        let id = req.cookies.id
        User.findOneAndUpdate({ _id: id }, {
            $set: {
                image: req.file.filename,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                gender: req.body.gender,
                phone: req.body.phone,
                userinfo: req.body.userinfo,
                skills: req.body.skills,
                github: req.body.github,
                resuma: req.body.resuma,
                linkdin: req.body.linkdin,
            }
        }).exec((err, profile) => {
            if (err) {
                return res.status(400).json({
                    error: "No user was found in DB and not updated"
                })
            }
            res.redirect("/api/dashboard")
        })
    } else {
        res.redirect("/api/login")
    }
}