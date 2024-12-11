import React, { useEffect, useState } from 'react';
import { FaMinus } from 'react-icons/fa6';
import doctor from "../../assets/images/doctor.avif";
import patient from "../../assets/images/patient.webp";
import { Link } from 'react-router-dom';

const ChatUi = ({ code, userCondition }) => {
    const [messages, setMessages] = useState([]);
    const messageQueue = [
        { text: "What does this mean?", sender: "patient" },
        { text: `This means you learn by ${userCondition === "emotional" ? "in-direct" : "direct"} hypnosis.`, sender: "doctor" },
        { text: "How is this going to help me?", sender: "patient" },
        { text: "To learn more, let the journey begin.", sender: "doctor" },
    ];

    useEffect(() => {
        let isMounted = true;

        const displayMessages = (index) => {
            if (index < messageQueue.length && isMounted) {
                setMessages((prev) => [...prev, messageQueue[index]]);
                setTimeout(() => displayMessages(index + 1), 500);
            }
        };

        setMessages([]);
        displayMessages(0);

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <div className='lg:w-2/3 mx-2   min-h-[470px] border lg:mx-auto rounded-xl p-5 shadow-2xl shadow-white/10 backdrop-blur-xl flex flex-col justify-between'>
            <div className='flex flex-col h-full'>
                <div className='flex justify-between items-center px-5 py-1 rounded-md bg-gray-50/20 mb-4'>
                    <div className='flex gap-2'>
                        <div className='h-5 w-5 border rounded-full bg-red-500'></div>
                        <div className='h-5 w-5 border rounded-full bg-yellow-300'></div>
                        <div className='h-5 w-5 border rounded-full bg-green-700'></div>
                    </div>
                    <div>
                        <FaMinus className='text-black cursor-pointer' />
                    </div>
                </div>

                <div className='overflow-auto flex-grow scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 mt-5'>
                    {messages.map((msg, index) => (
                        <div key={index} className={`flex items-center gap-4 mb-4 ${msg.sender === 'doctor' ? 'flex-row-reverse' : ''}`}>
                            <img className='w-14 rounded-full' src={msg.sender === 'doctor' ? doctor : patient} alt={msg.sender} />
                            <h4 className={`lg:text-lg md:text-base text-xs text-end w-fit ${msg.sender === 'doctor' ? 'bg-green-200' : 'bg-blue-200'} text-black font-medium p-3 rounded-lg shadow-md`}>
                                {msg.text}
                            </h4>
                        </div>
                    ))}
                </div>
            </div>
            {/* <Link to={`/subscriptionplan?code=${code}`} className='w-fit btnGrad mx-auto lg:text-xl rounded-2xl px-5 py-3 transition-colors duration-300  hover:bg-indigo-500 hover:text-white'> */}
            <Link to={`/subscriptionplan`} className='w-40 text-center btnGrad mx-auto lg:text-xl rounded-2xl px-5 py-3 transition-colors duration-300  hover:bg-indigo-500 hover:text-white'>
                Start Here
            </Link>
            
            {/* <Link to='/summary' className='w-fit btnGrad mx-auto lg:text-xl rounded-2xl px-5 py-3 transition-colors duration-300  hover:bg-indigo-500 hover:text-white'>
                Let's Start
            </Link> */}

        </div>
    );
}

export default ChatUi;
