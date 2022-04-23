import React, {useState} from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import Product from './Product';
function productHooks({setLoading, category, setItems,}) {

    const fetchProducts = async () => {
        const userToken = Cookies.get("userToken");
        setLoading(true);
        const response = await axios.post("https://fullstack-backend-ecommerce.herokuapp.com/api/products", { category, userToken }, {
            withCredentials: true
        })
        setLoading(false);
        const { products } = response.data;
        shuffleProducts(products);
    }

    const shuffleProducts = (item) => {

        const array = item?.filter(item => item.productStock > 0);
        let arrayLength = array?.length, randomIndex, i = 0;
        let products = [];

        while (i < arrayLength) {

            randomIndex = Math.floor(Math.random() * arrayLength);

            while (products[randomIndex] != null) {
                randomIndex = Math.floor(Math.random() * arrayLength);
            }
            products[randomIndex] = array[i++];
        }
       setItems(products);
    }

    return {fetchProducts}
}

export default productHooks
