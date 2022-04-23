import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';

function cartHooks({ item, setPopup, setPopupError, currentUser }) {

    const addToCart = async () => {
        const cartIcon = document.querySelector(".add__cart");
        try {
                cartIcon.disabled = true;
                
                const userToken = Cookies.get("userToken");
                
                const response = await axios.post("https://fullstack-backend-ecommerce.herokuapp.com/api/addToCart", { userToken, item }, {
                    withCredentials: true
                });
                cartIcon.disabled = false;
                const { success } = response.data;
                if (success) {
                    setPopup(true);
                    setTimeout(() => {
                        setPopup(false);

                    }, 1500);
                }
        } catch (error) {
            setPopupError(true);
                setTimeout(() => {
                    setPopupError(false);
                }, 1500);
        }
    }

    return { addToCart };
}

export default cartHooks
