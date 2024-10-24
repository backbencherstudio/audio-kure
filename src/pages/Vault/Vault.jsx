import React, { useState, useRef } from 'react';
import { IoMusicalNotes, IoPause } from "react-icons/io5";
import Logo from '../../shared/Logo';
import hypno from './../../assets/hypno.jpg';
import audio1 from './../../assets/audios/audio1.mp3';
import audio2 from './../../assets/audios/audio2.mp3';
import audio3 from './../../assets/audios/audio3.mp3';
import audio4 from './../../assets/audios/audio4.mp3';
import audio5 from './../../assets/audios/audio5.mp3';
import audio6 from './../../assets/audios/audio6.mp3';
import audio7 from './../../assets/audios/audio7.mp3';
import audio8 from './../../assets/audios/audio8.mp3';
import audio9 from './../../assets/audios/audio9.mp3';
import audio10 from './../../assets/audios/audio10.mp3';

const Vault = () => {
    const [playingId, setPlayingId] = useState(null);
    const audioRef = useRef(null);
    const audioFiles = [
        {
            id: 1,
            title: "Summer Breeze",
            audioSrc: audio1
        },
        {
            id: 2,
            title: "Midnight Jazz",
            audioSrc: audio2
        },
        {
            id: 3,
            title: "Ocean Waves",
            audioSrc: audio3
        },
        {
            id: 4,
            title: "City Lights",
            audioSrc: audio4
        },
        {
            id: 5,
            title: "Mountain Echo",
            audioSrc: audio5
        },
        {
            id: 6,
            title: "Desert Wind",
            audioSrc: audio6
        },
        {
            id: 7,
            title: "Forest Rain",
            audioSrc: audio7
        },
        {
            id: 8,
            title: "Starry Night",
            audioSrc: audio8
        },
        {
            id: 9,
            title: "Morning Sun",
            audioSrc: audio9
        },
        {
            id: 11,
            title: "Evening Calm",
            audioSrc: audio10
        },
        {
            id: 12,
            title: "Evening Calm",
            audioSrc: audio10
        },
        {
            id: 13,
            title: "Evening Calm",
            audioSrc: audio10
        }
    ];

    const handlePlay = (audioFile) => {
        if (playingId === audioFile.id) {
            audioRef.current.pause();
            setPlayingId(null);
        } else {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = audioFile.audioSrc;
                audioRef.current.play();
                audioRef.current.onended = () => setPlayingId(null);
            }
            setPlayingId(audioFile.id);
        }
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const handleDurationChange = () => {
        setDuration(audioRef.current.duration);
    };

    const handleSeek = (event) => {
        const newTime = event.target.value;
        audioRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    };

    return (
        <div className="">
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 sm:mb-8">
                    <Logo />
                </div>
                <div className="flex flex-col lg:flex-row gap-6 rounded-lg overflow-hidden backdrop-blur-md backdrop-brightness-200">
                    <div className="lg:w-1/2">
                        <div className="relative aspect-square lg:aspect-auto lg:h-full">
                            <img
                                src={hypno}
                                alt="Background visual"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="lg:w-1/2 p-4 sm:p-6">
                        <div className="bg-zinc-800/50 rounded-lg shadow-xl overflow-hidden">
                            <div className="border-b border-zinc-700">
                                <h3 className="text-lg sm:text-xl font-semibold p-4 flex items-center text-zinc-100">
                                    <IoMusicalNotes className="mr-2 text-yellow-500 text-xl sm:text-2xl" />
                                    Spatial Audio Files
                                </h3>
                            </div>

                            <div className="lg:max-h-[calc(90vh-280px)] overflow-y-auto custom-scroll">
                                {audioFiles.map((audio) => (
                                    <div
                                        key={audio.id}
                                        onClick={() => handlePlay(audio)}
                                        className={`flex items-center p-4 cursor-pointer transition-all hover:bg-zinc-700/50 
                                            ${playingId === audio.id ? 'bg-zinc-700/80' : ''} 
                                            border-b border-zinc-700/50 last:border-b-0`}
                                    >
                                        <div className="flex items-center flex-1 min-w-0">
                                            <div className="w-8 flex-shrink-0">
                                                {playingId === audio.id ? (
                                                    <IoPause className="text-blue-400 text-xl mx-auto" />
                                                ) : (
                                                    <IoMusicalNotes className="text-zinc-400 text-xl mx-auto" />
                                                )}
                                            </div>
                                            <div className="ml-4 flex-1 min-w-0">
                                                <h4 className="font-medium text-zinc-100 truncate">
                                                    {audio.title}
                                                </h4>
                                            </div>
                                            
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <audio
                                ref={audioRef}
                                onTimeUpdate={handleTimeUpdate}
                                onLoadedMetadata={handleDurationChange}
                                controls
                                className="w-96 m-2 mx-auto "
                                controlsList="nodownload"
                            />


                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vault;
