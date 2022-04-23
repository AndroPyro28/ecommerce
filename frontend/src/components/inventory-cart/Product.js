import React, { useEffect, useState } from 'react'
import { Image } from 'cloudinary-react';
import axios from 'axios';
import './inventorycart.css';
import Cookie from 'js-cookie';

import inventoryCartHooks from './inventoryCartHooks';

function Product({ item, updateProducts, setToggleUpdateBtn, setApiCall, apiCall}) {
    const [quantity, setQuanity] = useState(parseInt(item.productQuantity, Number));
    const [quantityFromSeller, setQuanityFromSeller] = useState(0);

    const {submitUpdatedProduct, togglebtn} = inventoryCartHooks({item, setToggleUpdateBtn, setApiCall, apiCall, quantity});

    useEffect(() => {
        submitUpdatedProduct();
    },[updateProducts])

    useEffect(async () => {
        const userToken = Cookie.get("userToken");
        const {productId, userId} = item;
        const response = await axios.post("https://fullstack-backend-ecommerce.herokuapp.com/api/checkAvailability", {userToken ,productId, userId}, {
            withCredentials: true
        })
        setQuanityFromSeller(response.data.productStock);
    },[])

    return (
        <div className="inventory_item_product">
            <div className="inventory__left" >

                <Image
                    cloudName="iamprogrammer"
                    publicId={item.productFile}
                    className="inventory_item_img"
                />
                <span>
                    <strong className="strong">
                        {item.productName}
                    </strong>
                    <br></br><br></br>
                    <label className="label">
                        Price: ${item.productPrice}
                    </label>
                </span>
            </div>

            <div className="inventory__right">
                <span>
                    {
                        quantity >= 1 ? <button className="btn-minus"
                        onClick={() => {setQuanity(prev => prev - 1)
                            togglebtn();
                        }
                        }
                    >
                        -
                    </button>
                    :
                    <button className="btn-minus disabled" >-</button>
                    }
                    <label>
                        {quantity}
                    </label>

                    {
                        quantity < quantityFromSeller ? <button className="btn-add"
                        onClick={ () => {
                              setQuanity(prev => prev + 1);
                               togglebtn();
                            }
                        }>
                        +
                       </button>
                       :
                       <button className="btn-add disabled">+</button>
                    }
                    
                    <label>
                        ${item.productPrice * quantity}
                    </label>
                </span>
            </div>
        </div>
    )
}

export default Product
