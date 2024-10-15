import axios from "axios";
import Footer2 from "../../shared/Footer2";
import logo from './../../assets/images/logo.png';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalButtonComponent from "./PayPalButtonComponent";



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
        try {
            console.log('Order approved, details:', data);
            const { data: paymentData } = await axios.post('http://localhost:5000/api/v1/payment/execute-payment', {
                orderID: data.orderID,
                payerID: data.payerID, 
            });
            console.log('Payment executed successfully:', paymentData);
        } catch (error) {
            console.error('Error approving PayPal order:', error);
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
                <div className="w-[500px]">
                    <PayPalScriptProvider options={{ "client-id": 'AeMnBMlrboT2yZ77Ny1Zuwm-UnhJeeMzvE1D1ana1ZetUAzPfo7C-Px41iR4FijH5SN1FHEYrGokg3G2' }}>
                        <PayPalButtonComponent
                            amount={amount}
                            handleApproveOrder={handleApproveOrder} />
                    </PayPalScriptProvider>
                </div>
            </div>


            <Footer2 />
        </div>
    );
};

export default Payment;




// billingToken
// :
// null
// facilitatorAccessToken
// :
// "A21AAId1kd_jU4cXqbWOMRpLVcKMa5N7p7cmb0USVpUJlv1X3qaWrFQxGnUik3kF8o0t-VoEZYPo53FoB3dUE75bIbm6g7i9g"
// orderID
// :
// "84L6402845144832C"
// payerID
// :
// "EQCMS8LBW3N8C"
// paymentID
// :
// "84L6402845144832C"
// paymentSource
// :
// "paypal"