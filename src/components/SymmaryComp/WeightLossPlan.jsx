import React from 'react';

const WeightLossPlan = () => {
    const timelineItems = [
        {
            week: "Week 1",
            description: "Starting deep mind transformation, changing perception",
            color: "bg-purple-500"
        },
        {
            week: "Week 2",
            description: "Blocking food cravings",
            color: "bg-purple-500"
        },
        {
            week: "Week 3",
            description: "Improving eating habits",
            color: "bg-purple-500"
        },
        {
            week: "Week 4",
            description: "Removing toxic internal beliefs",
            color: "bg-purple-500"
        },
        {
            week: "Week 5 and onwards",
            description: "Reinforcing mind transformation for lasting results",
            color: "bg-cyan-400"
        }
    ];

    return (
        <div className=" p-4 mt-20 xl:mt-56">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <h1 className="merriweather lg:w-2/3 mx-auto text-4xl md:text-5xl text-white text-center mb-16 ">
                    Your weight loss plan with hypnotherapy
                </h1>

                {/* Stats */}
                <div className="xl:flex justify-center gap-16 mb-12">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded border border-cyan-400 flex items-center justify-center">
                            <div className="w-3 h-3 bg-cyan-400"></div>
                        </div>
                        <div className="text-white">
                            <p className="text-sm opacity-80">Your target weight</p>
                            <p className="font-semibold">58 lbs</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-cyan-400/20 flex items-center justify-center">
                            <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        </div>
                        <div className="text-white">
                            <p className="text-sm opacity-80">Probability of success</p>
                            <p className="font-semibold text-cyan-400">96%</p>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Timeline */}
                    <div className="backdrop-blur-md backdrop-brightness-200 rounded-xl p-6">
                        <div className="space-y-3">
                            {timelineItems.map((item, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-10 h-10 rounded-full ${item.color} flex items-center justify-center`}>
                                            <svg className="w-6 h-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        {index !== timelineItems.length - 1 && (
                                            <div className="w-0.5 h-12 mt-3 bg-purple-500/30"></div>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">{item.week}</h3>
                                        <p className="text-gray-400 text-sm">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Results Cards */}
                    <div className="space-y-4">
                        <div className="backdrop-blur-md backdrop-brightness-200 rounded-xl p-6">
                            <div className="flex gap-3 items-center mb-4">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-white">Blocked food craving</span>
                            </div>
                            <h3 className="text-2xl text-white font-semibold">Sweets</h3>
                        </div>

                        <div className="backdrop-blur-md backdrop-brightness-200 rounded-xl p-6">
                            <div className="flex gap-3 items-center mb-4">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                <span className="text-white">Stopped eating habits</span>
                            </div>
                            <h3 className="text-2xl text-white font-semibold">Irregular Eating</h3>
                        </div>

                        <div className="backdrop-blur-md backdrop-brightness-200 rounded-xl p-6">
                            <div className="flex gap-3 items-center mb-4">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-white">Removed internal belief</span>
                            </div>
                            <h3 className="text-2xl text-white font-semibold">"I lack will power"</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeightLossPlan;