import React from 'react';
import doctor from './../../assets/images/doctor.jpg'
import { Link } from 'react-router-dom';

const ExpertProfileSection = ({ code }) => {
    return (
        <div className=" p-4 mt-10 xl:mt-20rounded-xl xl:py-20">
            <div className=" mx-auto">
                <div className="flex flex-col lg:flex-row  gap-12">
                    {/* Text Content */}
                    <div className="lg:w-1/2 space-y-6">
                        <h1 className="text-5xl font-serif text-white font-">
                            Experts behind Your Plan
                        </h1>

                        <div className="space-y-10">
                            <p className="text-slate-300 text-lg">
                                When creating Hypno 4 U, our goal was to offer assistance to individuals who feel unsure
                                about progressing toward their body goals, especially after experiencing repeated
                                setbacks.
                            </p>

                            <p className="text-slate-300 text-lg">
                                Drawing from our experience working with thousands of clients, we understand
                                that the crucial factor distinguishing successful endeavors from unsuccessful ones
                                lies in our mindset. Hypnotherapy is the perfect method for addressing this problem.
                            </p>

                            <p className="text-slate-300 text-lg">
                                The power of our thoughts and the strong connection between our gut and mind
                                are the keys to achieving success in body and nutrition transformations.
                            </p>

                            <p className="text-slate-300 text-lg">
                                Try Hypno 4 U app and see for yourself how hypnosis will help you stop food cravings
                                and unhealthy eating habits.
                            </p>
                        </div>

                        <div className="space-y-1">
                            <p className="text-indigo-400 font-medium">Dr. Moghazy</p>
                            <p className="text-slate-400">Ericksonian hypnotherapy expert</p>
                        </div>

                        <Link to={`/subscriptionplan?code=${code}`}>
                            <button className="w-72 py-4 mt-5 rounded-2xl bg-gradient-to-r from-[#8a5eff] via-[#4675ff] to-[#34cbbf] text-white font-medium hover:scale-105 duration-200">
                                Get started
                            </button>
                        </Link>
                    </div>

                    {/* Image */}
                    <div className="lg:w-2/5">
                        <div className="rounded-2xl overflow-hidden bg-slate-100">
                            <img
                                src={doctor}
                                alt="Expert portrait"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExpertProfileSection;