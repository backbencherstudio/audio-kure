import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import WC from './../../assets/audios/wc.mp3'

const BackgroundMusic = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [showPrompt, setShowPrompt] = useState(true);
    const audioRef = useRef(null);

    useEffect(() => {
        audioRef.current = new Audio(WC);
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
            console.log('Playback failed:', err);
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
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"></div>
                    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50">
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg text-center">
                            <h3 className="text-xl font-semibold mb-4">Welcome to Our Experience</h3>
                            {/* <p className="mb-4">Click below to start the immersive background music</p> */}
                            <button
                                onClick={startMusic}
                                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
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
                    className="fixed bottom-4 right-4 bg-white/10 backdrop-blur-sm p-3 rounded-full hover:bg-white/20 transition-colors duration-200 z-50"
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