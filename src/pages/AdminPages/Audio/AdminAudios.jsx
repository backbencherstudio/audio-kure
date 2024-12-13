import { useState } from 'react';
import axios from 'axios';
import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import authApi from '../../../redux/fetures/auth/authApi';
import { CiEdit } from 'react-icons/ci';
import { TiDeleteOutline } from 'react-icons/ti';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../redux/hooks';
import { logOut, selectCurrentUser } from '../../../redux/fetures/auth/authSlice';
import { useSelector } from 'react-redux';
import { MdDeleteForever } from 'react-icons/md';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

function AdminAudios() {
    const [audioFile, setAudioFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [status, setStatus] = useState('');
    const [categoryStatus, setCategoryStatus] = useState('');
    const [showCategoryStatus, setShowCategoryStatus] = useState("withMusic");
    const { data: audioUrls, refetch } = authApi.useAllAudioPathsQuery({ showCategoryStatus });
    const [updateAudioPaths] = authApi.useUpdateAudioPathsMutation()
    const [name, setAudioTitle] = useState("");
    const [getId, setGetId] = useState("")
    const [removeAudios] = authApi.useRemoveAudiosMutation()

    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    if (currentUser?.email != "mybesthealer@gmail.com") {
        dispatch(logOut());
        return navigate("/login")
    }

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setCategoryStatus(event.target.value);
    };

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
            const response = await axios.post('https://admin.hypno4u.com/upload-audio', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const newAudioUrl = `https://admin.hypno4u.com${response.data.filePath}`;
            setUploadStatus('Update successful');
            if (newAudioUrl) {

                // ================================== For Update Audio
                if (getId) {
                    await updateAudioPaths({ audio: newAudioUrl, category: status, categoryStatus, name, getId })
                    await window.location.reload()
                    refetch();
                    setAudioFile(null);
                    setStatus('');
                    setCategoryStatus('');
                    setUploadStatus('');
                    setAudioTitle('');
                }
                // ================================== For New Audio Upload
                if (!getId) {
                    await axios.post('https://admin.hypno4u.com/path-name', { audio: newAudioUrl, category: status, categoryStatus, name });
                    refetch();
                    setAudioFile(null);
                    setStatus('');
                    setCategoryStatus('');
                    setUploadStatus('');
                    setAudioTitle('');
                }
            }

        } catch (error) {
            setUploadStatus('Error uploading file');
            console.error('Error:', error);
        }
    };

    const deleteFun = async (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await removeAudios(item?._id);                
                if (res?.data?.message) {
                    toast.success(res?.data.message)
                }
            }
        });
    }

    return (
        <div className="text-black">
            <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto mt-10">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Upload Audio</h2>
                <div className={`flex flex-col items-center border rounded-lg ${getId && "border border-green-400 bg-green-50 "} p-2 duration-300 `}>
                    <label className="w-full">
                        <input
                            type="file"
                            accept="audio/*"
                            onChange={handleFileChange}
                            className="block w-full mb-5 text-sm text-gray-500 border rounded border-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                        />
                    </label>

                    <FormControl size="small" className='w-full mt-5'>
                        <InputLabel id="demo-select-small-label">Status</InputLabel>
                        <Select
                            className='w-full'
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={status}
                            label="Status"
                            onChange={handleChange}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value="body">Body</MenuItem>
                            <MenuItem value="mind">Mind</MenuItem>
                            <MenuItem value="self">Self</MenuItem>
                            <MenuItem value="ego">Ego</MenuItem>
                            <MenuItem value="vault">Vault</MenuItem>
                            <MenuItem value="intro">Intro</MenuItem>
                        </Select>
                    </FormControl>

                    <p className='mb-5' ></p>

                    <FormControl size="small" className='w-full mt-5'>
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
                            <MenuItem value="withMusic">With Music</MenuItem>
                            <MenuItem value="withOutMusic">Without Music</MenuItem>
                            <MenuItem value="valutMix ">Vault (Mix) </MenuItem>
                            <MenuItem value="introMix ">Intro (Mix) </MenuItem>
                        </Select>
                    </FormControl>

                    <p className='mb-5' ></p>

                    <TextField
                        onChange={(e) => setAudioTitle(e.target.value)}
                        value={name}
                        size='small'
                        className='w-full'
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                    />

                    {uploadStatus ? (
                        <p className={`mt-4 text-sm ${uploadStatus.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>
                            {uploadStatus}
                        </p>
                    ) : <p className='mt-4 text-sm' ></p>}

                    <button
                        onClick={handleFileUpload}
                        className="w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-700 transition duration-300 ease-in-out"
                    >
                        Upload
                    </button>
                </div>
            </div>

            <div className='flex items-center' >
                <button className={`border rounded-full px-4 py-2 mr-4 font-semibold duration-300 ${showCategoryStatus === "withMusic" ? "bg-green-200" : ""}`} onClick={() => setShowCategoryStatus("withMusic")}>With Music</button>
                <button className={`border rounded-full px-4 py-2 mr-4 font-semibold duration-300 ${showCategoryStatus === "withOutMusic" ? "bg-green-200" : ""}`} onClick={() => setShowCategoryStatus("withOutMusic")}>Without Music</button>
                <button className={`border rounded-full px-4 py-2 mr-4 font-semibold duration-300 ${showCategoryStatus === "valutMix" ? "bg-green-200" : ""}`} onClick={() => setShowCategoryStatus("valutMix")}>Vault + Intro </button>
                {
                    getId.length > 0 &&
                    <button className='' onClick={() => setGetId("")} > <TiDeleteOutline className='text-[32px] text-red-500 ' /> </button>
                }
            </div>

            {
                showCategoryStatus != "valutMix" ?
                    <div className='grid grid-cols-4 gap-10 my-10' >

                        <div>
                            <h2 className='text-xl font-semibold'  >Body  </h2>

                            <div className='bg-slate-50 rounded-2xl overflow-hidden ' >
                                <div className='p-5 max-h-[600px] overflow-y-scroll ' >
                                    {
                                        audioUrls?.body?.map((item, index) => (

                                            <div key={item._id} className={`mb-5 flex items-center shadow-md justify-between rounded-full pl-4 p-1
                                             ${getId === item._id && "bg-green-200"} duration-300 relative `}>

                                                <span className='text-black' > {index + 1}</span>
                                                <button className=' mx-2' onClick={() => setGetId(item._id)} > <CiEdit className='text-xl' /> </button>
                                                <button className=' mx-2' onClick={() => deleteFun(item)} > <MdDeleteForever className='text-xl' /> </button>

                                                <audio controls>
                                                    <source src={item?.audio} type="audio/mp3" />
                                                    Your browser does not support the audio element.
                                                </audio>

                                                <h2 className=' absolute -top-[2%] right-5 bg-gray-600 text-white rounded-full px-2 text-[12px] ' >
                                                    {item?.name.length > 20 ? item?.name.substring(0, 20) + "..." : item?.name}
                                                </h2>

                                            </div>

                                        ))
                                    }
                                </div>
                            </div>

                        </div>
                        <div>
                            <h2 className='text-xl font-semibold' >Mind </h2>

                            <div className='bg-slate-50 rounded-2xl overflow-hidden ' >
                                <div className='p-5 max-h-[600px] overflow-y-scroll ' >
                                    {
                                        audioUrls?.mind?.map((item, index) => (
                                            <div key={item._id} className={`mb-5 flex items-center shadow-md justify-between rounded-full pl-4 p-1
                                                ${getId === item._id && "bg-green-200"} duration-300 relative `}>

                                                <span className='text-black' > {index + 1}</span>
                                                <button className=' mx-2' onClick={() => setGetId(item._id)} > <CiEdit className='text-xl' /> </button>
                                                <button className=' mx-2' onClick={() => deleteFun(item)} > <MdDeleteForever className='text-xl' /> </button>
                                                <audio controls>
                                                    <source src={item?.audio} type="audio/mp3" />
                                                    Your browser does not support the audio element.
                                                </audio>

                                                <h2 className=' absolute -top-[2%] right-5 bg-gray-600 text-white rounded-full px-2 text-[12px] ' >
                                                    {item?.name.length > 20 ? item?.name.substring(0, 20) + "..." : item?.name}
                                                </h2>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className='text-xl font-semibold' >Self</h2>

                            <div className='bg-slate-50 rounded-2xl overflow-hidden ' >
                                <div className='p-5 max-h-[600px] overflow-y-scroll ' >
                                    {
                                        audioUrls?.self?.map((item, index) => (
                                            <div key={item._id} className={`mb-5 flex items-center shadow-md justify-between rounded-full pl-4 p-1
                                                ${getId === item._id && "bg-green-200"} duration-300 relative `}>

                                                <span className='text-black' > {index + 1}</span>
                                                <button className=' mx-2' onClick={() => setGetId(item._id)} > <CiEdit className='text-xl' /> </button>
                                                <button className=' mx-2' onClick={() => deleteFun(item)} > <MdDeleteForever className='text-xl' /> </button>
                                                <audio controls>
                                                    <source src={item?.audio} type="audio/mp3" />
                                                    Your browser does not support the audio element.
                                                </audio>

                                                <h2 className=' absolute -top-[2%] right-5 bg-gray-600 text-white rounded-full px-2 text-[12px] ' >
                                                    {item?.name.length > 20 ? item?.name.substring(0, 20) + "..." : item?.name}
                                                </h2>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            <h2 className='text-xl font-semibold' >Ego</h2>

                            <div className='bg-slate-50 rounded-2xl overflow-hidden ' >
                                <div className='p-5 max-h-[600px] overflow-y-scroll ' >
                                    {
                                        audioUrls?.ego?.map((item, index) => (
                                            <div key={item._id} className={`mb-5 flex items-center shadow-md justify-between rounded-full pl-4 p-1
                                                ${getId === item._id && "bg-green-200"} duration-300 relative `}>

                                                <span className='text-black' > {index + 1}</span>
                                                <button className=' mx-2' onClick={() => setGetId(item._id)} > <CiEdit className='text-xl' /> </button>
                                                <button className=' mx-2' onClick={() => deleteFun(item)} > <MdDeleteForever className='text-xl' /> </button>
                                                <audio controls>
                                                    <source src={item?.audio} type="audio/mp3" />
                                                    Your browser does not support the audio element.
                                                </audio>

                                                <h2 className=' absolute -top-[2%] right-5 bg-gray-600 text-white rounded-full px-2 text-[12px] ' >
                                                    {item?.name.length > 20 ? item?.name.substring(0, 20) + "..." : item?.name}
                                                </h2>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>


                    </div>
                    :
                    <div className='mt-10  flex gap-10 '>

                        <div>
                            <h2 className='text-xl font-semibold' >Vault</h2>

                            <div className='bg-slate-50 rounded-2xl overflow-hidden ' >
                                <div className='p-5 max-h-[600px] overflow-y-scroll ' >

                                    {
                                        audioUrls?.vault?.map((item, index) => (
                                            <div key={item._id} className={`mb-5 flex items-center shadow-md justify-between rounded-full pl-4 p-1
                                            ${getId === item._id && "bg-green-200"} duration-300 relative `}>

                                                <span className='text-black' > {index + 1}</span>
                                                <button className=' mx-2' onClick={() => setGetId(item._id)} > <CiEdit className='text-xl' /> </button>
                                                <button className=' mx-2' onClick={() => deleteFun(item)} > <MdDeleteForever className='text-xl' /> </button>
                                                <audio controls>
                                                    <source src={item?.audio} type="audio/mp3" />
                                                    Your browser does not support the audio element.
                                                </audio>

                                                <h2 className=' absolute -top-[2%] right-5 bg-gray-600 text-white rounded-full px-2 text-[12px] ' >
                                                    {item?.name.length > 20 ? item?.name.substring(0, 20) + "..." : item?.name}
                                                </h2>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                        <div>
                            <h2 className='text-xl font-semibold' >Intro</h2>

                            <div className='bg-slate-50 rounded-2xl overflow-hidden  ' >
                                <div className='p-5 max-h-[600px] overflow-y-scroll ' >

                                    {
                                        audioUrls?.intro?.map((item, index) => (
                                            <div key={item._id} className={`mb-5 flex items-center shadow-md justify-between rounded-full pl-4 p-1
                                            ${getId === item._id && "bg-green-200"} duration-300 relative `}>
                                                <span className='text-black' > {index + 1}</span>
                                                <button className=' mx-2' onClick={() => setGetId(item._id)} > <CiEdit className='text-xl' /> </button>
                                                <button className=' mx-2' onClick={() => deleteFun(item)} >  <MdDeleteForever className='text-xl' /> </button>
                                                <audio controls>
                                                    <source src={item?.audio} type="audio/mp3" />
                                                    Your browser does not support the audio element.
                                                </audio>
                                                <h2 className=' absolute -top-[2%] right-5 bg-gray-600 text-white rounded-full px-2 text-[12px] ' >
                                                    {item?.name.length > 20 ? item?.name.substring(0, 20) + "..." : item?.name}
                                                </h2>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
            }

        </div>
    );
}

export default AdminAudios;
