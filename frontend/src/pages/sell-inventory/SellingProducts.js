import React, { useEffect } from 'react'
import { Image } from 'cloudinary-react';
import './sellingProducts.css';
import userHooks from './userHooks';
function SellingProducts({ item, refresh, setRefresh, setToggleUpdateScreen, setProductToUpdate}) {
    const {productId, productFile} = item;
    const {deleteProduct, toggleUpdateScreen} = userHooks({productId, productFile, setRefresh, refresh, setToggleUpdateScreen, setProductToUpdate});

    return (
        <div className="inventory__item__product">
            <div className="inventory__item">
                <Image
                    className="item__image"
                    publicId={item.productFile}
                    cloudName="iamprogrammer"
                />
                <i className="fas fa-trash-alt icon__command delete__icon" onClick={deleteProduct}></i>
                <i className="fas fa-pen-square icon__command edit__icon" onClick={toggleUpdateScreen}></i>
                <div className="product__info">
                <p className="item__title"><strong>Product ID: </strong> <span>{item.productId}</span></p>
                <p className="item__title"><strong>Product Name: </strong> <span>{item.productName}</span></p>
                <p className="item__title"><strong>Product Description: </strong> <span>{item.productDescription}</span></p>
                <p className="item__title"><strong>Product Stock: </strong> <span>{item.productStock} (current-stock)</span></p>
                <p className="item__title"><strong>Product Price: </strong> <span>${item.productPrice}</span></p>
                </div>
               
            </div>
        </div>
    )
}

export default SellingProducts
