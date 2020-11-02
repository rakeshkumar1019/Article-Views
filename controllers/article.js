const User = require("../models/user")
const Article = require("../models/article")

exports.createArticle = (req, res) => {
    if (req.cookies.islogdinSuccess) {
        res.render("article", { id: req.cookies.id })
    } else {
        res.redirect("/api/login")
    }
}

exports.articleSave = (req, res) => {
    if (req.cookies.islogdinSuccess) {
        let articleBody = {
            ...req.body,
            article_image: req.file.filename,
        }
        // console.log(articleBody)
        const article = new Article(articleBody)
        article.save((err, article) => {
            if (err) {
                return res.status(400).json({
                    err: "NOT able to save article in DB"
                })
            }
            res.redirect("/api/dashboard/article/" + article._id)
        })
    } else {
        res.redirect("/api/login")
    }
}

exports.showOneArticle = (req, res) => {
    let article_id = req.params.article_id
    Article.findById(article_id).exec((err, article) => {
        if (err || !article) {
            return res.status(400).json({
                error: "No article was found"
            })
        }
        let id = article.author
        User.findById(id).exec((err, profile) => {
            if (err || !profile) {
                return res.status(400).json({
                    error: "No profile was found"
                })
            }
            res.render("article_one", { article: article, profile: profile })
        })
    })


}




exports.showArticle = (req, res) => {
    Article.find({}).exec((err, article) => {
        if (err) {
            res.status(400).json({
                err: "NOT able to find any articles"
            })
        }
        // console.log(req.cookies)
        res.render("article_all", { article: article })
    })
}
exports.showArticleAdmin = (req, res) => {
    if (req.cookies.islogdinSuccess) {
        Article.find({}).exec((err, article) => {
            if (err) {
                res.status(400).json({
                    err: "NOT able to find any articles"
                })
            }
            // console.log(req.cookies)
            res.render("article_all_admin", { article: article })
        })
    } else {
        res.redirect("/api/login")
    }
}

exports.editArticleForm = (req, res) => {
    if (req.cookies.islogdinSuccess) {
        // console.log(req.params)
        let id = req.params.id

        Article.findById(id, function (err, article) {
            if (err || !article) {
                res.status(400).json({
                    err: "article is NOt avialable"
                })
            }
            res.render('articleUpdate', { article: article })

        })
    } else {
        res.redirect("/api/login")
    }
}

exports.updateArticle = (req, res) => {
    if (req.cookies.islogdinSuccess) {
        const updatearticle = req.body
        updatearticle.article_image = req.file.filename
        const {
            _id,
            title,
            preview,
            content,
            code,
            article_image,
            video_URL,
            author,
            tag_one,
            tag_two,
            tag_three
        } = updatearticle
        Article.findByIdAndUpdate(_id, {
            title: title,
            preview: preview,
            content: content,
            code: code,
            article_image: article_image,
            video_URL: video_URL,
            author: author,
            tag_one: tag_one,
            tag_two: tag_two,
            tag_three: tag_three,
        }, (err, article) => {
            if (err) {
                res.status(400).json({
                    err: "artcile  is NOt edited"
                })
            }
            res.redirect("/api/dashboard/article/" + article._id)
        })
    } else {
        res.redirect("/api/login")
    }

}

exports.deleteArticleForm = (req, res) => {
    if (req.cookies.islogdinSuccess) {
        const id = req.params.id
        Article.deleteOne({ _id: id }, (err, quiz) => {
            if (err) {
                res.status(400).json({
                    err: "Article question  cannot deleted"
                })
            }
            res.redirect("/api/dashboard/article/show/all/admin")
        })
    } else {
        res.redirect("/api/login")
    }

}

