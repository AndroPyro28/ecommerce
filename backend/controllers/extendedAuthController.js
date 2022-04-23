const userSchema = require("../models/user");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const cloudinary = require('../config/cloudinary');
const objectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');

module.exports.inventory = async (req, res) => {
    const currentUser = res.locals.user;
    const sellingProducts = currentUser.sellingItems;
    return res.status(200).json({
        sellingProducts,
    })
}

module.exports.deleteProduct = async (req, res) => {
    const currentUser = res.locals.user;
    const { productId, productFile } = req.body;
    try {
        const dbResponse = await userSchema.findOneAndUpdate({ _id: currentUser._id }, {
            $pull: {
                sellingItems: {
                    productId: objectId(productId)
                }
            }
        })

        const response = await cloudinary.uploader.destroy(productFile);

        return res.status(200).json({
            success: true,
            msg: "Item has been deleted"
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: true,
            msg: "Item has been deleted"
        })
    }
}

module.exports.getProduct = async (req, res) => {

    try {
        const currentUser = res.locals.user;
        const { productId } = req.body;
        const product = currentUser.sellingItems.filter(item => item.productId.toString() === productId);
        return res.status(200).json(product[0]);
    } catch (error) {
        console.log(error);
    }
}

module.exports.updateProduct = async (req, res) => {
    const { updateProduct, file } = req.body;
    const { productName, productDescription, productCategory, productStock, productPrice, productFile } = updateProduct;
    const currentUser = res.locals.user;
    try {
        let newFile = productFile;
        if (file) {
            cloudinary.uploader.destroy(productFile)

            const uploadedFile = await cloudinary.uploader.upload(file, {
                upload_preset: "user_productUrl",
            })
            newFile = uploadedFile.public_id;
        }

        const dbResponse = await userSchema.updateOne({
            _id: currentUser._id,
            "sellingItems.productId": objectId(updateProduct.productId)
        }, {
            $set: {
                "sellingItems.$.productName": productName,
                "sellingItems.$.productDescription": productDescription,
                "sellingItems.$.productCategory": productCategory,
                "sellingItems.$.productStock": productStock,
                "sellingItems.$.productPrice": productPrice,
                "sellingItems.$.productFile": newFile,
            }
        });
        return res.status(200).json({
            success: true,
            msg: "Product has been update successfuly!"
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.addToCart = async (req, res) => {

    const currentUser = res.locals.user;
    let { item } = req.body;

    try {
        const isAlreadyOnCart = currentUser.cart.some(product => product.productId == item.productId);

        const user = await userSchema.findById(item.userId);

        const productItemFromSeller = user.sellingItems.filter(product => product.productId == item.productId)

        currentUser.cart.filter(product => {
            if (product.productId == productItemFromSeller[0].productId &&
                productItemFromSeller[0].productStock < product.productQuantity + 1) {
                throw Error("out of stock")
            }
        })

        if (!isAlreadyOnCart) {

            item.productQuantity = 1;
            const response = await userSchema.updateOne({ _id: currentUser._id }, {
                $push: {
                    cart: item
                }
            })
            return res.status(200).json({
                success: true,
                msg: "The product has been added 1 quantity to your cart"
            })
        }
        else {
            const response = await userSchema.updateOne({ _id: currentUser._id, "cart.productId": item.productId }, {
                $inc: {
                    "cart.$.productQuantity": 1
                }
            })
            return res.status(200).json({
                success: true,
                msg: "The product has been added 1 quantity to your cart"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Something went wrong..."
        })
    }
}

module.exports.updateQuantity = async (req, res) => {

    const currentUser = res.locals.user;
    try {
        const { item, quantity } = req.body;

        if (quantity <= 0) {
            const response = await userSchema.updateOne({ _id: currentUser._id }, {
                $pull: {
                    cart: {
                        productId: item.productId
                    }
                }
            })
        } else {
            const response = await userSchema.updateOne({ _id: currentUser._id, "cart.productId": item.productId }, {
                $set: {
                    "cart.$.productQuantity": quantity
                }
            })
        }

        return res.status(200).json({
            success: true,
            msg: "product has been updated"
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            msg: "Something went wrong..."
        })
    }
}

module.exports.payment = async (req, res) => {
    try {
        const currentUser = res.locals.user;
        let { item, buyingItem } = req.body;

        if (buyingItem) {

            // SELLER QUERY
            delete item.productStock;
            item.TransactionType = "You Sold / SELL";
            item.productPrice = item.productPrice * item.productQuantity;
            item.customerName = `${currentUser.firstname} ${currentUser.lastname}`
            item.timeOfTransaction = moment().format('LLL');
            const quantityToDecrease = item.productQuantity * - 1;

            const stockDecrease = await userSchema.updateOne({
                _id: objectId(item.userId),
                "sellingItems.productId": objectId(item.productId)
            }, {
                $inc: {
                    "sellingItems.$.productStock": quantityToDecrease
                },
                $push: {
                    transactionHistory: item
                }
            })
            console.log(stockDecrease);

            // BUYER QUERY
            item.TransactionType = "You Bought / BUY";
            item.productPrice = item.productPrice * item.productQuantity;
            item.sellerId = item.userId;
            delete item.userId;
            delete item.customerName;

            const response = await userSchema.updateOne({ _id: currentUser._id }, {
                $pull: {
                    cart: {
                        productId: item.productId
                    }
                },
                $push: {
                    transactionHistory: item
                }
            })
            return res.status(200).json({
                success: true,
                msg: "Transaction successful"
            })
        }

        else {
            return res.status(200).json({
                success: false,
            })
        }
    } catch (error) {
        return res.status(200).json({
            success: false,
            msg: "Something went Wrong"
        })
    }
}

module.exports.checkAvailability = async (req, res) => {
    const { productId, userId } = req.body;
    try {
        const productSeller = await userSchema.findById(userId);
        const product = productSeller.sellingItems.filter(prod => productId == prod.productId);
        return res.status(200).json({
            productStock: product[0].productStock
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports.updateName = async (req, res) => {

    try {
        const { firstname, lastname } = req.body;
        const currentUser = res.locals.user;

        const response = await userSchema.updateOne({ _id: currentUser._id }, {
            $set: {
                firstname,
                lastname
            }
        });
        return res.status(200).json({
            success: true,
            msg: "Your information has been updated"
        })
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            success: false,
            msg: "Something went wrong..."
        })
    }
}

module.exports.updatePassword = async (req, res) => {

    try {
        const currentUser = res.locals.user;
        let { newPassword, currentPassword } = req.body
        const isMatch = await bcrypt.compare(currentPassword, currentUser.password);

        if (!isMatch) {
            return res.status(200).json({
                success: false,
                msg: "Current password is not match"
            })
        }
        newPassword = await bcrypt.hash(newPassword, 6);
        const response = await userSchema.updateOne({ _id: currentUser._id }, {
            $set: {
                password: newPassword
            }
        })
        return res.status(200).json({
            success: true,
            msg: "Password has been updated"
        })
    } catch (error) {
        console.log(error);
        return res.status(200).json({
            success: false,
            msg: "Something went wrong..."
        })
    }
}

module.exports.displayProduct = async (req, res) => {
    try {
        const { itemId } = req.body;
        const currentUser = res.locals.user;
        const user = await userSchema.findOne({
            sellingItems:
            {
                $elemMatch: {
                    productId: objectId(itemId)
                }
            }
        });
        let productItem;

        user.sellingItems.map(product => {
            if (product.productId == itemId) {
                productItem = product;
                productItem.productSeller = `${user.firstname} ${user.lastname}`

            }
        })
        return res.status(200).json({
            product: productItem,
            currentUser,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(5005).json({
            product: {},
            success: false,
        })
    }
}

module.exports.addToCartWithScreen = async (req, res) => {

    const currentUser = res.locals.user;

    let { item, qty } = req.body;

    try {
        const isAlreadyOnCart = currentUser.cart.some(product => product.productId == item.productId);

        const user = await userSchema.findById(item.userId);

        const productItemFromSeller = user.sellingItems.filter(product => product.productId == item.productId);

        qty = parseInt(qty, Number);
        let quantityInCart;

        currentUser.cart.map(cartItem => {
            if (cartItem.productId == item.productId) {
                quantityInCart = cartItem.productQuantity;
            }
        })

        if (productItemFromSeller[0].productStock <= quantityInCart) {

            return res.status(200).json({
                success: false,
                msg: "the product is out of stock"
            });
        }

        if (!isAlreadyOnCart) {
            item.productQuantity = qty;
            const response = await userSchema.updateOne({ _id: currentUser._id }, {
                $push: {
                    cart: item
                }
            })
            return res.status(200).json({
                success: true,
                msg: "The product has been added the quantity in your cart"
            })
        }
        else {
            const response = await userSchema.updateOne({ _id: currentUser._id, "cart.productId": item.productId }, {
                $inc: {
                    "cart.$.productQuantity": qty
                }
            })
            return res.status(200).json({
                success: true,
                msg: "The product has been added the quantity in your cart"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: "Something went wrong..."
        })
    }
}

module.exports.sellingProduct = async (req, res) => {

    try {
        const currentUser = res.locals.user;
        const { itemId } = req.body;
        const product = currentUser.sellingItems.filter((product) => itemId == product.productId);
        return res.status(200).json({
            product: product[0],
            success: true
        })
    } catch (error) {
        console.log(error);
    }

}