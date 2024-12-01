/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';

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
            <div className="relative h-[500px]">
                <img
                    className="rounded-lg h-full"
                    src="https://png.pngtree.com/thumb_back/fh260/background/20230516/pngtree-bright-pink-man-in-meditation-with-the-breath-of-fire-image_2569056.jpg"
                    alt="Meditation background"
                />
                <div className="absolute left-0 bottom-[50px] text-black w-full h-[50px] flex flex-col items-center justify-center px-2 lg:px-0 ">
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
