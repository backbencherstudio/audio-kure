import React, { useState, useRef, useEffect } from 'react';
import { IoMusicalNotes, IoPause, IoLockClosed } from "react-icons/io5";
import Logo from '../../shared/Logo';
import Confetti from 'react-confetti';

const Vault = () => {
    const [playingId, setPlayingId] = useState(null);
    const [hasAccess, setHasAccess] = useState(true);
    const [showConfetti, setShowConfetti] = useState(true);
    const audioRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowConfetti(false);
        }, 10000);

        return () => clearTimeout(timer);
    }, []);

    const audioFiles = [
        { id: 1, title: "Summer Breeze", duration: "3:45", url: "/path/to/audio1.mp3" },
        { id: 2, title: "Midnight Jazz", duration: "4:20", url: "/path/to/audio2.mp3" },
    ];

    const handlePlay = (audioFile) => {
        if (playingId === audioFile.id) {
            audioRef.current.pause();
            setPlayingId(null);
        } else {
            if (audioRef.current) audioRef.current.pause();
            const audio = new Audio(audioFile.url);
            audio.addEventListener('ended', () => setPlayingId(null));
            audio.play();
            audioRef.current = audio;
            setPlayingId(audioFile.id);
        }
    };

    return (
        <div className='container mx-auto'>
            {showConfetti && hasAccess && <Confetti numberOfPieces={300} />}

            <Logo />
            <div>
                <div>
                    <img src="" alt="" />
                </div>
                <div className="max-w-2xl mx-auto backdrop-blur-md backdrop-brightness-150 p-6 rounded-xl shadow-lg mt-16">
                    <div className="backdrop-blur-md backdrop-brightness-200 rounded-lg shadow">
                        <h3 className="text-lg font-semibold p-4 border-b border-zinc-400 flex items-center">
                            <IoMusicalNotes className="mr-2 text-yellow-500" />
                            Special Audio Files
                        </h3>
                        <div className="max-h-[calc(100vh-200px)] overflow-y-auto divide-y divide-zinc-700">
                            {audioFiles.map((audio) => (
                                <div
                                    key={audio.id}
                                    onClick={() => handlePlay(audio)}
                                    className={`flex items-center justify-between p-4  cursor-pointer  transition-colors ${playingId === audio.id ? 'bg-black/50' : ''
                                        }`}
                                >
                                    <div className="flex items-center flex-1">
                                        <div className="w-8 text-center">
                                            {playingId === audio.id ? (
                                                <IoPause className="text-blue-500 mx-auto" />
                                            ) : hasAccess ? (
                                                <IoMusicalNotes className="text-gray-400 mx-auto" />
                                            ) : (
                                                <IoLockClosed className="text-red-500 mx-auto" />
                                            )}
                                        </div>
                                        <div className="ml-4 flex-1">
                                            <h4 className={`font-medium ${hasAccess ? '' : 'text-gray-500'}`}>{audio.title}</h4>
                                        </div>
                                        <span className="text-gray-500 text-sm">{audio.duration}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vault;
