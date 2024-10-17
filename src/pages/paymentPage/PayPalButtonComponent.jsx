/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { PayPalButtons, FUNDING } from "@paypal/react-paypal-js";

const PayPalButtonComponent = ({ amount, handleApproveOrder }) => {
    return (
        <div className="px-3 pb-2 pt-1 ">
            
            <PayPalButtons
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: amount.toString(),
                            },
                        }],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        handleApproveOrder(data);  
                    });
                }}
                onError={(err) => {
                    console.error('PayPal Checkout Error:', err);
                    alert('Something went wrong with your payment. Please try again.');
                }}
                style={{
                    layout: 'vertical', 
                    color: 'gold',
                    shape: 'pill',
                    label: 'paypal',
                }}
                fundingSource={FUNDING.PAYPAL} 
            />
        </div>
    );
};

export default PayPalButtonComponent;
