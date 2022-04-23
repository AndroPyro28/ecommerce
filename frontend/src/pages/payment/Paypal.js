import React, { useEffect, useRef } from 'react'
import { PayPalButton } from "react-paypal-button-v2";

function Paypal({totalPrice, setSubmitPayment, submitPayment, setTotalPrice}) {
    const paypal = useRef();
    // useEffect(() => {
    //     window.paypal.Buttons({
    //         createOrder: (data, actions, err) => {
    //             return actions.order.create({
    //                 intent: "CAPTURE",
    //                 purchase_units: [
    //                     {
    //                         description: "Products Item",
    //                         amount: {
    //                             currency_code: "CAD",
    //                         }
    //                     },
    //                 ]
    //             })
    //         }, onApprove: async (data, actions) => {
    //             const order = await actions.order.capture();
    //             console.log(order);

    //         },
    //         onError: (err) => {
    //             console.log(err);
    //         }
    //     }).render(paypal.current)

    // }, []);

    return (
        <PayPalButton
            amount= {totalPrice === 0 ? `---` : `${totalPrice + 10}`}
            catchError ={(err) => console.log("err",err)}
            options={{
                clientId: "AaEt_lWJOT0WMCOxI0cqaihrzV_2isvAx7mbX8WrvyuOLcUwM4s-vAtlvm_zAfE1DIRMtYQBNXhf138q"
            }}
            onError = {(err) => {
                alert("Click the check icon to the product you want to buy");
            }}
            onSuccess={(details, data) => {
            setSubmitPayment(!submitPayment);
            fetch("/paypal-transaction-complete", {
             method: "post",
            body: JSON.stringify({
              orderID: data.orderID
            })
          });
        }
    }
      />
    )
}

export default Paypal
