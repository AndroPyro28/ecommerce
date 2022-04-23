import React, { useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';

function UpdateHooks({ setToggleUpdateScreen, productToUpdate, refresh, setRefresh }) {

    const [updateProduct, setUpdateProduct] = useState(productToUpdate);
    
    const [file, setFile] = useState();

    const handleOnChange = (e) => {
        setUpdateProduct({ ...updateProduct, [e.target.name]: e.target.value })
    }

    const makeRequest = async (file = "") => {
        const button = document.querySelector("#btn-submit");
        button.disabled = true;
        const userToken = Cookies.get("userToken");
        console.log(updateProduct);
        const response = await axios.post("https://fullstack-backend-ecommerce.herokuapp.com/api/updateProduct", { userToken, updateProduct, file }, {
            withCredentials: true
        })
        const { msg, success } = response.data;

        alert(msg);
        console.log(success);

        return success ?
            (setRefresh(!refresh),
                setToggleUpdateScreen(false),
                button.disabled = false
            )
            :
            null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const values = Object.values(updateProduct);

        const isFilled = values.every(value => value != "");

        if (!isFilled) return alert("please fill out the input boxes")

        let productObject = updateProduct;

        productObject.productStock = parseInt(updateProduct.productStock, Number)
        productObject.productPrice = parseInt(updateProduct.productPrice, Number)

        try {

            if (file) {
                const reader = new FileReader();
                reader.readAsDataURL(file);

                reader.onloadend = () => {

                    makeRequest(reader.result);
                }
            }
            else {
                makeRequest();
            }

        } catch (error) {

        }

    }

    return { handleOnChange, updateProduct, handleSubmit, setFile }
}

export default UpdateHooks;
