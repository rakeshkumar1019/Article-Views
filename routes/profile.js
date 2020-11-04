const { check, validationResult } = require('express-validator')
const path = require("path")
var multer = require('multer');
const express = require("express")
const { profileForm, updateProfile } = require("../controllers/profile")
const router = express.Router()

var storage1 = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, 'uploads/');
    },
    filename: function (req, file, callback) {
        callback(null, '/' + Date.now() + file.originalname);
    }
});

var upload = multer({
    storage: storage1,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits: {
        // fileSize: 1024 * 1024
    }
});


router.get('/dashboard/profile/:id', profileForm)
router.post("/dashboard/profile/update", upload.single('iamge'), updateProfile)

module.exports = router