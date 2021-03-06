const mongoose = require("mongoose")
const { ObjectId } = mongoose.Schema

let articleSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    preview: {
        type: String,
    },
    content: {
        type: String,
    },
    video_URL: {
        type: String,
        trim: true,
    },
    article_image: {
        type: String,
        trim: true,
    },
    author: {
        type: ObjectId,
        ref: 'User'
    },
    code: {
        type: String,
    },
    tag_one: {
        type: String,
        trim: true,
    },
    tag_two: {
        type: String,
        trim: true,
    },
    tag_three: {
        type: String,
        trim: true,
    },

},
    { timestamps: true }
)


module.exports = mongoose.model("Article", articleSchema)