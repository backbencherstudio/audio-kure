/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import './CheckoutForm.css';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/fetures/auth/authSlice';
import authApi from '../../../redux/fetures/auth/authApi';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const currentUser = useSelector(selectCurrentUser);
    const [purchasePlan] = authApi.usePurchasePlanMutation()
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [name, setName] = useState('');
    const [cardError, setCardError] = useState('');
    const [expiryError, setExpiryError] = useState('');
    const [cvcError, setCvcError] = useState('');
    const [planData, setPlanData] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const plan = localStorage.getItem("plan")
        const parsedPlan = plan ? JSON.parse(plan) : null;
        const userType = localStorage.getItem("userType")
        setPlanData({ parsedPlan, userType })
    }, [])
  
    const amount = parseFloat(planData?.parsedPlan?.price);



    useEffect(() => {
        if (amount > 0) {
            axios.post('https://kure-server.vercel.app/api/v1/payment/create-payment-intent', { amount })
                .then(res => {                    
                    setClientSecret(res?.data?.data?.clientSecret);
                })
                .catch(error => {
                    console.error("Error fetching client secret:", error);
                });
        }
    }, [amount]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) return;
        if (!clientSecret) {
            setError('Client secret not ready. Please try again.');
            toast.error("Client secret not ready. Please try again. or try another method")
            return;
        }
        setProcessing(true);
        const cardNumberElement = elements.getElement(CardNumberElement);
        const cardExpiryElement = elements.getElement(CardExpiryElement);
        const cardCvcElement = elements.getElement(CardCvcElement);

        if (!cardNumberElement._complete || !cardExpiryElement._complete || !cardCvcElement._complete) {
            setError('Please complete all required fields.');
            setProcessing(false);
            return;
        }

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardNumberElement,
                billing_details: {
                    name: name,
                },
            },
        });

        if (error) {
            setError(error.message);
        } else if (paymentIntent.status === 'succeeded') {
            if (paymentIntent?.id) {
                const persisData = {
                    plan: planData?.parsedPlan.plan,
                    price: planData?.parsedPlan.price,
                    email: currentUser?.email,
                    userType: planData?.userType,
                    orderID: paymentIntent.id,
                }
                const res = await purchasePlan(persisData);
                if (res?.data?.success) {
                    navigate("/daily-audios")
                }
                toast.success("Payment successful!");
            }
        }

        setProcessing(false);
    };

    // Stripe element styling options
    const cardElementOptions = {
        style: {
            base: {
                fontSize: '16px',
                color: 'white',
                '::placeholder': {
                    color: 'white',
                },
            },
            invalid: {
                color: '#9e2146',
            },
        },
    };

    // Error handling for Stripe input fields
    const handleCardChange = (event) => {
        if (event.error) {
            setCardError(event.error.message);
        } else {
            setCardError('');
        }
    };

    const handleExpiryChange = (event) => {
        if (event.error) {
            setExpiryError(event.error.message);
        } else {
            setExpiryError('');
        }
    };

    const handleCvcChange = (event) => {
        if (event.error) {
            setCvcError(event.error.message);
        } else {
            setCvcError('');
        }
    };

    return (
        <div className="payment-form-container">
            <form onSubmit={handleSubmit} className="checkout-form">
                <h3 className="payment-form-title">Credit card</h3>

                <div className="gpay-button">
                    <span className="buy-gpay block cursor-default">Buy with <span className="gpay-logo"> Stripe </span></span>
                </div>

                <div className="card-details-container">
                    <label>Card number</label>
                    <CardNumberElement
                        options={cardElementOptions}
                        onChange={handleCardChange}
                        className="border mb-2 px-1 py-2 rounded-md "
                    />
                    {cardError && <div className="error-message">{cardError}</div>}

                    <div className="expiry-cvc-container grid grid-cols-2 gap-5">
                        <div className="expiry">
                            <label>Expiry (MM/YY)</label>
                            <CardExpiryElement
                                options={cardElementOptions}
                                onChange={handleExpiryChange}
                                className="border mb-2 px-1 py-2 rounded-md "
                            />
                            {expiryError && <div className="error-message">{expiryError}</div>}
                        </div>

                        <div className="cvc">
                            <label>CVC</label>
                            <CardCvcElement
                                options={cardElementOptions}
                                onChange={handleCvcChange}
                                className="border mb-2 px-1 py-2 rounded-md "
                            />
                            {cvcError && <div className="error-message">{cvcError}</div>}
                        </div>
                    </div>

                    <label>Name on card</label>
                    <input
                        type="text"
                        className="name-input bg-transparent focus:outline-none  border mb-5 w-full  px-1 py-1.5 rounded-md placeholder:text-white"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                {error && <div className="error-message">{error}</div>}

                <button type="submit" disabled={processing} className="submit-button btnGrad text-gray-500">
                    {processing ? 'Processing...' : 'Submit Secure Payment'}
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;
