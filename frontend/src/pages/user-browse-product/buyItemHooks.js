import React from 'react'
import Cookies from 'js-cookie'
import axios from 'axios';

function buyItemHooks({ qty, item}) {

    const addToCart = async (e) => {
        try {
            const userToken = Cookies.get("userToken");

            const response = await axios.post("https://fullstack-backend-ecommerce.herokuapp.com/api/addToCartWithScreen", { userToken, qty, item }, {
                withCredentials: true
            })

            const {success, msg} = response.data;
                return alert(msg);
            
        } catch (error) {

        }
    }

    return { addToCart }
}

export default buyItemHooks
