/* eslint-disable no-unused-vars */
import axios from "axios";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalButtonComponent from "./PayPalButtonComponent";
import StripeButtonComponent from "./StripePayment/StripeButtonComponent";
import logo from "./../../assets/images/logo.png";
import { toast } from "react-toastify";
import { useState } from "react";

const Payment = () => {
  const amount = 2;

  const handleCreateOrder = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/payment",
        { amount }
      );
      return data.forwardLink;
    } catch (error) {
      console.error("Error creating PayPal order:", error);
    }
  };

  const handleApproveOrder = async (data) => {
    if (await data?.facilitatorAccessToken) {
      console.log(30, data?.facilitatorAccessToken);
      toast.success("payment successful");
    }
    try {
      const { data: paymentData } = await axios.post(
        "http://localhost:5000/api/v1/payment/execute-payment",
        {
          orderID: data.orderID,
          payerID: data.payerID,
        }
      );
    } catch (error) {
      // console.error('Error approving PayPal order:', error);
    }
  };

  const [paymentMethod, setPaymentMethod] = useState("credit");

  return (
    <div>
      <div className="bg-[#07001C]">
        <nav className="max-w-[1400px] mx-auto py-2 px-4">
          <img src={logo} alt="logo" className="w-16 " />
        </nav>
      </div>

      <div className="max-w-[1140px] mx-auto">
        <div className="max-w-[500px]">
          <div
            className={`border rounded-lg mb-4 ${
              paymentMethod === "paypal" ? "border-blue-500" : ""
            }`}
          >
            <label className="flex items-center justify-between p-4 cursor-pointer">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="paypal"
                  checked={paymentMethod === "paypal"}
                  onChange={() => setPaymentMethod("paypal")}
                  className="mr-3"
                />
                <span>PayPal</span>
              </div>
              <div className="text-blue-600 font-bold">PayPal</div>
            </label>

            {paymentMethod === "paypal" && (
              <div className="bg-white mt-4 p-4 rounded-md">
                <PayPalScriptProvider
                  options={{
                    "client-id":
                      "AeMnBMlrboT2yZ77Ny1Zuwm-UnhJeeMzvE1D1ana1ZetUAzPfo7C-Px41iR4FijH5SN1FHEYrGokg3G2",
                  }}
                >
                  <PayPalButtonComponent
                    amount={amount}
                    handleApproveOrder={handleApproveOrder}
                  />
                </PayPalScriptProvider>
              </div>
            )}
          </div>

          <div
            className={`border rounded-lg ${
              paymentMethod === "credit" ? "border-blue-500" : ""
            }`}
          >
            <label className="flex items-center justify-between p-4 cursor-pointer">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit"
                  checked={paymentMethod === "credit"}
                  onChange={() => setPaymentMethod("credit")}
                  className="mr-3"
                />
                <span>Credit card</span>
              </div>
              <div className="flex space-x-2">
                <img src="/api/placeholder/30/20" alt="Visa" className="h-5" />
                <img
                  src="/api/placeholder/30/20"
                  alt="Mastercard"
                  className="h-5"
                />
                <img
                  src="/api/placeholder/30/20"
                  alt="Maestro"
                  className="h-5"
                />
                <img
                  src="/api/placeholder/30/20"
                  alt="PayPal"
                  className="h-5"
                />
              </div>
            </label>

            {paymentMethod === "credit" && (
              <div className="bg-white mt-4 p-4 rounded-md">
                <StripeButtonComponent amount={amount} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;