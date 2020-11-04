const express = require("express")
const router = express.Router()

const { getUserById, getUser, updateUser, userPurchaseList } = require("../controllers/user")
const { isSignedIn } = require("../controllers/auth")

router.param("userId", getUserById)

router.get("/user/:userId", isSignedIn, getUser)

router.put("/user/:userId", isSignedIn, updateUser)


module.exports = router


