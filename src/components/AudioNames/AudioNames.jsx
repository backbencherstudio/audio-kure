import React, { useState } from 'react';

const AudioNames = () => {

    const data = {
        Emotional: {
            Self: [
                "Audio Inner Child Introduction - Day 1",
                "The Roots of Inner Child Issues - Day 2",
                "Inner Child Resolutions - Day 3",
                "Lack of Confidence",
                "Self-Image",
                "Guilt",
                "Grief",
                "I Am Enough",
                "Not Good Enough",
                "Stubborn",
                "Self-Criticism",
                "Self-Defeating Behaviors",
                "Bullying",
                "Death or Loss",
                "Fear of Failure",
                "Self-Esteem",
                "Self-Expression",
                "Self-Forgiveness",
                "Self-Awareness",
                "Self-Actualization",
                "Self-Blame",
                "Self-Confidence",
                "Fear of School",
                "Fear of Success",
                "Fear of Water",
                "Find Hidden Talents",
                "Forgiveness",
                "Frustration",
                "Freedom",
                "Giving Up",
                "Grinding Jaw/Teeth",
                "Gratitude",
                "Hair Twisting",
                "Surrender",
                "Trust",
                "Hopelessness",
                "Hypochondria",
                "Hostility",
                "Hoarding",
                "Hypertension",
                "Hypno-Birthing",
                "Indecision",
                "Inferiority",
                "Inhibition",
                "Insecurity",
                "Irrational",
                "Irrational Thoughts",
                "Jealousy",
                "Lack of Joy",
                "Lack of Ambition",
                "Lack of Self-Confidence",
                "Lack of Freedom",
                "Lack of Enthusiasm",
                "Abandonment",
                "Sadness",
                "Passive-Aggressive",
                "(Quantum Transformation 1) Past Life Regression 1",
                "(Quantum Transformation 2) Past Life Regression 2",
                "Past Life Regression 3 (Quantum Transformation 3)"
            ],
            Ego: [
                "Fear of Losing Control",
                "Stuck",
                "Concentration",
                "Fear of Doing Mistakes",
                "Creativity",
                "Sabotage",
                "Self-Control",
                "Confused",
                "Anger",
                "Attention-Deficit Disorder (ADD)",
                "Attention, Deficit/Hyperactivity Disorder (ADHD)",
                "Gambling",
                "Lack of Initiative",
                "Biofeedback",
                "Breakthrough",
                "Self-Mastery",
                "Let Go of Anger",
                "Lower Blood Pressure",
                "Manifestation",
                "Medication Side Effects",
                "Memory",
                "Me Time",
                "Mindfulness",
                "Mistrust",
                "Moodiness",
                "Motivation",
                "Calm",
                "Dreams",
                "Lack of Motivation",
                "Fear of Animals",
                "Fear of Death",
                "Fear of Dentist",
                "Fear of Doctor",
                "A New Way of Thinking",
                "Negativism",
                "Obsessions",
                "Obsessive-Compulsive",
                "Overly Critical",
                "Panic Attacks",
                "Perfectionism",
                "Irritability",
                "Pessimism",
                "Phobias",
                "Worried",
                "Problem-Solving",
                "Procrastination",
                "Release Tension",
                "Resistance",
                "Change Negative Thoughts",
                "Resistance to Change",
                "Aging",
                "Codependency"
            ]
        },
        Physical: {
            Body: [
                "Chronic Pain",
                "Weight Loss",
                "Lack of Sleep",
                "Insomnia",
                "Sleep Difficulty",
                "Bruxism",
                "Teeth Grinding",
                "Temptation",
                "Thumb Sucking",
                "Tinnitus",
                "Tics",
                "Healthy Living",
                "Finger Picking",
                "Skin Picking",
                "Fear of Flying",
                "Fear of Heights",
                "Irritable Bowel Syndrome (IBS)",
                "Skin Problems",
                "Smoking Cigarettes/Vaping",
                "Gagging",
                "Cramps",
                "Substance Abuse Addictions",
                "Age Regression",
                "Aggression",
                "Fear of Surgery Anesthesia",
                "Trauma Abuse",
                "Victimization",
                "Bed Wetting",
                "Breathing Issues",
                "Assertiveness",
                "Assist Healing",
                "Nail Biting",
                "Cancer Care",
                "Vaping",
                "Headache",
                "Sports Performance",
                "Relax",
                "Lack of Exercise",
                "Immune System",
                "Impotency",
                "Improve Physical Wellness",
                "Fear of New Food",
                "Fear of Bees/Wasp",
                "Restlessness",
                "Relaxation",
                "Picky Eating Habit",
                "Post-Surgical Anxiety",
                "Pre-Surgical Anxiety",
                "Overeating",
                "Self Esteem",
                "Intimacy Issues",
                "Sexual Identity",
                "Body Image",
                "Compassion",
                "Fatigue",
                "Eating Disorder",
                "Grief and Loss",
                "Gender Identity",
                "Highly Sensitive Person",
                "Hoarding",
                "Life Coaching",
                "LGBTQ Issues",
                "Internet Addiction",
                "Obesity",
                "Obsessive-Compulsive Disorder",
                "Pet Bereavement",
                "PTSD",
                "Spirituality",
                "Relationship Issues",
                "Stress",
                "Women’s Issues",
                "Video Game Addiction"
            ],
            Mind: [
                "Anxiety & Trauma",
                "Social Anxiety",
                "Money Relationships",
                "Feeling Lost",
                "Social Phobia",
                "Finding Love",
                "Corona Virus Anxiety",
                "Attitude Adjustment",
                "Communication",
                "Codependency",
                "Coping Strategies",
                "Change Habits",
                "Compulsive Spending",
                "Career Success",
                "Shame",
                "Stage Fright",
                "Stress",
                "Study Habits",
                "Give Thanks",
                "Success",
                "Superiority",
                "Improve Sales",
                "Tardiness",
                "Teen Age Anxiety",
                "Writers Block",
                "Transformation",
                "Peaceful",
                "Exam Anxiety",
                "Gratitude",
                "Helplessness",
                "Vulnerability",
                "Fear of Aging",
                "Agoraphobia",
                "Neglected Communities",
                "Discouraged",
                "LGBTQ Communities",
                "Sexual Problems",
                "Lack of Love",
                "Sexual Incompetence",
                "Sex Performance",
                "Public Speaking",
                "Premature Ejaculation",
                "Purpose in Life",
                "Prosperity",
                "Reach Goals",
                "Lack of Belonging",
                "Nightmares",
                "Responsibility",
                "PTSD",
                "Lack of Direction",
                "Relationship Enhancement",
                "More Laughter",
                "Happiness"
            ]
        }
    };

    return (
        <div className="p-4 xl:p-6">
            <h1 className='text-3xl md:text-4xl font-bold text-white text-center mb-6'>(200 Audios, 4000 Hours +)</h1>
            <h1 className='text-base font-bold text-white text-center mb-6'>Your Ultimate Self-Hypnosis Library</h1>
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {Object.entries(data).map(([mainCategory, subCategories]) => (
                    <div key={mainCategory} className="space-y-8">
                        {/* Main Category Header */}
                        <div className={`text-center p-4 rounded-lg ${mainCategory === 'Emotional' ? 'bg-white/10 p-6 rounded-lg border border-white/20' : 'bg-white/10 p-6 rounded-lg border border-white/20'
                            }`}>
                            <h2 className={`text-2xl font-bold ${mainCategory === 'Emotional' ? 'text-indigo-800' : 'text-emerald-800'
                                }`}>
                                {mainCategory}
                            </h2>
                        </div>

                        {/* Sub Categories */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
                            {Object.entries(subCategories).map(([subCategory, items]) => (
                                <div key={subCategory} className="space-y-4">
                                    {/* Sub Category Header */}
                                    <div className={`p-3 rounded-lg ${mainCategory === 'Emotional'
                                        ? subCategory === 'Self' ? 'bg-white/10 rounded-lg border border-white/20' : 'bg-white/10 rounded-lg border border-white/20'
                                        : subCategory === 'Body' ? 'bg-white/10 rounded-lg border border-white/20' : 'bg-white/10 rounded-lg border border-white/20'
                                        }`}>
                                        <h3 className={`text-xl font-semibold text-center ${mainCategory === 'Emotional'
                                            ? subCategory === 'Self' ? 'text-purple-800' : 'text-pink-800'
                                            : subCategory === 'Body' ? 'text-teal-800' : 'text-cyan-800'
                                            }`}>
                                            {subCategory}
                                        </h3>
                                    </div>

                                    {/* Items List */}
                                    <div className="bg-white/10 shadow-sm h-96 overflow-auto custom-scroll p-2 rounded-lg">
                                        <div className="">
                                            {items
                                                .map((item, index) => (
                                                    <div
                                                        key={index}
                                                        className={`p-3 hover:bg-white/20 rounded-lg transition-colors duration-200 cursor-pointer ${mainCategory === 'Emotional'
                                                            ? subCategory === 'Self' ? 'text-purple-700' : 'text-pink-700'
                                                            : subCategory === 'Body' ? 'text-teal-700' : 'text-cyan-700'
                                                            }`}
                                                    >
                                                       • {item}
                                                    </div>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AudioNames;