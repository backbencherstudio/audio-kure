import { useState, useEffect } from 'react';
import axios from 'axios';

function SubPayment() {
    const [audioFile, setAudioFile] = useState(null);
    const [audioUrls, setAudioUrls] = useState([]);
    const [uploadStatus, setUploadStatus] = useState('');

    // Load all uploaded audios from the backend when the page is loaded
    useEffect(() => {
        const fetchAudios = async () => {
            try {
                const response = await axios.get('http://localhost:5000/get-path-name');
                setAudioUrls(response.data); // Set the fetched audio URLs
            } catch (error) {
                console.error('Error fetching audios:', error);
            }
        };

        fetchAudios();
    }, []); // Empty dependency array means this effect runs only once when the component mounts

    const handleFileChange = (e) => {
        setAudioFile(e.target.files[0]);
    };

    const handleFileUpload = async () => {
        if (!audioFile) {
            alert('Please select a file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('audio', audioFile);

        try {
            setUploadStatus('Uploading...');
            const response = await axios.post('http://localhost:5000/upload-audio', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUploadStatus('Upload successful!');
            console.log('File uploaded:', response.data);

            // Update audio URLs state after successful upload
            const newAudioUrl = `http://localhost:5000${response.data.filePath}`;
            setAudioUrls((prevUrls) => [...prevUrls, newAudioUrl]);

            if (newAudioUrl) {
                await axios.post('http://localhost:5000/path-name', { pathName: newAudioUrl });
                await window.location.reload()
            }

        } catch (error) {
            setUploadStatus('Error uploading file');
            console.error('Error:', error);
        }
    };

    console.log(audioUrls);


    return (
        <div className="text-black">
            <h2>Upload Audio</h2>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
            <p>{uploadStatus}</p>

            {/* Display all uploaded audios */}
            <div>
                <h3>Uploaded Audios</h3>
                <div className="grid grid-cols-3">
                    {audioUrls.map((audioUrl, index) => (
                        <div key={index}>
                            <audio controls>
                                <source src={audioUrl?.pathName} type="audio/mp3" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default SubPayment;
