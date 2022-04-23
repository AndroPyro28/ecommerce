const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const schema = mongoose.Schema;

const userSchema = new schema({
    email: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String, 
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address : {
        type: String,
        required: false
    },
    profileUrl: {
        type:String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    transactionHistory: {
        type: [],
        required: false
    },
    sellingItems: {
        type: [],
        required: false,
    },
    cart: {
        type: [],
        required: false,
    },
    verified: {
        type: Boolean,
        required: true
    }
});

userSchema.pre("save", async function(next) {
    this.password = await bcrypt.hash(this.password, 6);
    next();
});

// userSchema.pre('updateOne', async function (next) {
//     this.password = await bcrypt.hash(this.password, 6);
//     next()
// })

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});

    if(!user) {
        throw Error("Invalid Credentials");
    }

    const isAuth = await bcrypt.compare(password, user.password);

    if (!isAuth) {
        throw Error("Invalid Credentials");
    }
    else {
        return user;
    }
}

module.exports = mongoose.model("users", userSchema);
