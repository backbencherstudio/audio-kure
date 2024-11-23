import React, { useState } from 'react';
import Logo from '../../shared/Logo';
import hypno from './../../assets/hypno.jpg';
import { useSelector } from 'react-redux';
import { logOut, selectCurrentUser } from '../../redux/fetures/auth/authSlice';
import authApi from '../../redux/fetures/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { FaPlayCircle } from 'react-icons/fa';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const Vault = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const { data: userData } = authApi.useGetSingleUserQuery(currentUser?.email);
    const { data: audioUrls, isLoading } = authApi.useAllAudioPathsQuery();
    const [currentAudio, setCurrentAudio] = useState(null); 
    const [currentAudioName, setCurrentAudioName] = useState('');


    
    const counterValue = parseInt(userData?.data?.selfId) * 100;
    const vault = audioUrls?.vault || [];
    const thresholds = [1000, 3000, 8000, 13000, 20000];

    const unlockedAudios = vault.filter((audio, index) => {
        const thresholdIndex = Math.floor(index / 2);
        return counterValue >= thresholds[thresholdIndex];
    });

    if (isLoading) {
        return (
            <div className="w-full h-[100vh] flex justify-center items-center">
                <p className="text-black text-center text-2xl font-semibold">Loading...</p>
            </div>
        );
    }

    if (!counterValue || counterValue < 1000) {
        navigate('/login');
        dispatch(logOut());
        return null;
    }

    const handleAudioPlay = (audio, name) => {
        setCurrentAudio(audio);
        setCurrentAudioName(name);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative">
            {/* Background Effect */}
            <div className="absolute inset-0 area">
                <ul className="circles">
                    {Array(10)
                        .fill(0)
                        .map((_, i) => (
                            <li key={i}></li>
                        ))}
                </ul>
            </div>

            <div className="relative max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 z-10">
                {/* Header */}
                <div className="mb-6">
                    <Logo />
                </div>

                {/* Content */}
                <div className="flex flex-col lg:flex-row gap-6 rounded-lg overflow-hidden backdrop-blur-md bg-white/10 shadow-xl">
                    {/* Left Section */}
                    <div className="lg:w-1/2">
                        <div className="relative aspect-square lg:aspect-auto lg:h-full">
                            <img
                                src={hypno}
                                alt="Background visual"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="lg:w-1/2 p-6">
                        <div className="bg-zinc-900/80 rounded-lg shadow-md overflow-hidden p-4 space-y-4">
                            <div className="text-center text-2xl font-bold">
                                <h2>Natoc Na Kore Mon Diye Kaj Koro</h2>
                                <p className="text-xl mt-2">Points: {counterValue}</p>
                            </div>

                            {unlockedAudios.length > 0 ? (
                                <div className="space-y-4 overflow-auto h-[400px] custom-scroll">
                                    {unlockedAudios.map((audio) => (
                                        <div
                                            key={audio._id}
                                            className="flex items-center justify-between rounded-lg p-3 shadow-md cursor-pointer hover:bg-zinc-700"
                                            onClick={() => handleAudioPlay(audio.audio, audio.name)}
                                        >
                                            <p className="font-semibold">{audio.name}</p>
                                            <FaPlayCircle size={24} className="text-white" />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-red-400 text-center">
                                    Unlock audios by earning points!
                                </p>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            {currentAudio && (
                <div className="fixed bottom-6 left-1/3 w-1/3 bg-gradient-to-l from-yellow-300 to-cyan-300 text-white p-2 shadow-lg rounded-lg ">
                    <div className=" text-lg font-semibold truncate mb-2">{currentAudioName}</div>
                    <AudioPlayer
                         src={currentAudio}
                         autoPlay
                         showJumpControls={false}
                         layout="horizontal"
                         className="bg-zinc-100 text-white rounded-lg shadow-md"
                    />
                </div>
            )}

        </div>
    );
};

export default Vault;
