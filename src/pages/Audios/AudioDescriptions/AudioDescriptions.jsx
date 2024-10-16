import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const AudioDescriptions = () => {
    const { id } = useParams(); // Get the id from the URL
    const [audioData, setAudioData] = useState(null); // State to hold fetched audio data
    const [loading, setLoading] = useState(true); // Loading state
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal open/close state

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.json');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                const audioEntry = data.find(item => item.id === parseInt(id));
                console.log('Fetched audio entry:', audioEntry); // Debugging line
                setAudioData(audioEntry);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!audioData) {
        return <div>No audio found for this ID.</div>;
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
 
    const audioSource = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";


    return (
        <div className="audio-description p-4 bg-gray-900 text-white rounded-lg w-fit shadow-lg">
            <h1 className="text-3xl font-bold">{audioData.title}</h1>
            <h2 className="text-lg mt-2">{audioData.therapist}</h2>
            <img src={audioData.thumbnail} alt={audioData.title} className="w-fit mt-4 rounded-md" />
            <p className="mt-4">{audioData.description}</p>
            <p className="mt-2">Duration: {audioData.duration}</p>
            <p className="mt-2">Release Date: {audioData.release_date}</p>
            <button
                onClick={openModal}
                className="mt-4 inline-block text-blue-400 hover:underline"
            >
                Listen Now
            </button>

            {isModalOpen && (
                <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-content bg-gray-800 p-5 rounded-lg shadow-lg">
                        <button onClick={closeModal} className="text-red-500 float-right">
                            Close
                        </button>
                        <h2 className="text-xl font-bold mb-4">Now Playing: {audioData.title}</h2>
                        <audio controls>
                            <source src={audioSource} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AudioDescriptions;
