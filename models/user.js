const mongoose = require("mongoose")
const crypto = require("crypto")
const uuidv1 = require('uuid/v1')
var userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true,
        default: "Part time contributor at Article Views "
    },
    encry_password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
        maxlength: 10,
    },
    gender: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "https://image.shutterstock.com/image-vector/contributor-vector-icon-design-transparent-260nw-406989082.jpg"
    },
    skills: {
        type: String,
        default: "Update Your Skills",
    },
    resuma: {
        type: String,
        default: "https://zety.com/resume-templates?gclid=CjwKCAiAv4n9BRA9EiwA30WND2Z9ttnpCOdp7Vqexjz2ZcNEaCiLj0X3ZSEkhcSDwcFKJop-PZhXbxoC4e8QAvD_BwE",
    },
    linkdin: {
        type: String,
        default: "https://www.linkedin.com/",
    },
    github: {
        type: String,
        default: "https://github.com/"
    },
    salt: String,

},
    { timestamps: true }
)

userSchema.virtual("password")
    .set(function (password) {
        this._password = password
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
    })
    .get(function () {
        return this._password
    })

userSchema.methods = {
    autheticate: function (plainpassword) {
        return this.securePassword(plainpassword) === this.encry_password
    },
    securePassword: function (plainpassword) {
        if (!plainpassword) return "";
        try {
            return crypto.createHmac('sha256', this.salt)
                .update(plainpassword)
                .digest('hex')
        } catch (err) {
            return "";
        }
    }
}
module.exports = mongoose.model("User", userSchema)