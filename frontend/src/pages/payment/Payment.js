import React, { useEffect, useRef, useState } from 'react'
import ProtectedNav from '../../components/protectedNav/ProtectedNav';
import Product from './Product';
import './payment.css'
import Footer from '../../components/footer/Footer';
import ProtectedSideBar from '../../components/ProtectedSB/ProtectedSideBar';
import Paypal from './Paypal';

function Payment({ currentUser }) {
    const [items, setItems] = useState();
    const [toggleSidebar, setToggleSidebar] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [submitPayment, setSubmitPayment] = useState(false);

    useEffect(() => {

        // if(!currentUser.verified) {
        //     window.location.href = "/user/profile"
        // }

        setItems(currentUser.cart);
        currentUser.cart?.map(item => setTotalPrice(prev => prev + item.productPrice * item.productQuantity))
    }, [])

    return (
        <div>
            {
                toggleSidebar && <ProtectedSideBar setToggleSidebar={setToggleSidebar} /> //sidebar for mobile
            }
            <ProtectedNav
                currentUser={currentUser}
                setToggleSidebar={setToggleSidebar}
            />
            <a className="redirectMarket" href="/market/products"><i className="fas fa-arrow-left"></i> Continue Shopping...</a>
            <h2 className="payment_header">Choose Your Payment Method</h2>
            <p className="payment_instruction">Only Check the product you want to buy</p>

            <div className="payment__container">

                <div className="list__of__products">
                    <div className="total__container">
                        <span>Total price:</span>
                        <span>${totalPrice === 0 ? 0 : totalPrice + 10}</span>
                    </div>
                    {
                    items?.slice(0).reverse().map(item => {
                        return <Product key={item.productId} item={item} totalPrice={totalPrice} submitPayment={submitPayment} setTotalPrice={setTotalPrice} />
                    })
                    }
                </div>


                <div className="paypal__container" >
                    <Paypal
                        setSubmitPayment={setSubmitPayment}
                        submitPayment={submitPayment}
                        className="paypalBtn"
                        setTotalPrice={setTotalPrice}
                        totalPrice={totalPrice} />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Payment
