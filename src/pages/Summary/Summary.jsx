import React from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import Logo from '../../shared/Logo';
import WeightLossPlan from '../../components/SymmaryComp/WeightLossPlan';
import ExpertProfileSection from '../../components/SymmaryComp/ExpertProfile';
import { Link } from 'react-router-dom';

const WeightLossChart = () => {
    const data = [
        { name: 'Start', weight: 65, others: 65 },
        { name: 'Week 2', weight: 63, others: 64 },
        { name: 'Week 4', weight: 60, others: 58 },
        { name: 'Week 8', weight: 59, others: 66 },
        { name: 'Week 9', weight: 58, others: 68 },
    ];
    const answers = JSON.parse(localStorage.getItem("answers")) || [];
    const counts = {
        physical: 0,
        emotional: 0,
    };
    answers.forEach((answer) => {
        Object.values(answer).forEach((value) => {
            if (value === "physical") {
                counts.physical += 1;
            } else if (value === "emotional") {
                counts.emotional += 1;
            }
        });
    });
    const userType =
        counts.physical > counts.emotional ? "physical" : "emotional";
    const code = JSON.parse(localStorage.getItem("user"))?.code;
    localStorage.setItem("userType", userType);
    const userCondition = userType;
    return (
        <div className='container mx-auto '>
            <Logo />
            <div className='xl:flex justify-between items-center mt-10 xl:mt-20 gap-10'>
                <div className="xl:max-w-4xl space-y-4 px-4">
                    <h1 className="text-4xl md:text-6xl text-white merriweather">
                        Based on your answers, you can{' '}
                        <span className="text-indigo-400">reach 85% of your goal in 1 month</span>
                    </h1>

                    <p className="text-gray-400 text-sm">
                        Here's what we predict based on 24,000+ users with similar BMI and eating habits.
                    </p>

                    <Link to={`/subscriptionplan?code=${code}`}>
                        <button className="w-72 py-4 mt-5 rounded-2xl bg-gradient-to-r from-[#8a5eff] via-[#4675ff] to-[#34cbbf] text-white font-medium hover:scale-105 duration-200">
                            Get started
                        </button>
                    </Link>
                </div>
                <div className='backdrop-blur-md backdrop-brightness-200 p-4 xl:p-8 rounded-xl mx-4 mt-10 xl:mt-0'>
                    <div className="mb-4 text-center">
                        <h2 className="text-lg font-semibold text-white">
                            Your weight loss forecast with Hypno 4 U
                        </h2>
                    </div>

                    <div className="h-64 xl:w-[600px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <XAxis
                                    dataKey="name"
                                    stroke="#4B5563"
                                    tick={{ fill: '#9CA3AF' }}
                                />
                                <YAxis
                                    domain={[55, 70]}
                                    stroke="#4B5563"
                                    tick={{ fill: '#9CA3AF' }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="weight"
                                    stroke="url(#colorGradient)"
                                    strokeWidth={3}
                                    dot={false}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="others"
                                    stroke="#4B5563"
                                    strokeDasharray="5 5"
                                    strokeWidth={2}
                                    dot={false}
                                />
                                <defs>
                                    <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#818CF8" />
                                        <stop offset="100%" stopColor="#22D3EE" />
                                    </linearGradient>
                                </defs>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="flex flex-col gap-2 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="h-1 w-8 bg-gradient-to-r from-indigo-500 to-cyan-400"></div>
                            <span className="text-sm text-gray-300">Your weight progress using Hypno 4 U</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-1 w-8 bg-gray-600"></div>
                            <span className="text-sm text-gray-300">Other weight loss apps</span>
                        </div>
                    </div>
                </div>
            </div>
            <WeightLossPlan userCondition={userCondition} code={code} />
            <ExpertProfileSection  />
        </div>
    );
};

export default WeightLossChart;