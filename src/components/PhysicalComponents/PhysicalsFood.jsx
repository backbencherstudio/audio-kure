import React from 'react';
import image from './../../assets/images/image.jpg'
import image1 from './../../assets/images/image1.jpg'
import image2 from './../../assets/images/image2.jpg'
import image3 from './../../assets/images/image3.jpg'

const PhysicalsFood = () => {
    const foodItems = [
        {
            id: 1,
            image: image,
            title: "Whole-grain taco",
            subtitle: "with beef",
            color: "text-[#41E8DD]"
        },
        {
            id: 2,
            image: image1,
            title: "Seafood with rice",
            subtitle: "",
            color: "text-[#8B5CF6]"
        },
        {
            id: 3,
            image: image2,
            title: "Yogurt with fresh",
            subtitle: "raspberries",
            color: "text-[#41E8DD]"
        },
        {
            id: 4,
            image: image3,
            title: "Fruit salad",
            subtitle: "",
            color: "text-[#41E8DD]"
        }
    ];
    return (
        <div className='mt-32 '>
            <div className="bg-[#1D1B2F] py-10 px-4 xl:px-0">
                <div className="max-w-[1400px] mx-auto">
                    {/* Header Text */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Start Your Journey to a
                            <br />
                            <span className="bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 text-transparent bg-clip-text">
                                Healthier, Happier You
                            </span>
                        </h1>
                        <p className="text-gray-400">
                            and see how easy lasting success can be!
                        </p>
                    </div>

                    {/* Food Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {foodItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex rounded-2xl overflow-hidden bg-[#12111f] border border-gray-800 hover:border-gray-700 transition-colors"
                            >
                                <div className="">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-56 object-cover"
                                    />
                                </div>
                                <div className="flex justify-center w-full items-center">
                                    <div>
                                        <h3 className={`${item.color} text-sm font-medium`}>
                                            {item.title}
                                        </h3>
                                        {item.subtitle && (
                                            <p className={`${item.color} text-xs`}>
                                                {item.subtitle}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhysicalsFood;