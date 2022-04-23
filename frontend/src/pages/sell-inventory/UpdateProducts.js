import React, { useState } from 'react'
import './sellinv.css'
import {Image} from 'cloudinary-react';
import SellItemHooks from './SellItemHooks'
import UpdateHooks from './UpdateHooks'

function UpdateProducts({setToggleUpdateScreen, productToUpdate, refresh, setRefresh}) {
    
    const {handleOnChange, handleSubmit, updateProduct, setFile} = UpdateHooks({setToggleUpdateScreen, productToUpdate, refresh, setRefresh});
    return (
        <div className="sell__item__backdrop">
            <form className="form__sell__inventory" onSubmit={handleSubmit} autoComplete="off">
                <i className="exit__button fas fa-times-circle" onClick={() => setToggleUpdateScreen(false)}></i>

                <h1>Update product</h1>

                <div className="sell__item__input">
                    <span>Product category:&nbsp;</span>
                    <select
                        name="productCategory"
                        onChange={handleOnChange}
                        value={updateProduct.productCategory}
                        required
                        >
                        <option value="">*</option>
                        <option value="Clothes">Clothes</option>
                        <option value="Gadgets">Gadgets</option>
                        <option value="Decorations">Decorations</option>
                        <option value="Houseware">Houseware</option>
                        <option value="Vehicles">Vehicles</option>
                        <option value="Auto Parts">Auto Parts</option>
                        <option value="Misc">Misc</option>
                        <option value="Jewelries">Jewelries</option>
                        <option value="Others">Others</option>
                        </select>
                </div>

                <div className="sell__item__input">
                    <input
                        type="text"
                        name="productName"
                        onChange={handleOnChange}
                        value={updateProduct.productName}
                        placeholder="Name of the product"
                        required
                    />
                </div>

                <div className="sell__item__input">
                    <input
                        type="number"
                        min="0"
                        name="productStock"
                        placeholder="Stock of the product (qty-stock)"
                        onChange={handleOnChange}
                        value={updateProduct.productStock}
                        required
                    />
                </div>

                <div className="sell__item__input">
                    <input
                        min="1"
                        type="number"
                        name="productPrice"
                        placeholder="Price of the product ($-currency)"
                        value={updateProduct.productPrice}
                        required
                        onChange={handleOnChange}
                    />
                </div>


                <div className="sell__item__input">
                    <textarea
                        type="text"
                        name="productDescription"
                        placeholder="Description of the product"
                        value={updateProduct.productDescription}
                        onChange={handleOnChange}
                        required
                    />
                </div>

                <div className="file__input">
                    <p className="">*Updating image is optional*</p>
                    <input
                        type="file"
                        className="sell__input__file"
                        placeholder="Picture of the product"
                        name="updateProduct.productFile"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>

                <div className="sell__item__input">
                    <button id="btn-submit" type="submit">Update Product</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateProducts
