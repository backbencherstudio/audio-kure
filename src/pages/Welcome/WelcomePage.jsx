import React, { useEffect, useState } from 'react';
import logo2 from "./../../assets/images/logo.png";
import { Link } from 'react-router-dom';

const WelcomePage = () => {
    const userType = localStorage.getItem("type");


    return (
        <div className='relative h-screen overflow-hidden'>


            <div className='container mx-auto relative z-10 '>
                <header className="py-4">
                    <div className="flex w-fit mx-auto lg:mx-0">
                        <Link className="flex" to={"/"}>
                            <img className="h-12 my-3" src={logo2} alt="Logo" />
                            <span className="flex flex-col font-bold text-2xl justify-center font-serif text-indigo-600">
                                healer
                            </span>
                        </Link>
                    </div>
                </header>

                <div className='  flex items-center justify-center'>
                    <div className=" shadow-md bg-indigo-900/75  rounded-lg p-8 max-w-lg flex flex-col mx-auto mt-8 transition-transform transform  ">
                        <h4 className="text-xl text-center text-white  ">
                            After analyzing your data, we have detected you as a <span className="font-semibold text-white bg-green-600 px-4 uppercase">{userType} suggestible.</span>
                        </h4>
                        <p className="text-center text-xl text-white mt-4 ">
                            Welcome to your personalized experience. We're here to guide you on your journey!
                        </p>
                        <Link to="/email" className="mt-6 inline-block btnGrad w-full text-center text-white font-semibold py-2 px-4 rounded hover:bg-indigo-500  ">
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomePage;
