/* eslint-disable react/prop-types */
import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const StripeBuyButton = ({ buyButtonId, onPaymentSuccess }) => {
  const buttonContainerRef = useRef(null);
  const stripeButtonRef = useRef(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const checkoutStatus = searchParams.get("checkout");
    if (checkoutStatus === "success") {
      console.log("Payment successful!");
      onPaymentSuccess({ status: "success" });
      navigate(window.location.pathname);
    }

    if (!stripeButtonRef.current) {
      const script = document.createElement("script");
      script.src = "https://js.stripe.com/v3/buy-button.js";
      script.async = true;
      script.onload = () => {
        if (buttonContainerRef.current && !stripeButtonRef.current) {
          const stripeButton = document.createElement("stripe-buy-button");
          stripeButton.setAttribute("buy-button-id", buyButtonId);
          stripeButton.setAttribute("publishable-key", "pk_test_51NFvq6ArRmO7hNaVcPS5MwczdEtM4yEMOclovA0k5LtJTxhtzKZ2SKim3p8qmvssQ7j7bREjoRRmHB9Gvz8n8Dfm00UOo9bZYg");
          stripeButton.setAttribute("success-url", `${window.location.href}?checkout=success`);
          stripeButton.setAttribute("cancel-url", `${window.location.href}?checkout=canceled`);

          stripeButtonRef.current = stripeButton;
          buttonContainerRef.current.appendChild(stripeButton);
        }
      };

      document.body.appendChild(script);
      return () => {
        if (stripeButtonRef.current) {
          buttonContainerRef.current.removeChild(stripeButtonRef.current);
          stripeButtonRef.current = null;
        }
        document.body.removeChild(script);
      };
    }
  }, [buyButtonId, onPaymentSuccess, searchParams, navigate]);

  return <div ref={buttonContainerRef} />;
};

export default StripeBuyButton;