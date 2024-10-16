import { FaCheckCircle } from 'react-icons/fa';
import image from './../../assets/images/eating.jpg'


const PhysicalsBanner = () => {
    return (
        <div className='max-w-[1400px] mx-auto min-h-screen mt-'>
            <h1 className="text-2xl md:text-5xl font-bold mb-6  xl:w-1/2 mt-5 text-center xl:text-left  px-8 sm:px-4 md:px-4">
                The Ultimate Meal Prepping Guide E-book for Delicious,{" "}
                <span className="bg-gradient-to-r from-violet-700 via-blue-500 to-teal-400 text-transparent bg-clip-text">
                    Healthy Eating
                </span>
            </h1>
            <div className='xl:flex items-center gap-10 mx-4'>
                <ul className="space-y-4 xl:w-2/3 ">
                    <li className="flex items-start">
                        <FaCheckCircle className="text-lightGreen mr-3 text-teal-500 w-24 mt-2 lg:-ml-5" />
                        <div>
                            <h3 className="md:text-xl font-semibold">Balanced Meal Plans</h3>
                            <p className='text-sm md:text-base'>
                                Our guide offers carefully crafted meal plans that provide the
                                perfect balance of protein, healthy fats, and complex carbs.
                                You’ll stay full and energized while burning fat and building
                                lean muscle.
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <FaCheckCircle className="text-lightGreen mr-3 text-teal-500 w-24 mt-2 lg:-ml-5" />
                        <div>
                            <h3 className="md:text-xl font-semibold">
                                Portion Control Made Simple
                            </h3>
                            <p className='text-sm md:text-base'>
                                Understanding portion sizes is crucial for weight loss. Our
                                guide teaches you how to portion your meals effectively, so
                                you get all the nutrients you need without overeating.
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <FaCheckCircle className="text-lightGreen mr-3 text-teal-500 w-24 mt-2 lg:-ml-5" />
                        <div>
                            <h3 className="md:text-xl font-semibold">Quick & Easy Recipes</h3>
                            <p className='text-sm md:text-base'>
                                We know life is busy, so we’ve included a variety of quick and
                                easy recipes that you can prepare in bulk. Spend less time
                                cooking and more time enjoying delicious, wholesome meals.
                            </p>
                        </div>
                    </li>
                    <li className="flex items-start">
                        <FaCheckCircle className="text-lightGreen mr-3 text-teal-500 w-24 mt-2 lg:-ml-5" />
                        <div>
                            <h3 className="md:text-xl font-semibold">Shopping Lists & Tips</h3>
                            <p className='text-sm md:text-base'>
                                We take the guesswork out of meal prepping with organized
                                shopping lists and tips on how to store and reheat your meals
                                to maintain maximum freshness and flavor.
                            </p>
                        </div>
                    </li>
                </ul>
                <div className='relative xl:w-1/2'>
                    <div className='z-0 hidden xl:block'>
                        <div className='w-[400px] h-[400px] 2xl:w-[500px] 2xl:h-[500px] border border-cyan-500 absolute rounded-full -top-10 left-10 2xl:-top-32 2xl:left-10'></div>
                        <div className='w-[400px] h-[400px] 2xl:w-[500px] 2xl:h-[500px] border border-violet-500 absolute rounded-full -top-16 right-10 2xl:-top-16 2xl:right-20'></div>
                        <div className='w-[400px] h-[400px] 2xl:w-[500px] 2xl:h-[500px] border border-blue-500 absolute rounded-full -top-16 left-20 2xl:-top-16 2xl:left-32'></div>
                    </div>
                    <div className='my-5 w-full' >
                        <img src={image} alt="" className='rounded-2xl z-50 xl:rotate-12 lg:max-w-md 2xl:max-w-lg lg:ml-10 border-4' />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PhysicalsBanner;