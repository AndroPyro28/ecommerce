import React, { useEffect, useState } from 'react'
import './inventorycart.css'
import Product from './Product'
import axios from 'axios';
import Cookies from 'js-cookie';

function InventoryCart({ setToggleCart, refresh, setRefresh}) {

    const [items, setItems] = useState();
    const [total, setTotal] = useState(0);
    const [toggleUpdatebtn, setToggleUpdateBtn] = useState(false);
    const [updateProducts, setUpdateProducts] = useState(false);
    const [apiCall, setApiCall] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(async () => {
        try {
            setTotal(0);
            const userToken = Cookies.get("userToken");
            const response = await axios.post("https://fullstack-backend-ecommerce.herokuapp.com/api/isAuth", { userToken }, {
                withCredentials: true
            })

            const { currentuser } = response.data;

            setItems(currentuser.cart)

            currentuser.cart.map(item => {
                setTotal(prev => prev + item.productPrice * item.productQuantity);
            });
            setLoading(false);
            setToggleUpdateBtn(false);
        } catch (error) {
            alert("something went wrong")
        }
    }, [apiCall])

    const displayItems = items?.slice(0).reverse().map(item => {
        return (
            <Product apiCall={apiCall} setApiCall={setApiCall} key={item.productId} item={item} updateProducts={updateProducts} setToggleUpdateBtn={setToggleUpdateBtn} />
        )
    })

    return (
        <div className="inventory__cart__backdrop">

            <div className="inventory__cart__container">
                <i className="exit__button fas fa-times-circle" onClick={() => setToggleCart(false)}></i>
                <h2>Order</h2>


                <div className="product__list">
                     {/* {displayItems?.length !== 0 ? displayItems : <div className="query__screen">No items yet</div>} */}
                    { loading ? <div className="query__screen">loading...</div>:displayItems?.length !== 0 ? displayItems : <div className="query__screen">No items yet</div>}

                </div>

                <div className="subtotal__container label__container">
                    <span>Subtotal:</span>
                    <span>${total}</span>
                </div>

                <div className="shipping__container label__container">
                    <span>Transaction fee:</span>
                    <span>${displayItems?.length !== 0 ? 10 : 0}</span>
                </div>

                {
                    toggleUpdatebtn &&
                    <div className="update__container label__container">
                        To save the changes click &nbsp;<button onClick={() => {setUpdateProducts(!updateProducts)}}>Update</button>
                    </div>
                }

                <div className="total__container label__container">
                    <span>Total:</span>
                    <span>${displayItems?.length !== 0 ? total + 10 : 0}</span>
                </div>
                <button onClick={() => window.location.href ="/user/payment"} className="checkout__button">Proceed to check out</button>
            </div>


        </div>

    )
}

export default InventoryCart
