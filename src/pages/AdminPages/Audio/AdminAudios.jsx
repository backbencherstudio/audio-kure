import { useState, useEffect } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

function AdminAudios() {
    const [audioFile, setAudioFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [status, setStatus] = useState('');
    const [categoryStatus, setCategoryStatus] = useState('');
    const [audioUrls, setAudioUrls] = useState([]);

    const handleChange = (event) => {
        setStatus(event.target.value);
    };
    const handleCategoryChange = (event) => {
        setCategoryStatus(event.target.value);
    };


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

    // const handleFileUpload = async () => {
    //     if (!audioFile) {
    //         alert('Please select a file to upload');
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append('audio', audioFile);

    //     try {
    //         setUploadStatus('Uploading...');
    //         const response = await axios.post('http://localhost:5000/upload-audio', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });

    //         setUploadStatus('Upload successful!');

    //         const newAudioUrl = `http://localhost:5000${response?.data?.filePath}`;
    //         // setAudioUrls((prevUrls) => [...prevUrls, newAudioUrl]);
    //         setAudioUrls((prevUrls) => [...(prevUrls || []), newAudioUrl]);

    //         if (newAudioUrl) {
    //             await axios.post('http://localhost:5000/path-name', { pathName: newAudioUrl, status, categoryStatus });
    //             // await window.location.reload()
    //         }

    //     } catch (error) {
    //         setUploadStatus('Error uploading file');
    //         console.error('Error:', error);
    //     }
    // };

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
    
            const newAudioUrl = `http://localhost:5000${response.data.filePath}`;
            
            // Explicitly ensure prevUrls is treated as an array
            setAudioUrls((prevUrls) => Array.isArray(prevUrls) ? [...prevUrls, newAudioUrl] : [newAudioUrl]);
            
            // Send additional metadata and refresh audio URLs without reloading the page
            if (newAudioUrl) {
                setUploadStatus('');
                await axios.post('http://localhost:5000/path-name', { pathName: newAudioUrl, status, categoryStatus });
                const updatedAudios = await axios.get('http://localhost:5000/get-path-name');
                setAudioUrls(updatedAudios.data);
            }
    
        } catch (error) {
            setUploadStatus('Error uploading file');
            console.error('Error:', error);
        }
    };


    return (
        <div className="text-black">


            <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Upload Audio</h2>

                <div className="flex flex-col items-center">
                    <label className="w-full">
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={handleFileChange}
                            className="block w-full mb-5 text-sm text-gray-500 border rounded border-gray-400
          file:mr-4 file:py-2 file:px-4
          file:rounded-lg file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100 cursor-pointer"
                        />
                    </label>

                    <FormControl size="small" className='w-full mt-5' >
                        <InputLabel id="demo-select-small-label">Status</InputLabel>
                        <Select
                            className='w-full'
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={status}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"self"}>Self</MenuItem>
                            <MenuItem value={"ego"}>Ego</MenuItem>
                            <MenuItem value={"body"}>Body</MenuItem>
                            <MenuItem value={"mind"}>Mind</MenuItem>
                        </Select>
                    </FormControl>
                    <p className='mt-5' ></p>
                    <FormControl size="small" className='w-full block' >
                        <InputLabel id="demo-select-small-label">Category</InputLabel>
                        <Select
                            className='w-full'
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={categoryStatus}
                            label="Category"
                            onChange={handleCategoryChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={"withMusic"}>With Music</MenuItem>
                            <MenuItem value={"withOutMusic"}>With Out Music</MenuItem>
                        </Select>
                    </FormControl>




                    <button
                        onClick={handleFileUpload}
                        className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-300 ease-in-out"
                    >
                        Upload
                    </button>


                    {uploadStatus && (
                        <p className={`mt-4 text-sm ${uploadStatus?.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
                            {uploadStatus}
                        </p>
                    )}

                </div>
            </div>


            <div className='mt-10 grid grid-cols-4 justify-between gap-10 ' >

                <div className="">
                    <h2>Body</h2>

                    {audioUrls?.body?.map((audioUrl, index) => (
                        <div key={index} className="mb-2" >
                            <audio controls>
                                <source src={audioUrl?.pathName} type="audio/mp3" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    ))}

                </div>

                <div className="">
                    <h2>Mind</h2>

                    {audioUrls?.mind?.map((audioUrl, index) => (
                        <div key={index} className="mb-2" >
                            <audio controls>
                                <source src={audioUrl?.pathName} type="audio/mp3" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    ))}

                </div>

                <div className="">
                    <h2>Self</h2>

                    {audioUrls?.self?.map((audioUrl, index) => (
                        <div key={index} className="mb-2" >
                            <audio controls>
                                <source src={audioUrl?.pathName} type="audio/mp3" />
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    ))}

                </div>

                <div className="">
                    <h2>Ego</h2>

                    {audioUrls?.ego?.map((audioUrl, index) => (
                        <div key={index} className="mb-2" >
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
