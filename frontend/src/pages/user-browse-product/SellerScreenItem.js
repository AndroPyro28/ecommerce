import React, { useEffect, useState } from 'react'
import './item.css'
import axios from 'axios'
import Cookies from 'js-cookie';
import { Image } from 'cloudinary-react';

function SellerScreenItem({ setViewMyItem, itemId }) { // dito yung maviview nya mismo yung product nya na binebenta
        const [item, setItem] = useState({});
        useEffect(async () => {
            //fetching a product lang
            const userToken = Cookies.get("userToken");
            const response = await axios.post("https://fullstack-backend-ecommerce.herokuapp.com/api/sellingProduct", { itemId, userToken }, {
                withCredentials: true
            })
            setItem(response.data.product)
        }, [])

        return (
            <div className="item__backdrop">
                <div className="browse__item__container">
                    <i className="fas fa-times closeBtn" onClick={() => setViewMyItem(false)}></i>
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
                            <span>You</span>
                        </div>
                        <div>
                            <span><strong>Price:</strong></span>
                            <span>${item?.productPrice}</span>
                        </div>

                        <div>
                            <span><strong>Available Stock:</strong></span>
                            <span>{item?.productStock}</span>
                        </div>

                        <a href="/user/inventory">View item in inventory</a>
                    </div>

                </div>
            </div>
        )
    }

export default SellerScreenItem
