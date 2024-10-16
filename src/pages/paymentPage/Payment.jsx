/* eslint-disable no-unused-vars */
import axios from "axios";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalButtonComponent from "./PayPalButtonComponent";
import StripeButtonComponent from "./StripePayment/StripeButtonComponent";
import logo from './../../assets/images/logo.png';
import { toast } from "react-toastify";

const Payment = () => {
    const amount = 2; 

     const handleCreateOrder = async () => {
        try {
            const { data } = await axios.post('http://localhost:5000/api/v1/payment', { amount });
            return data.forwardLink;
        } catch (error) {
            console.error('Error creating PayPal order:', error);
        }
    };

    const handleApproveOrder = async (data) => {
        if (await data?.facilitatorAccessToken) {
            console.log(30, data?.facilitatorAccessToken);
            toast.success("payment successFull")
        }
        try {
            const { data: paymentData } = await axios.post('http://localhost:5000/api/v1/payment/execute-payment', {
                orderID: data.orderID,
                payerID: data.payerID,
            });
        } catch (error) {
            // console.error('Error approving PayPal order:', error);
        }
    };




    return (
        <div>
            <div className='bg-[#07001C]'>
                <nav className='max-w-[1400px] mx-auto py-2 px-4'>
                    <img src={logo} alt="logo" className='w-16 ' />
                </nav>
            </div>

            <div className="max-w-[1140px] mx-auto">
                <div className="max-w-[500px]">

                    <PayPalScriptProvider options={{ "client-id": 'AeMnBMlrboT2yZ77Ny1Zuwm-UnhJeeMzvE1D1ana1ZetUAzPfo7C-Px41iR4FijH5SN1FHEYrGokg3G2' }}>
                        <PayPalButtonComponent
                            amount={amount}
                            handleApproveOrder={handleApproveOrder} />
                    </PayPalScriptProvider>


                    <div className="bg-white mt-10 py-5 rounded-md">
                        <StripeButtonComponent amount={amount} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
