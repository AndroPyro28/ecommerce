import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'

function inventoryCartHooks({ item, setToggleUpdateBtn,setApiCall,apiCall, quantity}) {

    const submitUpdatedProduct = async () => {

        const userToken = Cookies.get("userToken")
        
        const response = await axios.post("https://fullstack-backend-ecommerce.herokuapp.com/api/updateQuantity", {userToken, item, quantity}, {
            withCredentials: true
        })
        console.log(response.data);
        setApiCall(!apiCall)
    }
    const togglebtn = () => {
        setToggleUpdateBtn(true)
    }

    return { submitUpdatedProduct, togglebtn}
}

export default inventoryCartHooks
