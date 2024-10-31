/* eslint-disable react/prop-types */
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

// const stripePromise = loadStripe('pk_test_51NFvq6ArRmO7hNaVcPS5MwczdEtM4yEMOclovA0k5LtJTxhtzKZ2SKim3p8qmvssQ7j7bREjoRRmHB9Gvz8n8Dfm00UOo9bZYg');
const stripePromise = loadStripe('pk_test_51QFpATLEvlBZD5dJaha6mJPocvY5x6EoeWDg3DVjMIFdAwRzxN6sNlimMO6xW3hk3a7STUMQtVi6vb2NWu1Vc46c000l8Y7yha');

const StripeButtonComponent = () => {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default StripeButtonComponent;
