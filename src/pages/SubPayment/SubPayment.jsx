import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

function SubPayment() {
    const [audioUrls, setAudioUrls] = useState([]);
    const [listeningData, setListeningData] = useState({});
    const [currentAudioId, setCurrentAudioId] = useState(null);
    const intervals = useRef({});

    useEffect(() => {
        const fetchAudios = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-path-name');
                setAudioUrls(response.data);
            } catch (error) {
                console.error('Error fetching audios:', error);
            }
        };
        fetchAudios();
    }, []);

    const startListeningInterval = (id, audio) => {
        if (intervals.current[id]) return; 
        setCurrentAudioId(id); 
        intervals.current[id] = setInterval(() => updateListeningTime(id, audio), 1000);
    };

    const clearListeningInterval = (id) => {
        clearInterval(intervals.current[id]);
        intervals.current[id] = null;
    };

    const updateListeningTime = (id, audio) => {
        setListeningData((prevData) => ({
            ...prevData,
            [id]: {
                length: audio.duration,
                listened: (prevData[id]?.listened || 0) + 1,
            },
        }));
    };

    return (
        <div className="text-black">
            <h3>All Audios</h3>
            <div className="grid grid-cols-3 gap-4">
                {audioUrls.map((audio, index) => (
                    <div key={index}>
                        <audio
                            controls
                            onPlay={(e) => startListeningInterval(audio._id, e.target)}
                            onPause={() => clearListeningInterval(audio._id)}
                            onEnded={() => clearListeningInterval(audio._id)}
                        >
                            <source src={audio.pathName} type="audio/mp3" />
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                ))}
            </div>

            {currentAudioId && (
                <div className="mt-10">
                    <h3>Currently Selected Audio Information</h3>
                    <p>Total Length: {Math.round(listeningData[currentAudioId]?.length || 0)}s</p>
                    <p>Listening Time: {Math.round(listeningData[currentAudioId]?.listened || 0)}s</p>
                </div>
            )}

            {
                Math.round(listeningData[currentAudioId]?.length) === Math.round(listeningData[currentAudioId]?.listened) ? <p>Listening Conplete</p> : <p>Not Complete</p>
            }
        </div>
    );
}

export default SubPayment;
