const OrderConfirmation = () => {
    return (
        <div className=" mt-60 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl backdrop-blur-md backdrop-brightness-200 rounded-lg shadow-sm p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-extrabold bg-gradient-to-r from-white via-blue-500 to-teal-400 text-transparent bg-clip-text mb-6 merriweather">
                        Thank you for your order!
                    </h1>
                    <p className="text-gray-300">
                        We've sent you a letter with the further instructions to your email:
                    </p>
                    <p className="text-gray-400 font-medium my-4">
                        dr@besthealer.com
                    </p>
                    <p className="text-gray-300 text-sm">
                        In case of any questions you can always contact our support <span className="bg-gradient-to-r from-white via-blue-500 to-teal-400 text-transparent bg-clip-text">info@healerapp.health</span>
                    </p>
                </div>

                {/* Order Summary */}
                <div>
                    <h2 className="text-lg font-semibold text-gray-400 mb-4">
                        Order summary
                    </h2>

                    {/* 3-month plan */}
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-300">3-month plan</span>
                        <span className="text-gray-400">USD 25.99</span>
                    </div>

                    {/* Free gift */}
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-300">Free gift</span>
                        <span className="text-gray-300">FREE</span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-gray-200 my-4"></div>

                    {/* Total */}
                    <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-medium">Total</span>
                        <span className="text-gray-400 font-medium">USD 25.99</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderConfirmation;