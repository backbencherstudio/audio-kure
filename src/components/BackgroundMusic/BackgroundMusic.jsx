/* eslint-disable no-unused-vars */
import  { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import WC from './../../assets/audios/introAudio/Intro - 14 sec.wav'

const BackgroundMusic = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showPrompt, setShowPrompt] = useState(true);
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio(WC)
;
        audioRef.current.loop = true;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
            }
        };
    }, []);

    const startMusic = async () => {
        try {
            await audioRef.current.play();
            setIsPlaying(true);
            setShowPrompt(false);
        } catch (err) {
            console.log('Playback failed:');
        }
    };

    const togglePlay = async () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            await audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <>
            {showPrompt && (
                <div>
                    {/* <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"></div> */}
                    <div className="w-[250px] md:w-[300px] xl:w-[400px]">
                        <div className="bg-white/10 backdrop-blur-md py-2 md:p-6 rounded-xl shadow-lg text-center">
                            <h3 className="text-xl font-semibold mb-4  "></h3>
                            <button
                                onClick={startMusic}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 "
                            >
                                Start now
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {!showPrompt && (
                <button
                    onClick={togglePlay}
                    className=" bottom-4 right-4 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors duration-200 z-50"
                    aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
                > 
                    {isPlaying ? (
                        <Volume2 className="w-6 h-6 text-white" />
                    ) : ( 
                        <VolumeX className="w-6 h-6 text-white" />
                    )}
                </button> 
            )}
        </>
    ); 
};

export default BackgroundMusic; 