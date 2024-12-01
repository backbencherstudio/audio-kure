import { useEffect, useState } from 'react';

const CountDownTimer = ({ onCountdownEnd }) => {
    const [timeLeft, setTimeLeft] = useState(() => {
        const savedTime = localStorage.getItem('countdownTime');
        if (savedTime) {
            const endTime = parseInt(savedTime, 10);
            const now = Math.floor(Date.now() / 1000);
            const remaining = endTime - now;
            return remaining > 0 ? remaining : 0;
        }
        return 10 * 60; 
    });

    useEffect(() => {
        const endTime = Math.floor(Date.now() / 1000) + timeLeft;
        localStorage.setItem('countdownTime', endTime.toString());

        if (timeLeft > 0) {
            const timerId = setInterval(() => {
                const now = Math.floor(Date.now() / 1000);
                const remaining = endTime - now;
                if (remaining > 0) {
                    setTimeLeft(remaining);
                } else {
                    setTimeLeft(0);
                    clearInterval(timerId);
                    onCountdownEnd();
                }
            }, 1000);

            return () => clearInterval(timerId);
        } else {
            onCountdownEnd();
        }
    }, [onCountdownEnd]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `00 : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="s-bg text-gray-100 text-center py-4">
            <span className='text-[18px] font-semibold px-4'>Start your first session tonight! Your discount ends in:</span>
            <span className="font-bold m-1 bg-[#806f13] px-6 py-1 rounded text-white">
                {formatTime(timeLeft)}
            </span>
        </div>
    );
};

export default CountDownTimer;