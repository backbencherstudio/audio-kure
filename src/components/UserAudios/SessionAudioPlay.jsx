/* eslint-disable react/prop-types */
import  { useState } from 'react';
import playButton from '../../assets/images/play_button.png';

const SessionAudioPlay = ({ setCurrentAudio, playedAudios, setSessionImage, data, audioUnlockStates }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    
    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setSelectedSubCategory(null);
    };

    const handleSubCategorySelect = (subCategory) => {
        setSelectedSubCategory(subCategory);
    };
    
    console.log('audioUnlockStates', audioUnlockStates)
    // if (data?.[category]?.[subCategory] )

    const renderAudios = () => {
        if (!selectedCategory || !selectedSubCategory) return null;
        const audios = data[selectedCategory][selectedSubCategory];

        return (
            <ul className='mt-4'>
                {audios.map((audio, index) => (
                    <li
                        key={audio.id} 
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
                                    setSessionImage(playButton);
                                }
                            }}
                            disabled={!audioUnlockStates[selectedCategory][selectedSubCategory][index]} 
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

                            {selectedSubCategory === subCategory && renderAudios()}
                        </div>
                    ))}

                    
                </div>
            )}
        </div>
    );
}

export default SessionAudioPlay;
