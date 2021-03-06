const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const { Binary } = require("mongodb");

const userSchema = new Schema(
    {
        username: { type: String, required: [true, 'Please create a username.'], index: { unique: true } },
        name: { type: String, required: [true, 'Please provide your name.']},
        email: { type: String, required: [true, 'Please provide an email address.'], index: { unique: true } },
        emailOptIn: {type: Boolean},
        level: {type: Number},
        password: { type: String, required: [true, 'Please create a password.'], 
                                    minLength: [4, "Password too short."],
                                    maxLength: [14, "Password too long."] },
        saved: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resort"
            },
    },
    { timestamps: true }
);


userSchema.pre('save', async function (next) {
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    } catch (e) {
        throw Error('Password hash error in User.js');
    }
})

module.exports = mongoose.model("User", userSchema);