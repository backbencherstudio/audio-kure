import  { useEffect, useState } from 'react';

const CountDownTimer = () => {
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `00 : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-[#EE8D99] text-gray-800 text-center py-4">
            <span className='text-[18px] font-semibold px-4'>Start your first session tonight! Your discount ends in:</span>
            <span className="font-bold m-1 bg-[#CE5561] px-6 py-1 rounded text-white">
                {formatTime(timeLeft)}
            </span>
        </div>
    );
};

export default CountDownTimer;