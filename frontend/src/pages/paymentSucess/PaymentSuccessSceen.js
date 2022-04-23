import React from 'react'
import './success.css';
function PaymentSuccessSceen() {
    return (
        <div className="success__screen__container">
                <h1>Thank you for buying our product! <i className="fas fa-calendar-check calendar"></i></h1>


                <i className="fas fa-check check"></i>

                <a href = "/market/products" className="redirectSuccess" >Go back to market</a>

           
        </div>
    )
}

export default PaymentSuccessSceen
