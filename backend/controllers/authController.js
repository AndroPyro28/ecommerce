const userSchema = require("../models/user");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const cloudinary = require('../config/cloudinary');
const objectId = require('mongodb').ObjectId;

module.exports.signup = async (req, res) => {
    const { firstname, lastname, phoneNumber, email, password } = req.body.values;

    let user = await userSchema.findOne({ email });

    if (user) {
        return res.status(200).json({
            success: false,
            msg: "this email is already in use"
        })
    }

    user = await userSchema.findOne({ phoneNumber });

    if (user) {
        return res.status(200).json({
            success: false,
            msg: "this phone-number is already in use"
        })
    }

    const verified = false;
    const profileUrl = "user_profileImage/userDefaultProfile.jpg";
    await userSchema.create({
        firstname,
        lastname,
        phoneNumber,
        email,
        profileUrl,
        password,
        verified
    })
        .then(() => {
            return res.status(200).json({
                success: true,
                msg: "successfully registered!"
            })
        })
        .catch((err) => {

            return res.status(200).json({
                success: false,
                msg: err
            })
        })
}

const assignToken = (_id) => {
    return jwt.sign({ _id }, process.env.privateKey, {
        expiresIn: maxAge,
    });
}

const maxAge = 24 * 60 * 60;

module.exports.login = async (req, res) => {
    const { email, password } = req.body.values;

    try {
        const user = await userSchema.login(email, password);
        const token = assignToken(user._id);

        return res.status(200).json({
            success: true,
            userToken: token,
            msg: "login successfully!"
        });

    } catch (error) {

        const errorMsg = error.toString();

        return res.status(200).json({
            success: false,
            msg: errorMsg
        })
    }
}

module.exports.isAuth = async (req, res) => {
    const userCookie = req.body.userToken;

    try {
        const userToken = jwt.verify(userCookie, process.env.privateKey);
        const currentuser = await userSchema.findById(userToken._id);
        return res.status(200).json({
            currentuser,
            isAuth: true
        })
    }
    catch (error) {
        return res.status(200).json({
            currentuser: {},
            isAuth: false
        })
    }

}

{// module.exports.profileUpload = async (req, res) => { // failed experiment 2

    //     if (req.files === null) {
    //         return res.status(200).json({
    //             msg: "no file uploaded",
    //             success: false
    //         })
    //     }
    //     const { file } = req.files;

    //     if (!file.mimetype.startsWith("image")) {
    //         return res.status(200).json({
    //             msg: "Incorrect files...",
    //             success: false
    //         })
    //     }

    //     const currentUser = res.locals.user;
    //     const response = await cloudinary.uploader.upload(urlData, {
    //         public_id: `profileURL_${currentUser._id}`
    //     });


    // }
}

module.exports.retrieveProfile = async (req, res) => {
    const { resources } = await cloudinary.search.
        expression('folder:user_profileImage')
        .execute();

    const publicIds = resources.map(file => { console.log(file.public_id) })
}

module.exports.profileUpload = async (req, res) => { // success experiment 1
    const { urlData, name, type } = req.body;

    if (!type.startsWith("image")) {
        return res.status(200).json({
            success: false,
            msg: "Incorrect type of files"
        })
    }

    if (!urlData) {
        return res.status(200).json({
            success: false,
            msg: "please choose your desired photo"
        })
    }
    try {
        const cloudinaryFolder = 'user_profileImage';
        const currentUser = res.locals.user;

        const response = await cloudinary.uploader.upload(urlData, { // uploading new profile image
            upload_preset: cloudinaryFolder,
        });
        const profileUrl = response.public_id; // getting the url id of new profile image

        if (currentUser.profileUrl != "user_profileImage/userDefaultProfile.jpg") { // checking if the past profile picture of this user is the default profile Image
            // if not then delete it, else we cannot delete the default profile Image
            const response2 = await cloudinary.uploader.destroy(currentUser.profileUrl);
        }

        const success = await userSchema.updateOne({ _id: currentUser._id }, { //updating the profile url image in the database
            $set: {
                profileUrl: profileUrl
            }
        })

        return res.status(200).json({
            success: true,
            msg: "The photo has been uploaded"
        })

    } catch (error) {
        console.error(error);
    }
}

module.exports.sellProduct = async (req, res) => {
    try {
        let { product } = req.body;
        const currentUser = res.locals.user;
        const cloudinaryFolder = 'user_productUrl';
        const productId = new objectId();
        product.productId = productId;
        product.userId = currentUser._id;

        const response = await cloudinary.uploader.upload(product.productFile, { upload_preset: cloudinaryFolder })
        const productUrl = response.public_id;
        product.productFile = productUrl;

        const resDb = await userSchema.updateOne({ _id: currentUser._id }, {
            $push: {
                sellingItems: product
            }
        })

        return res.status(200).json({
            success: true,
            msg: "Your Product has been uploaded to the market"
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            msg: "Something went wrong..."
        })
    }
}

module.exports.retrieveProducts = async (req, res) => {

    const { category } = req.body;

    const users = await userSchema.find();
    try {

        if (category) {
            let products = []
            users.map(user => {
                user.sellingItems.map(item => {
                    if (item.productCategory === category) {
                        products.push(item)
                    }
                });

            })

            return res.status(200).json({
                success: true,
                products
            })
        }
        else {
            let products = []
            users.map(user => {
                user.sellingItems.map(item => products.push(item))
            })

            return res.status(200).json({
                success: true,
                products
            })
        }
    } catch (error) {
        console.log(error);
    }
}

{// module.exports.profileUpload = async (req, res) => { //default uploading in local folder 

    //     if(req.files === null) {
    //         return res.status(200).json({
    //             msg: "no file uploaded",
    //             success: false
    //         })
    //     }

    //     const {file} = req.files;

    //     console.log(req.files.buffer)
    //     //const encoded = req.file.buffer.toString('base64')

    //     if (!file.mimetype.startsWith("image")) {
    //         return res.status(200).json({
    //             msg: "Incorrect files...", 
    //             success:false })
    //     }

    //     const currentUser = res.locals.user;

    //     const renamedFile = `${currentUser._id}_${file.name}`

    //     if (currentUser.profileUrl === renamedFile) {
    //         return res.status(200).json({ msg: "uploading file...", success:true })
    //     }
    //     else {
    //         file.mv(`../client/public/image_profile/${renamedFile}`);

    //         await userSchema.updateOne({_id: currentUser._id}, {
    //             $set: {
    //                 profileUrl: renamedFile
    //             }
    //         })
    //         .then(() => {
    //             fs.unlink(`../client/public/image_profile/${currentUser.profileUrl}`, (err) => {
    //                 if (err) return res.json({ msg: "something went wrong...", success:false })
    //             })
    //             return res.status(200).json({ msg: "uploading file...", success:true})
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    //     }
    // }
}