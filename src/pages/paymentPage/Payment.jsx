/* eslint-disable no-unused-vars */
import axios from "axios";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalButtonComponent from "./PayPalButtonComponent";
import StripeButtonComponent from "./StripePayment/StripeButtonComponent";
import logo from "./../../assets/images/logo.png";
import logoPaypal from "./../../assets/images/PayPal.png";
import credit_cards from "./../../assets/images/credit_cards.png";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/fetures/auth/authSlice";
import authApi from "../../redux/fetures/auth/authApi";
import Logo from "../../shared/Logo";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate()
  const currentUser = useSelector(selectCurrentUser);
  const [planData, setPlanData] = useState({})
  const [purchasePlan] = authApi.usePurchasePlanMutation()

  useEffect(() => {
    const plan = localStorage.getItem("plan")
    const parsedPlan = plan ? JSON.parse(plan) : null;
    const userType = localStorage.getItem("userType")
    setPlanData({ parsedPlan, userType })
  }, [])

  const amount = parseFloat(planData?.parsedPlan?.price);

  const handleCreateOrder = async () => {
    try {
      const { data } = await axios.post(
        // "http://localhost:5000/api/v1/payment",
        "https://kure-server.vercel.app/api/v1/payment",
        { amount }
      );
      return data.forwardLink;
    } catch (error) {
      console.error("Error creating PayPal order:", error);
    }
  };

  const handleApproveOrder = async (data) => {

    if (await data?.facilitatorAccessToken) {
      const persisData = {
        plan: planData?.parsedPlan.plan,
        price: planData?.parsedPlan.price,
        email: currentUser?.email,
        userType: planData?.userType
      }
      const res = await purchasePlan(persisData);
      if (res?.data?.success) {
        navigate("/daily-audios")
      }
      toast.success("Payment successful");
    }

    try {
      await axios.post(
        // "http://localhost:5000/api/v1/payment/execute-payment",
        "https://kure-server.vercel.app/api/v1/payment/execute-payment",
        {
          orderID: data.orderID,
          payerID: data.payerID,
        }
      );
    } catch (error) {
      console.error("Error approving PayPal order:", error);
    }
  };

  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [isPayPalVisible, setIsPayPalVisible] = useState(false);
  const [isCreditVisible, setIsCreditVisible] = useState(false);

  useEffect(() => {
    if (paymentMethod === "paypal") {
      setIsPayPalVisible(true);
      setIsCreditVisible(false);  // Hide Credit section
    } else if (paymentMethod === "credit") {
      setIsPayPalVisible(false);  // Hide PayPal section
      setIsCreditVisible(true);
    } else {
      setIsPayPalVisible(false);
      setIsCreditVisible(false);
    }
  }, [paymentMethod]);

  return (
    <div className=" min-h-[95vh] container mx-auto">
      <div className="">     {/* <img src={logo} alt="logo" className="w-16" /> */}
        <Logo />
      </div>
      <div className="backdrop-blur-md backdrop-brightness-200 max-w-[1000px] mx-auto  md:flex flex-row-reverse justify-between gap-10 p-4 md:p-10 rounded-2xl">

        <div className="md:w-2/5">
          <h1 className=" text-xl font-medium mb-6 pb-6 border-b">Order summary</h1>
          <div className="flex items-center justify-between border-b pb-4 mb-4">
            <div className="flex items-center">
              {/* Image */}
              <div>
                <img
                  src={logoPaypal}
                  alt="healer Plan"
                  className="w-20 h-20 object-cover border rounded-md mr-4"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium">1-month plan</h3>
                <p className="text-xs text-gray-500">Discount 51%</p>
              </div>
            </div>
            {/* Price */}
            <div className="text-right space-y-2">
              <p className="text-sm font-medium">$30.99</p>
              <p className="text-xs text-red-500">-$15.80</p>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center">
            <p className="text-lg font-bold">Total:</p>
            <p className="text-lg font-bold ">$15.19</p>
          </div>
        </div>
        <div className="md:w-3/4 mt-20 md:mt-0">
          <h1 className=" text-xl font-medium mb-6">Select a payment method</h1>
          <div className="max-w-[550px]">
            <div
              className={`border rounded-lg mb-4 ${paymentMethod === "paypal" ? "border-zinc-300" : ""
                }`}
              onClick={() => setPaymentMethod("paypal")}
            >
              <label className={`flex items-center justify-between p-4 cursor-pointer ${paymentMethod === "paypal" ? 'border-b' : ''} rounded-t-lg`}>
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${paymentMethod === "paypal"
                      ? "border-teal-500 bg-teal-500"
                      : "border-gray-300"
                      } mr-3 flex items-center justify-center`}
                  >
                    {paymentMethod === "paypal" && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="">PayPal</span>
                </div>
                <div className="text-blue-600 font-bold"><img src={logoPaypal} alt="" className="w-20" /></div>
              </label>

              {paymentMethod === "paypal" && (
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isPayPalVisible ? "h-[80px]" : "h-0 duration-300"
                    }   mt-4 rounded-md`}
                >
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
              className={`border rounded-lg ${paymentMethod === "credit" ? "border-zinc-300" : ""
                }`}
              onClick={() => setPaymentMethod("credit")}
            >
              <label className={`flex items-center justify-between p-4 cursor-pointer ${paymentMethod === "credit" ? 'border-b rounded-t' : 'rounded-lg'} `}>
                <div className="flex items-center">
                  <div
                    className={`w-5 h-5 rounded-full border-2 ${paymentMethod === "credit"
                      ? "border-teal-500 bg-teal-500"
                      : "border-gray-300"
                      } mr-3 flex items-center justify-center`}
                  >
                    {paymentMethod === "credit" && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="">Credit card</span>
                </div>
                <div className="flex space-x-2">
                  <img src={credit_cards} alt="Visa" className="h-5" />

                </div>
              </label>

              {paymentMethod === "credit" && (
                <div className={`overflow-hidden transition-all duration-1000 ease-in-out ${isCreditVisible ? "h-[500px]" : "h-0"
                  } mt-4 p-4 rounded-md`}>
                  <StripeButtonComponent amount={amount} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
