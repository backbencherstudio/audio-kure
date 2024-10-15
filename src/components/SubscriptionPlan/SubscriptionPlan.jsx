import React, { useState } from 'react';
import { MdOutlineCheck } from "react-icons/md";
import gift from './../../assets/images/gift.png'
import gift_big from './../../assets/images/free_gift_big.png'
import safe_payment from './../../assets/images/safe_checkout_brands.png'
import logo from './../../assets/images/logo.png'
import refund from './../../assets/images/refund_badge.png'
import CountDownTimer from '../CountDownTimer/CountDownTimer';
import GoogleReviews from '../GoogleReviews/GoogleReviews';
import Footer from '../../shared/Footer';

const PaymentPlan = ({ id, duration, originalPrice, discountedPrice, perDay, originalPerDay, isPopular, hasGift, isSelected, onSelect }) => (
    <div
        className={`relative rounded-2xl p-4 cursor-pointer ${isPopular ? 'bg-white text-gray-900' : 'bg-white text-gray-900'
            }`}
        onClick={() => onSelect(id)}
    >
        <div className="flex items-center">
            <div className={`w-5 h-5 rounded-full border-2 ${isSelected ? 'border-teal-500 bg-teal-500' : 'border-gray-300'
                } mr-3 flex items-center justify-center`}>
                {isSelected && <div className="w-2 h-2 bg-white rounded-full"></div>}
            </div>
            <div className="flex-grow flex justify-between items-center">
                <div>
                    <p className="font-semibold">{duration} plan</p>
                    <p className={`text-sm line-through ${isPopular ? 'text-gray-500' : 'text-gray-500'}`}>${originalPrice}</p>
                </div>
                <div className="my-1">
                    <div className={`text-center border-l border-zinc-50 pl-2 ${isPopular ? 'pt-5' : ''}`}>
                        <p className="text-base text-[#5817E9] line-through ">{originalPerDay}</p>
                        <p className="text-[2rem] " style={{ fontFamily: 'Merriweather' }}>${discountedPrice}</p>
                        <p className={`text-sm ${isPopular ? 'text-gray-500' : 'text-gray-500'}`}>per day</p>
                    </div>
                </div>
            </div>
        </div>
        {isPopular && (
            <div className="absolute top-0 left-0 right-0 bg-[#5817E9] text-white text-center text-xs py-2.5 rounded-t-xl">
                MOST POPULAR
            </div>
        )}
        {hasGift && (
            <div className="flex items-center mt-2 text-xs text-white font-semibold bg-teal-500 py-1.5 px-4 rounded-full absolute bottom-4 left-10">
                <img src={gift} alt="gift image" className='w-4 mr-2' />
                <span>Get secret gift!</span>
            </div>
        )}
    </div>
);

const SubscriptionPlan = () => {
    const [selectedPlan, setSelectedPlan] = useState('7day');

    const handlePlanSelect = (planId) => {
        setSelectedPlan(planId);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Selected plan:', selectedPlan);
    };

    return (
        <div className='bg-[#191435] text-white'>
            <div className='bg-[#07001C]'>
                <nav className='max-w-[1400px] mx-auto py-2 px-4'>
                    <img src={logo} alt="logo" className='w-16 ' />
                </nav>
            </div>
            <CountDownTimer />
            <div className='max-w-[1400px] mx-auto mt-24'>
                <div>
                    <h1 style={{ fontFamily: 'Merriweather' }} className='text-[1.75rem] md:text-[2.5rem] md:w-3/5 text-center mx-auto font-semibold mb-14 px-4 xl:px-0'>Get personal hypnotherapy sessions for your weight loss success!</h1>
                </div>
                <div className='md:flex gap-6 px-4'>
                    <div className="md:w-1/2 ">
                        <h2 className="text-[1.125rem] text-white font-semibold mb-4">Select your plan:</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="space-y-4 mb-4">
                                <PaymentPlan
                                    id="7day"
                                    duration="7 day"
                                    originalPrice="14.14"
                                    originalPerDay="$12"
                                    discountedPrice="6.93"
                                    perDay="0.99"
                                    isSelected={selectedPlan === '7day'}
                                    onSelect={handlePlanSelect}
                                />
                                <PaymentPlan
                                    id="1month"
                                    duration="1-month"
                                    originalPerDay="$21"
                                    originalPrice="30.00"
                                    discountedPrice="16.19"
                                    perDay="0.54"
                                    isPopular
                                    isSelected={selectedPlan === '1month'}
                                    onSelect={handlePlanSelect}
                                />
                                <PaymentPlan
                                    id="3month"
                                    duration="3-month"
                                    originalPerDay="$21"
                                    originalPrice="84.94"
                                    discountedPrice="25.99"
                                    perDay="0.31"
                                    hasGift
                                    isSelected={selectedPlan === '3month'}
                                    onSelect={handlePlanSelect}
                                />
                            </div>

                            <p className="text-base text-[#bec4d2] font-medium mb-10">
                                By clicking Get my plan, I agree to pay $6.93 for my plan and that if I do not cancel before
                                the end of the 1-week introductory plan, Kure will automatically charge my payment
                                method the regular price $30.99 every 1-month thereafter until I cancel. I can cancel online
                                by visiting subscription page in my account on website.
                            </p>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-l from-[#34cbbf] via-[#4675ff] to-[#8a5eff] text-white font-bold p-4 rounded-3xl focus:outline-none focus:shadow-outline hover:scale-105 duration-100 ease-linear"
                            >
                                Get my plan
                            </button>

                            <p className="text-center text-xs my-4">Guaranteed safe checkout</p>
                            <img src={safe_payment} alt="safe-payment" />
                        </form>
                    </div>
                    <div className='md:w-1/2'>
                        <h2 className="text-[1.125rem] text-white font-semibold mb-4 my-10"  >All plans includes:</h2>
                        <ul className='space-y-5'>
                            <li className='flex items-center text-base gap-2'><MdOutlineCheck className='text-teal-400 text-xl' /> Digital app created by experts in hypnosis, neuroscience and food addiction</li>
                            <li className='flex items-center text-base gap-2'><MdOutlineCheck className='text-teal-400 text-xl' /> ntroduction to hypnosis sessions</li>
                            <li className='flex items-center text-base gap-2'><MdOutlineCheck className='text-teal-400 text-xl' /> Personalized daily bedtime hypnotherapy sessions</li>
                            <li className='flex items-center text-base gap-2'><MdOutlineCheck className='text-teal-400 text-xl' /> Special 21-day program for accelerated weight loss</li>
                            <li className='flex items-center text-base gap-2'><MdOutlineCheck className='text-teal-400 text-xl' /> Full 24/7 Client support</li>
                            <li className='flex items-center text-base gap-2'><MdOutlineCheck className='text-teal-400 text-xl' /> Privacy and security guarantee</li>
                            <li className='flex items-center text-base gap-2'><MdOutlineCheck className='text-teal-400 text-xl' /> Progress tracking</li>
                        </ul>
                        <div>
                            <h1 className="text-[1.125rem] text-white font-semibold mb-4 mt-10">If you select the 3-month plan:</h1>
                            <div className='bg-[#07001C] border border-zinc-600 p-4 rounded-3xl' >
                                <div className='md:flex gap-4 '>
                                    <div className='flex md:block justify-center mb-5 md:mb-0'>
                                        <img src={gift_big} alt="gift-image" className='w-32 md:w-full' />
                                    </div>
                                    <div className='text-center md:text-left space-y-2'>
                                        <h1 className='text-2xl font-bold merriweather mt-1 '>Secret gift</h1>
                                        <p className='text-[14px]'>The Kure team wants to support your relationship with food and your transformation, so we've prepared a surprise for you!</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='px-0 md:px-4'>
                    <div className='bg-[#07001C] border border-zinc-600 p-4 rounded-3xl mx-4 md:mx-0 mt-5 md:mt-10' >
                        <div className='md:flex items-center gap-4 '>
                            <div className='flex md:block justify-center mb-5 md:mb-0'>
                                <img src={refund} alt="refund-image" className='w-32' />
                            </div>
                            <div className='text-center md:text-left space-y-2'>
                                <h1 className='text-2xl font-bold merriweather mt-1 '>Risk-free guarantee</h1>
                                <p className='text-[14px]'>No results? Reach out to our customer support and we can cancel your subscription at any time without additional charges.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <GoogleReviews />
            </div>
            <div className='max-w-[1400px] mx-auto px-4'>
                <Footer />
            </div>
        </div>
    );
};

export default SubscriptionPlan;