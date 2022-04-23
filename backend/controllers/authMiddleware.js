const jwt = require("jsonwebtoken");
const userSchema = require("../models/user");

module.exports.verify = async (req, res, next) => {
    const { userToken } = req.body;
    try {
        const userCookie = jwt.verify(userToken, process.env.privateKey);
        res.locals.user = await userSchema.findById(userCookie._id);
        next();
    } catch (error) {
        return res.status(200).json({
            msg: "session expired",
            success: false
        })
    }
}