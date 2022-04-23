import React, { useState } from 'react'
import './sellinv.css'
import SellItemHooks from './SellItemHooks'

function SellItem({ setToggleProductUpload, setRefresh, refresh,setPopup }) {

    const { product, setProduct, handleOnChange, handleSubmit } = SellItemHooks({setToggleProductUpload, setPopup,setRefresh, refresh});

    return (
        <div className="sell__item__backdrop">
            <form className="form__sell__inventory" onSubmit={handleSubmit} autoComplete="off">
                <i className="exit__button fas fa-times-circle" onClick={() => setToggleProductUpload(false)}></i>

                <h1>Sell Products</h1>

                <div className="sell__item__input">
                    <span>Product category:&nbsp;</span>
                    <select
                        name="productCategory"
                        onChange={handleOnChange}
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
                        required
                    />
                </div>

                <div className="sell__item__input">
                    <input
                        min="1"
                        type="number"
                        name="productPrice"
                        placeholder="Price of the product ($-currency)"
                        required
                        onChange={handleOnChange}
                    />
                </div>


                <div className="sell__item__input">
                    <textarea
                        type="text"
                        name="productDescription"
                        placeholder="Description of the product"
                        onChange={handleOnChange}
                        required
                    />
                </div>

                <div className="file__input">
                    <p className="">*image is required*</p>
                    <input
                        type="file"
                        className="sell__input__file"
                        placeholder="Picture of the product"
                        name="productFile"
                        onChange={(e) => setProduct({ ...product, [e.target.name]: e.target.files[0] })}
                        required
                    />
                </div>

                <div className="sell__item__input">
                    <button id="btn-submit" type="submit">Add Product</button>
                </div>
            </form>
        </div>
    )
}

export default SellItem
