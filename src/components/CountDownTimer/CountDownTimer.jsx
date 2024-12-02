import { useEffect, useState } from 'react';

const CountDownTimer = ({ onCountdownEnd }) => {
    const [timeLeft, setTimeLeft] = useState(() => {
        const savedTime = parseInt(localStorage.getItem('countdownTime'), 10);
        const countdownCompleted = localStorage.getItem('countdownCompleted');

        if (countdownCompleted === 'true') {
            return 0; // Timer already completed
        }

        if (!isNaN(savedTime)) {
            const now = Math.floor(Date.now() / 1000);
            const remaining = savedTime - now;
            return remaining > 0 ? remaining : 0;
        }

        return 5 * 60; // Default 5 minutes
    });

    useEffect(() => {
        if (timeLeft === 0) {
            localStorage.setItem('countdownCompleted', 'true');
            return;
        }

        const endTime = Math.floor(Date.now() / 1000) + timeLeft;
        localStorage.setItem('countdownTime', endTime.toString());

        const timerId = setInterval(() => {
            const now = Math.floor(Date.now() / 1000);
            const remaining = endTime - now;

            if (remaining > 0) {
                setTimeLeft(remaining);
            } else {
                setTimeLeft(0);
                clearInterval(timerId);
                onCountdownEnd();
                localStorage.setItem('countdownCompleted', 'true'); // Mark as completed
            }
        }, 1000);

        return () => clearInterval(timerId);
    }, [timeLeft, onCountdownEnd]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `00 : ${minutes.toString().padStart(2, '0')} : ${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-gray-800 text-gray-100 text-center py-4">
            <span className="text-[18px] font-semibold px-4">
                Start your first session tonight! Your discount ends in:
            </span>
            <span className="font-bold m-1 bg-yellow-600 px-6 py-1 rounded text-white">
                {formatTime(timeLeft)}
            </span>
        </div>
    );
};

export default CountDownTimer;
