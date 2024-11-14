import { useState, useEffect } from 'react';
import axios from 'axios';

function AdminAudios() {
    const [audioFile, setAudioFile] = useState(null);
    const [audioUrls, setAudioUrls] = useState([]);
    const [uploadStatus, setUploadStatus] = useState('');


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

    return (
        <div className="text-black">

            {/* <h2>Upload Audio</h2>
            <input type="file" accept="audio/*" onChange={handleFileChange} />
            <button onClick={handleFileUpload}>Upload</button>
            <p>{uploadStatus}</p> */}

            <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Upload Audio</h2>

                <div className="flex flex-col items-center">
                    <label className="w-full">
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100 cursor-pointer"
                        />
                    </label>
                    

                    <button
                        onClick={handleFileUpload}
                        className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-300 ease-in-out"
                    >
                        Upload
                    </button>


                    {uploadStatus && (
                        <p className={`mt-4 text-sm ${uploadStatus.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
                            {uploadStatus}
                        </p>
                    )}
                </div>
            </div>


            <div className='mt-10' >

                <div className="grid grid-cols-3 gap-10 ">

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

export default AdminAudios;
