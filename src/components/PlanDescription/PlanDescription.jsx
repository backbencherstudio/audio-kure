import React from 'react';

const PlanDescription = () => {
    return (
        <div className="p-6 md:p-12 backdrop-blur-md backdrop-brightn">
            <div className="space-y-16">
                {/* Header */}
                <div className="text-center space-y-6">
                    <h1 className="text-4xl font-bold text-white">
                        Hypno 4 U Subscription Plans
                    </h1>
                    <p className="text-xl text-white/90 leading-relaxed">
                        Discover a subscription system built around{' '}
                        <span className="font-bold text-white">4 Key Pillars</span> to provide
                        personalized hypnotherapy sessions based on your suggestibility type.
                    </p>
                </div>

                {/* Plans */}
                <div className="space-y-16">
                    {/* 7-Day Plan */}
                    <div className="space-y-6 group backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20">
                        <div className="flex items-baseline justify-between border-b border-white/20 pb-2">
                            <h2 className="text-3xl font-bold text-white">1. 7-Day Plan</h2>
                            <div className="text-right">
                                <div className="text-sm text-white/70 line-through">Was: $14.14</div>
                                <div className="text-2xl font-bold text-white">Now: $6.93</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-white">What You Get:</h3>
                                <ul className="space-y-3 list-none">
                                    {['7 days of personalized hypnotherapy sessions targeting your selected pillar.',
                                        'Daily audio sessions to help you quickly address your specific concern, whether it'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-white/90">•</span>
                                            <span className="text-white/80">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10">
                                <h3 className="text-xl font-semibold text-white mb-2">Best For:</h3>
                                <p className="text-white/80">Individuals wanting a short-term solution to explore their hypnotherapy focus and see immediate benefits.</p>
                            </div>
                        </div>
                    </div>

                    {/* 1-Month Plan */}
                    <div className="space-y-6 group backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20 relative">
                        <div className="absolute -left-1 top-4 bg-white px-4 py-1 rounded-r-full text-purple-900 text-sm font-semibold">
                            Most Popular!
                        </div>

                        <div className="flex items-baseline justify-between border-b border-white/20 pb-2">
                            <h2 className="text-3xl font-bold text-white">2. 1-Month Plan</h2>
                            <div className="text-right">
                                <div className="text-sm text-white/70 line-through">Was: $30.99</div>
                                <div className="text-2xl font-bold text-white">Now: $15.19</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-white">What You Get:</h3>
                                <ul className="space-y-3 list-none">
                                    {['30 days of personalized hypnotherapy sessions designed for sustained results.',
                                        'Daily hypnosis audios that focus on your chosen pillar to reinforce healthy behaviors and habits.',
                                        'Bonus: Extra content including motivation boosters and affirmations to deepen the impact of your sessions.'
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <span className="text-white/90">•</span>
                                            <span className="text-white/80">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10">
                                <h3 className="text-xl font-semibold text-white mb-2">Best For:</h3>
                                <p className="text-white/80">Those looking for steady progress and support for long-term transformation in their emotional or physical well-being.</p>
                            </div>
                        </div>
                    </div>

                    {/* 3-Month Plan */}
                    <div className="space-y-6 group backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20">
                        <div className="absolute -left-1 top-4 bg-white px-4 py-1 rounded-r-full text-purple-900 text-sm font-semibold">
                            Includes a Secret Gift!
                        </div>

                        <div className="flex items-baseline justify-between border-b border-white/20 pb-2">
                            <h2 className="text-3xl font-bold text-white">3. 3-Month Plan</h2>
                            <div className="text-right">
                                <div className="text-sm text-white/70 line-through">Was: $53.04</div>
                                <div className="text-2xl font-bold text-white">Now: $25.99</div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-white">What You Get:</h3>
                                <ul className="space-y-3 list-none">
                                    <li className="flex items-start gap-3">
                                        <span className="text-white/90">•</span>
                                        <span className="text-white/80">90 days of comprehensive hypnotherapy sessions, fully customized to your pillar of choice.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-white/90">•</span>
                                        <span className="text-white/80">All the benefits of the 1-month plan, plus:</span>
                                    </li>
                                    <li className="flex items-start gap-3 pl-6">
                                        <span className="text-white/90">-</span>
                                        <span className="text-white/80">Bonus: Secret Gift (exclusive hypnosis content or an additional tool to enhance your experience).</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="backdrop-blur-sm bg-white/5 p-4 rounded-lg border border-white/10">
                                <h3 className="text-xl font-semibold text-white mb-2">Best For:</h3>
                                <p className="text-white/80">Individuals committed to a long-term journey towards achieving their goals with exclusive support.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Pillers */}
            <div className="mt-16">
                <div className="backdrop-blur-sm bg-white/10 p-6 rounded-lg border border-white/20">
                    <h1 className="text-3xl font-bold mb-6 text-center">Personalized Hypnotherapy Based on 4 Key Pillars</h1>
                    <p className="mb-4">When subscribing, choose the pillar that best aligns with your suggestibility type and personal goals:</p>

                    <h2 className="text-2xl font-semibold mt-6 mb-4">For Emotionally Suggestible Individuals:</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Pillar 1: The SELF</h3>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li><span className="font-semibold">Focus:</span> Inner emotions and self-perception.</li>
                                <li><span className="font-semibold">Goal:</span> Strengthen emotional awareness, self-love, and confidence by addressing your inner emotional world.</li>
                                <li><span className="font-semibold">Who It's For:</span> Individuals who feel deeply connected to their emotions and want to improve their internal relationship with themselves.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Pillar 2: The EGO</h3>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li><span className="font-semibold">Focus:</span> Relationships with others and external validation.</li>
                                <li><span className="font-semibold">Goal:</span> Improve how you interact with the world, enhance social skills, and manage your response to external feedback.</li>
                                <li><span className="font-semibold">Who It's For:</span> Individuals looking to improve social confidence, reduce feelings of insecurity, and build healthy relationships.</li>
                            </ul>
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold mt-6 mb-4">For Physically Suggestible Individuals:</h2>
                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Pillar 1: The BODY</h3>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li><span className="font-semibold">Focus:</span> Physical sensations and actions.</li>
                                <li><span className="font-semibold">Goal:</span> Overcome habits, reduce pain, improve physical health, and transform behavior through body-focused hypnotherapy.</li>
                                <li><span className="font-semibold">Who It's For:</span> Those who experience their reality through physical sensations and want to address bodily concerns such as weight loss, stress relief, or fitness goals.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Pillar 2: The MIND</h3>
                            <ul className="list-disc list-inside ml-4 space-y-2">
                                <li><span className="font-semibold">Focus:</span> Logical thinking and mental processes.</li>
                                <li><span className="font-semibold">Goal:</span> Restructure thought patterns, improve focus, and reduce mental stress by enhancing logical and cognitive abilities.</li>
                                <li><span className="font-semibold">Who It's For:</span> Individuals who are more mentally inclined, seeking clarity, problem-solving abilities, or cognitive support.</li>
                            </ul>
                        </div>
                    </div>

                    <h2 className="text-2xl font-semibold mt-6 mb-4">Why Choose Hypno 4 U?</h2>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                        <li><span className="font-semibold">Tailored to You:</span> Each plan is designed around the 4 pillars, ensuring your hypnotherapy sessions align with your emotional or physical suggestibility.</li>
                        <li><span className="font-semibold">Flexible and Affordable:</span> Our plans offer different durations and price points, so you can choose what works best for you.</li>
                        <li><span className="font-semibold">Proven Hypnotherapy Techniques:</span> Our sessions use guided visualizations and hypnotherapy techniques proven to help you achieve your specific goals.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default PlanDescription;