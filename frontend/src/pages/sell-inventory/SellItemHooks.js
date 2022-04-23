import React, { useState } from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
function SellItemHooks({ setToggleProductUpload, setRefresh, refresh, setPopup}) {

    const [product, setProduct] = useState({
        productName: "",
        productDescription: "",
        productCategory: "",
        productStock: 0,
        productPrice: 0,
        productFile: ""
    })

    const handleOnChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const objectValues = Object.values(product); // we convert the object to value 

        const isFilled = objectValues.every(values => values != "") // we check if every value of an object is filled

        const { productStock, productPrice } = product;

        if (!isFilled || productStock <= 0 || productPrice <= 0) {
            return alert("All fields are required");
        }

        if (isNaN(productStock) || isNaN(productPrice)) {
            return alert("product stock and product price must be a type of number");
        }

        product.productStock = parseInt(productStock, Number);
        product.productPrice = parseInt(productPrice, Number);

        const { type } = product.productFile;

        if (!type.includes("image")) {
            return alert("Incorrect type of files");
        }

        try {
            const button = document.querySelector('#btn-submit');
            button.disabled = true;
            const userToken = Cookies.get("userToken");

            const reader = new FileReader();

            reader.readAsDataURL(product.productFile);

            reader.onloadend = async () => {
                product.productFile = reader.result;
                const response = await axios.post("https://fullstack-backend-ecommerce.herokuapp.com/api/sell-product", { userToken, product }, {
                    withCredentials: true
                })
                const { success, msg } = response.data;
                alert(msg);
                return success ? (
                    button.disabled = false, 
                    setToggleProductUpload(false),
                    setRefresh(!refresh)) 
                    : null;

                    // if(success) {
                    //     setPopup(true);
                    //     button.disabled = false;
                    //     setToggleProductUpload(false);
                    //     setTimeout(() => (setPopup(false),  setRefresh(!refresh)), 2000)
                    // }

            }
        } catch (error) {
            alert("something went wrong...")
        }
    }
    return { product, setProduct, handleOnChange, handleSubmit }
}

export default SellItemHooks
