import React from 'react';
import image from './../../assets/images/image.jpg'
import image2 from './../../assets/images/image3.jpg'

const PhysicalsPayment = () => {
    return (
        <div className='bg-[#0D0B1F]'>
            <div className="  relative px-4 py-12 overflow-hidden">
                {/* Decorative Images */}
                <div className="hidden lg:block absolute left-0 bottom-10">
                    <div className="w-48 h-48 bg-[#FFA500] rounded-full overflow-hidden">
                        <img
                            src={image}
                            alt="Pumpkin"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="hidden lg:block absolute right-0 top">
                    <div className="w-48 h-48 bg-[#FFB6C1] rounded-full overflow-hidden">
                        <img
                            src={image2}
                            alt="Avocado"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Content Container */}
                <div className="max-w-2xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                            Ready to take control of your
                            <br />
                            <span className="bg-gradient-to-r from-[#7B5CFA] via-[#3B82F6] to-[#41E8DD] text-transparent bg-clip-text">
                                weight loss journey?
                            </span>
                        </h1>
                        <p className="text-gray-300">
                            while still enjoying the foods you love!
                        </p>
                    </div>

                    {/* Pricing Card */}
                    <div className="bg-white rounded-3xl p-8 text-center mb-6">
                        <div className="flex items-center justify-center gap-1 text-4xl font-semibold mb-4">
                            <span className="text-2xl text-black">USD</span>
                            <span className="text-5xl text-black merriweather">9.99</span>
                        </div>

                        <div className="space-y-3">
                            <span className="inline-block bg-[#41E8DD] text-white rounded-full px-4 py-1 text-sm">
                                One-time payment
                            </span>
                            <hr />
                            <div className="w-56 mx-auto block bg-[#7B5CFA] text-white rounded-full px-4 py-1 text-sm">
                                One-time opportunity
                            </div>
                            <p className="text-gray-500 text-sm">
                                This offer won't be available again
                            </p>
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button className="w-full bg-gradient-to-r from-[#34cbbf] via-[#4675ff] to-[#8a5eff] text-white rounded-full py-4 font-medium mb-6 hover:opacity-90 transition-opacity">
                        Add to my order
                    </button>

                    {/* Features */}
                    <div className="space-y-4 text-gray-300">
                        <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-[#41E8DD] mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p>This is not a subscription. There are no hidden fees. No contracts.</p>
                        </div>

                        <div className="flex items-start gap-2">
                            <svg className="w-5 h-5 text-[#41E8DD] mt-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            <p>Get Official Hypno 4 u guidebook for an additional one-time payment of USD 9.99. Created by professionals and made for people who want to enjoy their life. It's you.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhysicalsPayment;