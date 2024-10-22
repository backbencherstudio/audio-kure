import React, { useState } from 'react';
import playButton from '../../assets/images/play_button.png';
import data from "../../../public/sessions.json";

const SessionAudioPlay = ({ setCurrentAudio, playedAudios, setSessionImage, sessions, audioUnlockStates }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSelectedSubCategory(null); // Reset sub-category selection
    };

    const handleSubCategorySelect = (subCategory) => {
        setSelectedSubCategory(subCategory);
    };

    const renderAudios = () => {
        if (!selectedCategory || !selectedSubCategory) return null;
        const audios = data[selectedCategory][selectedSubCategory];

        return (
            <ul className='mt-4'>
                {audios.map((audio, index) => (
                    <li
                        key={audio.id} // Use audio.id as key
                        className={`flex gap-8 justify-between backdrop-blur-md backdrop-brightness-200 p-4 px-8 rounded-2xl mb-4`}
                    >
                        <div className='flex gap-4'>
                            <div>
                                <img src={playButton} alt="" className='w-10 rounded-2xl' />
                            </div>
                            <div className='grid items-center'>
                                <div className='flex gap-1'>
                                    <span className={`text-white ${audioUnlockStates[selectedCategory]?.[selectedSubCategory]?.[index] ? '' : 'line-through'}`}>
                                        {audio.name}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                if (audioUnlockStates[selectedCategory][selectedSubCategory][index]) {
                                    setCurrentAudio(selectedCategory, selectedSubCategory, audio);
                                    setSessionImage(playButton); // Update as needed
                                }
                            }}
                            disabled={!audioUnlockStates[selectedCategory][selectedSubCategory][index]} // Disable button if locked
                        >
                            <div className='p-1 grid items-center'>
                                <img
                                    src={playButton}
                                    alt="Play"
                                    className='w-8 cursor-pointer'
                                />
                            </div>
                        </button>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            {/* Render category buttons */}
            <div className="flex gap-4 mb-4">
                {Object.keys(data).map((category) => (
                    <button
                        key={category}
                        onClick={() => handleCategorySelect(category)}
                        className={`px-4 py-2 w-80 rounded-lg ${selectedCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            {/* Render sub-categories if a category is selected */}
            {selectedCategory && (
                <div className="mb-8 flex justify-between gap-4">
                    {Object.keys(data[selectedCategory]).map((subCategory) => (
                        <div key={subCategory}>
                            <button
                                onClick={() => handleSubCategorySelect(subCategory)}
                                className={`px-4 py-2 rounded-lg w-[19rem] ${selectedSubCategory === subCategory ? 'bg-blue-400 text-white' : 'bg-gray-200 text-black'}`}
                            >
                                {subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}
                            </button>

                            {/* Render audios under selected sub-category */}
                            {selectedSubCategory === subCategory && renderAudios()}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SessionAudioPlay;
