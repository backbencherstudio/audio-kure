import React from 'react';
import AudioNames from '../AudioNames/AudioNames';

const PlanDescription = () => {
    return (
        <div className="p-4 xl:p-12 ">
            <div className="space-y-16">
                {/* Header */}
                {/* <div className="text-center space-y-6">
                    <h1 className="text-4xl font-bold text-white">
                        It's Easy as 1, 2, 3
                    </h1>
                </div> */}

                {/* Plans */}
                <div className="space-y-16">
                    {/* 7-Day Plan */}
                    <div className="space-y-6 group backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20">
                        <div className="flex items-baseline justify-between border-b border-white/20 pb-2">
                            <h2 className="text-3xl font-bold text-white">Enjoy Full Access to Over 200 Self-Hypnosis Audios All Year Round:</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-white">What You Get:</h3>
                                <ul className="space-y-3 list-none">
                                    {['Personalized Sessions: Each hypnotherapy session is customized to meet your unique needs.',
                                        'You are in Control: Take charge of your life with tailored plans', 'Goal Setting Tools: Define clear goals before starting your journey', 'Progress Tracking: Utilize proven, science-backed tools to monitor your progress.'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-white/90">•</span>
                                            <span className="text-white/80">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10">
                                <h3 className="text-xl font-semibold text-white mb-2">The best part?</h3>
                                <p className="text-white/80">You get rewarded for your success—“ACCESS THE VAULT!</p>
                            </div>
                        </div>
                    </div>

                    {/* 1-Month Plan */}
                    <div className="space-y-6 group backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 relative">
                        {/* <div className="absolute -left-1 top-4 bg-white px-4 py-1 rounded-r-full text-purple-900 text-sm font-semibold">
                            Most Popular!
                        </div> */}

                        <div className="flex items-baseline justify-between border-b border-white/20 pb-2">
                            <h2 className="text-3xl font-bold text-white">Here is How it works:</h2>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-white">Follow These 4 Simple Steps:</h3>
                                <ul className="space-y-3 list-none">
                                    {['Choose a Payment Plan',
                                        'Select Your Topic or Issue',
                                        'Set Your Goals', 'Track Your Success and Earn Rewards'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-white/90">•</span>
                                            <span className="text-white/80">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10">
                                <p className="text-white/80">When subscribing, pick a topic from the pillar that best matches your suggestibility type—how your unconscious mind learns.</p>
                            </div>
                        </div>
                    </div>

                    {/* 3-Month Plan */}
                    <div className="space-y-6 group backdrop-blur-sm bg-white/10 py-6 rounded-lg border border-white/20">
                        <AudioNames />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlanDescription;