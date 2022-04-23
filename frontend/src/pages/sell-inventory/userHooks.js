import React from 'react'
import axios from 'axios'
import Cookies from 'js-cookie';

function userHooks({ productId, refresh, setRefresh, productFile, setToggleUpdateScreen, setProductToUpdate}) {
    
    const deleteProduct = async () => {
        const yes = window.confirm("Do you want to delete this product?");
        const userToken = Cookies.get("userToken");
        if (yes) {
            const response = await axios.post("https://fullstack-backend-ecommerce.herokuapp.com/api/deleteProduct", { userToken, productFile, productId }, {
                withCredentials: true
            })
            console.log(response.data);
            const { success, msg } = response.data;
            alert(msg);
            return success ? setRefresh(!refresh) : null;
        }
    }

    const toggleUpdateScreen = async () => {
        try {
            const userToken = Cookies.get("userToken");
            const response = await axios.post('https://fullstack-backend-ecommerce.herokuapp.com/api/getProduct', {productId, userToken}, {
                withCredentials: true
            })
           const product = response.data;
            setProductToUpdate(product);
            setToggleUpdateScreen(true);
        } catch (error) {
            alert("something went wrong...");
        }
    }

    return { deleteProduct, toggleUpdateScreen }

}

export default userHooks
