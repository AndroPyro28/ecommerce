import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
function paymentHooks({item, buyingItem}) {

    const payment = async () => {
        const userToken = Cookies.get("userToken");
        
        const response = await axios.post("https://fullstack-backend-ecommerce.herokuapp.com/api/payment", {userToken, item, buyingItem}, {
            withCredentials: true
        });
        const {success} = response.data;
        if(success)
        {
            // alert("Transaction completed, Thank you for Purchasing our product!");
            window.location.href="/payment/success";
        }  
    }
    return {payment}
}

export default paymentHooks
