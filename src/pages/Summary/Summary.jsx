import Logo from '../../shared/Logo';
import WeightLossPlan from '../../components/SymmaryComp/WeightLossPlan';
import ExpertProfileSection from '../../components/SymmaryComp/ExpertProfile';
import { Link } from 'react-router-dom';
import Image from '../../assets/pppp.png'

const WeightLossChart = () => {
    const weightData = JSON.parse(localStorage.getItem('weightData'))





    const code = JSON.parse(localStorage.getItem("user"))?.code;

    return (
        <div className='container mx-auto'>
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

                    <div className="h- xl:w-[600px] relative">
                        <img src={Image} alt="" />
                        <span className='text-xl absolute top-12 bg-black px-3 py-1 rounded-md left-5 merriweather'>{weightData.current} {weightData.unit}</span>
                        <span className='text-xl absolute bottom-36 bg-cyan-400 px-3 py-1 rounded-md right-32 merriweather'>{weightData.target} {weightData.unit}</span>
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
            <WeightLossPlan code={code} />
            <ExpertProfileSection />
        </div>
    );
};

export default WeightLossChart;
