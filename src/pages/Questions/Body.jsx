import React from 'react';
import img from "./../../assets/images/info.webp";
import ProgressBars from '../../shared/ProgressBar/ProgressBar';
import { Link } from 'react-router-dom';

const Body = () => {
    return (
        <div>
            <ProgressBars page={3} value={75} />
            <div className="flex flex-col-reverse container  justify-between px-40 py-20 items-start lg:flex-row w-full mx-auto  rounded-lg shadow-md">
                <div className="mb-4 max-w-[540px] flex-1 flex flex-col h-full gap-3  justify-between">
                    <p className="text-3xl font-semibold merriweather">
                        This time, it will be different. We’re targeting the root cause.
                    </p>
                    <p className=" text-base">
                        Ever heard the saying <span className="font-bold text-purple-300">“It’s all in your head?”</span> or <span className="font-bold text-purple-300">“Your Gut is your second brain”?</span>
                    </p>
                    <p className=" text-base">
                        Stress eating, unusual gut reactions, or butterflies in your stomach when nervous are all signs of the gut-brain connection.
                    </p>
                    <p className=" text-base text-purple-300">
                        Subconscious mind influencing miscommunication between the gut and the brain is the key factor in causing overweight and making bad dietary choices*.
                    </p>
                    <p className=" text-base">
                        Over 50,000 users begin the Kure self-hypnosis course each month, successfully rebalancing their gut-brain connection by eliminating negative thought patterns and overcoming subconscious obstacles.
                    </p>
                    <p className=" text-base italic">
                        "I was shocked how effective this hypnosis app is." - <span className="font-semibold">Elena, using Kure app since 2024.</span>
                    </p>
                    <Link to={"/let's go"} className=" text-center px-4 py-2 btnGrad w-full text-white rounded">
                        Got it
                    </Link>
                    <p className=" text-sm text-gray-500">
                        Source: *Nutrients. 2021 Feb; 13(2): 584.
                    </p>
                </div>
                <div className="relative  flex-1 flex items-center justify-center h-full">
                    <img
                        src={img}
                        alt="Kure App"
                        className=" max-h-[504.812px] rounded-2xl"
                    />
                </div>
            </div>
        </div>
    );
}

Body.propTypes = {};

export default Body;
