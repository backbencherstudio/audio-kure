/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import imageKure from './../../assets/images/cure_session.png'


const NewAudioPlayer = ({ audioUrl, setTotalDuration, setListeningTime }) => {

    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current && audioUrl) {
            audioRef.current.load();
            audioRef.current.play().catch((err) => {
                console.error('Error playing audio:', err);
            });

            audioRef.current.onloadedmetadata = () => {
                setTotalDuration(Math.floor(audioRef.current.duration));
            };

            let interval;
            audioRef.current.onplay = () => {
                interval = setInterval(() => {
                    setListeningTime((prevTime) => prevTime + 1);
                }, 1000);
            };

            audioRef.current.onpause = () => {
                clearInterval(interval);
            };

            audioRef.current.onended = () => {
                clearInterval(interval);
            };

            return () => clearInterval(interval);
        }
    }, [audioUrl]);

    useEffect(() => {
        setListeningTime(0);
    }, [audioUrl]);

    return (
        <div className="">
            <div className="relative h-full md:h-[600px] overflow-hidden bg-green-50/10 rounded-lg ">
                <img
                    className="rounded-lg h-full w-full object-cover "
                    src={imageKure}
                />
                <div className="absolute left-0 bottom-2 md:bottom-[60px] text-black w-full h-[50px] flex flex-col items-center justify-center px-2 lg:px-0 ">
                    <audio
                        ref={audioRef}
                        controls
                        controlsList="nodownload"
                        className="rounded-lg w-full max-w-md"
                    >
                        <source src={audioUrl} type="audio/mp3" />
                    </audio>
                    
                </div>
            </div>
        </div>
    );
};

export default NewAudioPlayer;
