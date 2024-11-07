import { useState, useRef } from 'react';
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
import { useSelector } from 'react-redux';
import { logOut, selectCurrentUser } from '../../redux/fetures/auth/authSlice';
import authApi from '../../redux/fetures/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import data from "../../../public/sessions.json";
import { IoIosMusicalNotes } from "react-icons/io";

const Vault = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [playingId, setPlayingId] = useState(null);
    const audioRef = useRef(null);
    const [openDropdown, setOpenDropdown] = useState(1);

    // Get current user and data
    const currentUser = useSelector(selectCurrentUser);
    const { data: userData } = authApi.useGetSingleUserQuery(currentUser?.email);

    const selfAudioId = userData?.data?.selfId === "end" ? "end" : parseInt(userData?.data?.selfId);
    const egoAudioId = userData?.data?.egoId === "end" ? "end" : parseInt(userData?.data?.egoId);
    const bodyAudioId = userData?.data?.bodyId === "end" ? "end" : parseInt(userData?.data?.bodyId);
    const mindAudioId = userData?.data?.mindId === "end" ? "end" : parseInt(userData?.data?.mindId);

    // Get category lengths
    const self = data?.emotional?.self;
    const ego = data?.emotional?.ego;
    const body = data?.physical?.body;
    const miend = data?.physical?.mind;

    // Calculate total count and counter value
    const count = (selfAudioId === "end" ? self?.length : selfAudioId) +
        (egoAudioId === "end" ? ego?.length : egoAudioId) +
        (bodyAudioId === "end" ? body?.length : bodyAudioId) +
        (mindAudioId === "end" ? miend?.length : mindAudioId);

    const counterValue = parseInt(count) * 100;
    const plan = parseFloat(userData?.data?.plan);

    const audioDropdowns = [
        {
            id: 1,
            title: "LEVEL 1: Building Healthy Habits",
            threshold: 1000,
            audios: [
                { id: 1, title: "Summer Breeze", audioSrc: audio1 },
                { id: 2, title: "Midnight Jazz", audioSrc: audio2 }
            ]
        },
        {
            id: 2,
            title: "LEVEL 2: Strengthening the Habit",
            threshold: 3000,
            audios: [
                { id: 3, title: "Ocean Waves", audioSrc: audio3 },
                { id: 4, title: "City Lights", audioSrc: audio4 }
            ]
        },
        {
            id: 3,
            title: "LEVEL 3: Expanding the Habit",
            threshold: 8000,
            audios: [
                { id: 5, title: "Mountain Echo", audioSrc: audio5 },
                { id: 6, title: "Desert Wind", audioSrc: audio6 }
            ]
        },
        {
            id: 4,
            title: "LEVEL 4: Mastering Consistency",
            threshold: 13000,
            audios: [
                { id: 7, title: "Forest Rain", audioSrc: audio7 },
                { id: 8, title: "Starry Night", audioSrc: audio8 }
            ]
        },
        {
            id: 5,
            title: "LEVEL 5: Transformation",
            threshold: 200000,
            audios: [
                { id: 9, title: "Morning Sun", audioSrc: audio9 },
                { id: 10, title: "Evening Calm", audioSrc: audio10 },
                { id: 11, title: "Night Peace", audioSrc: audio10 }
            ]
        }
    ];

    const handleAudioSelect = (e, dropdown) => {
        const selectedAudio = dropdown.audios.find(
            audio => audio.id === parseInt(e.target.value)
        );
        if (selectedAudio) {
            handlePlay(selectedAudio);
        }
    };

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

    // Loading state
    if (!counterValue) {
        return (
            <div className='w-full h-[100vh] flex justify-center items-center'>
                <p className='text-black text-center text-2xl font-semibold'>Loading...</p>
            </div>
        );
    }

    if (counterValue < 1000 || plan !== 365) {
        navigate("/login");
        dispatch(logOut());
        return null;
    }
    const toggleDropdown = (id) => {
        setOpenDropdown((prev) => (prev === id ? null : id));
    }
    return (
        <div>
            <div className="area">
                <ul className="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            <div className="max-w-7xl mx-auto">
                <div className="mb-6">
                    <Logo />
                </div>
                <div className="flex flex-col lg:flex-row gap-6 rounded-lg overflow-hidden backdrop-blur-md bg-white/20">
                    <div className="lg:w-1/2">
                        <div className="relative aspect-square lg:aspect-auto lg:h-full">
                            <img
                                src={hypno}
                                alt="Background visual"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="lg:w-1/2 p-4">
                        <div className="bg-zinc-800/50 rounded-lg shadow-xl overflow-hidden">
                            <div className="border-b border-zinc-700 p-4">
                                <h3 className="text-xl font-semibold flex items-center text-zinc-100">
                                    <IoMusicalNotes className="mr-2 text-yellow-500 text-2xl" />
                                    Special Audio Files
                                    <span className="ml-auto text-sm">Progress: {counterValue}</span>
                                </h3>
                            </div>

                            <div className='flex  flex-col  justify-between'>
                                <div className="p-4 space-y-4 h-[500px] overflow-auto custom-scroll ">
                                    {audioDropdowns.map((dropdown) => (
                                        <div key={dropdown.id} className="relative">
                                            <div
                                                className={`w-full p-6 flex items-center justify-between rounded-lg bg-zinc-700 text-zinc-100 cursor-pointer ${counterValue >= dropdown.threshold ? 'hover:bg-zinc-600' : 'opacity-50 cursor-'}`}
                                                onClick={() => counterValue >= dropdown.threshold && toggleDropdown(dropdown.id)}
                                            >
                                                <span>
                                                    {counterValue >= dropdown.threshold
                                                        ? `${dropdown.title} - Select Audio`
                                                        : `${dropdown.title} (Unlocks at ${dropdown.threshold})`}
                                                </span>
                                                {/* Playing Icon */}
                                                {playingId && dropdown.audios.some(a => a.id === playingId) && (
                                                    <div>
                                                        <IoPause className="text-teal-400 text-xl" />
                                                    </div>
                                                )}
                                            </div>

                                            {openDropdown === dropdown.id && (
                                                <div className="mt-2 bg-zinc-800 p-4 rounded-lg space-y-2">
                                                    {dropdown.audios.map((audio) => (
                                                        <button
                                                            key={audio.id}
                                                            onClick={() => handleAudioSelect({ target: { value: audio.id } }, dropdown)}
                                                            className={`flex items-center gap-5 w-full text-left p-2 rounded transition-colors duration-200 ${playingId === audio.id ? 'bg-teal-500 text-white' : 'bg-zinc-700 text-zinc-100 hover:bg-zinc-600'}`}
                                                        ><IoIosMusicalNotes />
                                                            {audio.title} {playingId === audio.id ? '(Playing)' : ''}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <audio
                                    ref={audioRef}
                                    controls
                                    className="w-full max-w-lg m-4 mx-auto"
                                    controlsList="nodownload"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Vault;