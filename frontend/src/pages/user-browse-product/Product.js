import React, { useState } from 'react'
import { Image } from 'cloudinary-react';
import './products.css'
import cartHooks from './cartHooks';
function Product({ item, setPopup, setPopupError, currentUser, setItemId, setToggleProductScreen, setViewMyItem}) {
    
    const { addToCart } = cartHooks({ item, currentUser, setPopup, setPopupError });
    return (
        <div className="products__screen">

            {
                currentUser._id != item.userId ?
                    <i onClick={addToCart} className="fas fa-cart-plus add__cart"></i>
                    :
                    <label className="owner__label">(Your product)</label>
            }

            <Image
                className="products__screen__img"
                cloudName="iamprogrammer"
                publicId={item.productFile}
            />
            <p className="products__screen__name"><span className="productField">{item.productName}</span> </p>

            <p className="products__screen__description">
                <span className="productField">product description:</span>
                {item.productDescription}
            </p>

            <p className="products__screen__qty"><span className="productField">Current stock:</span>
                {item.productStock}</p>

            <p className="products__screen__price"><span className="productField">Price:</span>
                ${item.productPrice}</p>


            {
                currentUser._id != item.userId ?
                    <button className="view-btn"onClick = {() => {
                        setToggleProductScreen(true);
                        setItemId(item.productId);
                    }}>View Item</button>
                    :
                    <button className="view-btn" onClick={() => {
                        setViewMyItem(true)
                        setItemId(item.productId);
                    }} >View your product</button>
            }
        </div>
    )
}

export default Product
