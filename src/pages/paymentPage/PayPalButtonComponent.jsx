/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { PayPalButtons } from "@paypal/react-paypal-js";
import { FaPaypal } from "react-icons/fa";

const PayPalButtonComponent = ({ amount, handleApproveOrder }) => {
    return (
        <div className="border border-yellow-400 bg-yellow-50 p-6 rounded-lg shadow-md">
            <div className="flex items-center gap-3 mb-4">
                <FaPaypal className="text-3xl text-yellow-600" />
                <h2 className="text-2xl font-semibold text-gray-700">Pay with PayPal</h2>
            </div>

            <div className="mb-6">
                <p className="text-gray-600 text-md">Secure and easy payments with PayPal. Your payment of <strong>${amount}</strong> will be processed securely.</p>
            </div>

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
                        handleApproveOrder(data);  // Pass the data for approval
                    });
                }}
                onError={(err) => {
                    console.error('PayPal Checkout Error:', err);
                    alert('Something went wrong with your payment. Please try again.');
                }}
                style={{
                    layout: 'vertical',
                    color: 'blue',
                    shape: 'rect',
                    label: 'paypal',
                }}
            />
        </div>
    );
};

export default PayPalButtonComponent;
