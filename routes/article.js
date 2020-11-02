const express = require("express")
var multer = require('multer');
const path = require("path")

const router = express.Router()
const { deleteArticleForm, showArticleAdmin, createArticle, articleSave, showArticle, showOneArticle, editArticleForm, updateArticle } = require("../controllers/article")


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


router.get("/dashboard/article/new", createArticle)
router.post("/dashboard/article/save", upload.single('article_image'), articleSave)
router.get("/dashboard/article/:article_id", showOneArticle)
router.get("/dashboard/article/show/all", showArticle)
router.get("/dashboard/article/show/all/admin", showArticleAdmin)
router.get("/dashboard/article/edit/:id", editArticleForm)
router.get("/dashboard/article/delete/:id", deleteArticleForm)
router.post("/dashboard/article/update", upload.single('article_image'), updateArticle)
module.exports = router
