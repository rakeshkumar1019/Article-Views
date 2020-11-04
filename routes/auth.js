const { check, validationResult } = require('express-validator')
const express = require("express")
const router = express.Router()
const { isSignedIn, signout, signup, signin, registrationForm, loginForm } = require("../controllers/auth")

router.get("/registration", registrationForm)
router.get("/login", loginForm)

router.post("/signup", [
    check("firstname", "firstname should be at least 3 char").isLength({ min: 3 }),
    check("email", "email should be valid").isEmail(),
    check("password", "password should be at least 3 char").isLength({ min: 1 }),
    check("phone", "phone no should be 10 digit").isLength({ max: 10 }),

], signup)

router.post("/signin", [
    check("email", "email is required").isEmail(),
    check("password", "password is required").isLength({ min: 3 }),
], signin)

// router.get("/testroute", isSignedIn, (req, res) => {
//     res.json({
//         message: "succesfull"
//     })
// })

router.get("/signout", signout)

module.exports = router