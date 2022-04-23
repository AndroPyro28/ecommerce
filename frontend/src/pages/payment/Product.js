import React, { useEffect, useState } from 'react'
import { Image } from 'cloudinary-react'
import paymentHooks from './paymentHooks'
import axios from 'axios';
import Cookies from 'js-cookie';
function Product({ item, submitPayment, setTotalPrice, totalPrice}) {
    const [buyingItem, setBuyingItem] = useState(false);
    const { payment } = paymentHooks({item, buyingItem})
    const [quantityFromSeller, setQuantityFromSeller] = useState(0);
    useEffect(() => {
        if(buyingItem) {
            setTotalPrice(prev => prev + item.productPrice * item.productQuantity);
        }
        else {
            setTotalPrice(prev => prev - item.productPrice * item.productQuantity);
        }
    }, [buyingItem])


    useEffect(() => {
        payment();
    }, [submitPayment]);

    useEffect(async () => {
        const userToken = Cookies.get("userToken");
        const {productId, userId} = item;
        const response = await axios.post("https://fullstack-backend-ecommerce.herokuapp.com/api/checkAvailability", {
            userToken, productId, userId
        }, {
            withCredentials: true
        });
        setQuantityFromSeller(response.data.productStock);
    },[]);
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
                {
                quantityFromSeller >= item.productQuantity && quantityFromSeller !== 0 ? 
                <span>
                    <label>
                        Subtotal:
                        ${item.productPrice * item.productQuantity}
                    </label>

                    {buyingItem ? <i onClick = {()=> setBuyingItem(!buyingItem)} className="fas fa-check check__icon buy"></i>
                    :
                    <i onClick = {()=> setBuyingItem(!buyingItem)}className="fas fa-check check__icon notBuy"></i>}
                </span>
                :
                <span>
                     <label>
                        Out of Stock <br></br>(Try to reach out the seller)
                    </label>
                </span>
                }
            </div>
        </div>
    )
}

export default Product
