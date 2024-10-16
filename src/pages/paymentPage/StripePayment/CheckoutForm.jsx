// /* eslint-disable react/prop-types */
// import { useState, useEffect } from 'react';
// import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import axios from 'axios';

// const CheckoutForm = ({ amount }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [error, setError] = useState(null);
//     const [processing, setProcessing] = useState(false);
//     const [clientSecret, setClientSecret] = useState('');

//     useEffect(() => {
//         if (amount > 0) {
//             axios.post('http://localhost:5000/api/v1/payment/create-payment-intent', { amount })
//                 .then(res => {
//                     setClientSecret(res.data.data.clientSecret); 
//                 })
//                 .catch(error => {
//                     console.error("Error fetching client secret:", error);
//                 });
//         }
//     }, [amount]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!stripe || !elements || !clientSecret) return;

//         setProcessing(true);
//         const card = elements.getElement(CardElement);

//         const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card,
//                 billing_details: {
//                     name: 'John Doe', 
//                 },
//             },
//         });

//         if (error) {
//             setError(error.message);
//         } else if (paymentIntent.status === 'succeeded') {
//             console.log('Payment succeeded!', paymentIntent);
//         }
//         setProcessing(false);
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <CardElement />
//             {error && <div className="text-red-500 mt-2">{error}</div>}
//             <button type="submit" disabled={!stripe || processing} className="bg-blue-500 text-white px-4 py-2 mt-4">
//                 {processing ? 'Processing...' : 'Pay Now'}
//             </button>
//         </form>
//     );
// };

// export default CheckoutForm;










// /* eslint-disable react/prop-types */
// import { useState, useEffect } from 'react';
// import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
// import axios from 'axios';
// import './CheckoutForm.css'; // Assuming you have a CSS file for custom styling
// import { toast } from 'react-toastify';

// const CheckoutForm = ({ amount }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [error, setError] = useState(null);
//     const [processing, setProcessing] = useState(false);
//     const [clientSecret, setClientSecret] = useState('');
//     const [name, setName] = useState('');

//     useEffect(() => {
//         if (amount > 0) {
//             axios.post('http://localhost:5000/api/v1/payment/create-payment-intent', { amount })
//                 .then(res => {
//                     setClientSecret(res.data.data.clientSecret); 
//                 })
//                 .catch(error => {
//                     console.error("Error fetching client secret:", error);
//                 });
//         }
//     }, [amount]);

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         if (!stripe || !elements || !clientSecret) return;

//         setProcessing(true);

//         const cardNumberElement = elements.getElement(CardNumberElement);

//         const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: cardNumberElement,
//                 billing_details: {
//                     name: name, 
//                 },
//             },
//         });

//         if (error) {
//             setError(error.message);
//         } else if (paymentIntent.status === 'succeeded') {
//             if(paymentIntent?.id){
//                 toast.success("payment successfull")
//             }
//         }
//         setProcessing(false);
//     };

//     const cardElementOptions = {
//         style: {
//             base: {
//                 fontSize: '16px',
//                 color: '#424770',
//                 '::placeholder': {
//                     color: '#aab7c4',
//                 },
//             },
//             invalid: {
//                 color: '#9e2146',
//             },
//         },
//     };

//     return (
//         <div className="payment-form-container">
//             <form onSubmit={handleSubmit} className="checkout-form">
//                 <h3 className="payment-form-title">Credit card</h3>
//                 <div className="gpay-button">
//                     <button className="buy-gpay">Buy with <span className="gpay-logo">G Pay</span></button>
//                 </div>
//                 <div className="card-details-container">
//                     <label>Card number</label>
//                     <CardNumberElement options={cardElementOptions} className="stripe-input" />
                    
//                     <div className="expiry-cvc-container">
//                         <div className="expiry">
//                             <label>Expiry (MM/YY)</label>
//                             <CardExpiryElement options={cardElementOptions} className="stripe-input" />
//                         </div>
//                         <div className="cvc">
//                             <label>CVV</label>
//                             <CardCvcElement options={cardElementOptions} className="stripe-input" />
//                         </div>
//                     </div>

//                     <label>Name on card</label>
//                     <input
//                         type="text"
//                         className="name-input"
//                         placeholder="Full name"
//                         value={name}
//                         onChange={(e) => setName(e.target.value)}
//                     />
//                 </div>
//                 {error && <div className="error-message">{error}</div>}
//                 <button type="submit" disabled={!stripe || processing} className="submit-button">
//                     {processing ? 'Processing...' : 'Submit Secure Payment'}
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default CheckoutForm;




/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from '@stripe/react-stripe-js';
import axios from 'axios';
import './CheckoutForm.css'; 
import { toast } from 'react-toastify';

const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [name, setName] = useState('');

    // State to track errors from each input
    const [cardError, setCardError] = useState('');
    const [expiryError, setExpiryError] = useState('');
    const [cvcError, setCvcError] = useState('');

    useEffect(() => {
        if (amount > 0) {
            axios.post('http://localhost:5000/api/v1/payment/create-payment-intent', { amount })
                .then(res => {
                    setClientSecret(res.data.data.clientSecret); 
                })
                .catch(error => {
                    console.error("Error fetching client secret:", error);
                });
        }
    }, [amount]);

    // Handle the payment form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements || !clientSecret) return;

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
                    name: name, // Name on the card
                },
            },
        });

        if (error) {
            setError(error.message);
        } else if (paymentIntent.status === 'succeeded') {
            if(paymentIntent?.id){
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
                color: '#424770',
                '::placeholder': {
                    color: '#aab7c4',
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
                    <span className="buy-gpay block cursor-default">Buy with <span className="gpay-logo">G Pay</span></span>
                </div>

                <div className="card-details-container">
                    <label>Card number</label>
                    <CardNumberElement 
                        options={cardElementOptions} 
                        onChange={handleCardChange} 
                        className="border mb-2 px-1 py-2 rounded-md " 
                    />
                    {cardError && <div className="error-message">{cardError}</div>}

                    <div className="expiry-cvc-container">
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
                            <label>CVV</label>
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
                        className="name-input text-black border mb-5 w-full  px-1 py-1 rounded-md"
                        placeholder="Full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" disabled={!stripe || processing} className="submit-button">
                    {processing ? 'Processing...' : 'Submit Secure Payment'}
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;
