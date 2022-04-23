import React, { useEffect, useState } from 'react'
import './item.css'
import { Image } from 'cloudinary-react';
import axios from 'axios'
import Cookies from 'js-cookie';
import buyItemHooks from './buyItemHooks';

function BuyerScreenItem({ setToggleProductScreen, itemId, setPopupError }) { // dito ng buyer mismo yung product na binebenta

    const [item, setItem] = useState();
    const [options, setOptions] = useState([]);
    const [stockInCart, setStockInCart] = useState(0);

    const [qty, setQty] = useState(1);

    const { addToCart } = buyItemHooks({ qty, item, setPopupError});

    useEffect(async () => {
        try {
            const userToken = Cookies.get("userToken");
            const response = await axios.post("https://fullstack-backend-ecommerce.herokuapp.com/api/displayProduct", { userToken, itemId }, {
                withCredentials: true,
            });
            const { product, success, currentUser } = response.data;
            const { productStock } = product;
            setItem(product);

            currentUser.cart.map((item) => {
                if (item.productId == itemId) {
                    setStockInCart(item.productQuantity);
                }
            })
        } catch (error) {

        }
    }, [itemId])

    useEffect(() => {
        if (stockInCart === 0) {
            setOptions([]);
            for (let i = 1; i <= item?.productStock; i++) {
                setOptions(prev => [...prev, <option value={i} key={i}>{i}</option>])
            }
        }
        else {
            setOptions([]);
            for (let i = 1; i <= item?.productStock - stockInCart; i++) {
                setOptions(prev => [...prev, <option value={i} key={i}>{i}</option>])
            }
        }

    }, [item, stockInCart])

    return (
        <div className="item__backdrop">
            <div className="browse__item__container">
                <i className="fas fa-times closeBtn" onClick={() => setToggleProductScreen(false)}></i>
                <div className="browse__item__left">

                    <Image
                        cloudName="iamprogrammer"
                        publicId={item?.productFile}
                        className="browse__item__img"
                    />
                    <p>{item?.productName}</p>
                    <p><strong>Price:</strong> ${item?.productPrice}</p>
                    <p> <strong>Description:</strong> {item?.productDescription}</p>
                </div>

                <div className="browse__item__rigth">
                    <div>
                        <span><strong>Seller name:</strong> &nbsp;</span>
                        <span>{item?.productSeller}</span>
                    </div>
                    <div>
                        <span><strong>Price:</strong></span>
                        <span>${item?.productPrice}</span>
                    </div>

                    <div>
                        <span><strong>Available Stock:</strong></span>
                        <span>{item?.productStock}</span>
                    </div>

                    <div>
                        <span><strong>Quantity:</strong></span>
                        <select onChange={(e) => setQty(e.target.value)}>
                            {options.length !== 0? options :<option>Out of stock</option>}
                        </select>
                    </div>

                    <button onClick={addToCart} >Add to cart</button>
                </div>

            </div>
        </div>
    )
}

export default BuyerScreenItem
