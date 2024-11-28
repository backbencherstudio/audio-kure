import { useState } from "react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import './AllUsersStyle.css';
import { toast } from "react-toastify";
import authApi from "../../../redux/fetures/auth/authApi";
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useSelector } from "react-redux";
import { logOut, selectCurrentUser } from "../../../redux/fetures/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../redux/hooks";

const UsersControl = () => {
    const [status, setStatus] = useState('all');
    const { data, isLoading: userLoading } = authApi.useGetALlUserQuery(status);
    const [sendEmail, { isLoading }] = authApi.useSendEmailMutation();
    const [value, setValue] = useState('');
    const [subject, setSubject] = useState("");
    const [selectedEmails, setSelectedEmails] = useState([]);
    const currentUser = useSelector(selectCurrentUser);
    const navigate = useNavigate()
    const dispatch = useAppDispatch();


    if (currentUser?.email != "bbsfullstack@gmail.com") {
        dispatch(logOut());
        return navigate("/login")
    }

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image', 'video'],
            ['clean']
        ],
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedEmails?.length === 0) {
            return toast.warning("At First Select User")
        }

        const data = { email: selectedEmails, subject, value };
        const res = await sendEmail(data);
        if (res?.data?.success) {
            toast.success(res?.data?.message);
            setValue('');
            setSubject('');
            setSelectedEmails([]);
        }
    };

    const handleClick = (email) => {
        if (selectedEmails.includes(email)) {
            setSelectedEmails(selectedEmails.filter((e) => e !== email));
        } else {
            setSelectedEmails([...selectedEmails, email]);
        }
    };

    const handleSelectAll = () => {
        if (selectedEmails.length === data?.data.length) {
            setSelectedEmails([]);
        } else {
            const allEmails = data?.data.map((item) => item.email);
            setSelectedEmails(allEmails);
        }
    };

    const handleChange = (event) => {
        setStatus(event.target.value);
    };

    return (
        <div>
            <h2 className="text-center py-10 text-4xl">All Users</h2>

            <div className="grid grid-cols-5 w-[1356px] mx-auto gap-10">
                <div className="col-span-2">

                    <div className="flex justify-between gap-10 " >


                        <button
                            onClick={handleSelectAll}
                            className="border rounded px-3 py-[6px] mb-3 text-[17px] font-semibold w-full"
                        >
                            {selectedEmails.length === data?.data.length ? 'Deselect All Users' : 'Select All Users'}
                        </button>

                        <FormControl size="small" className='w-full mt-5 text-black'>
                            <InputLabel className="text-black" id="demo-select-small-label">Status</InputLabel>
                            <Select
                                className='w-full'
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={status}
                                label="Status"
                                onChange={handleChange}
                            >

                                <MenuItem value="all">All</MenuItem>
                                <MenuItem value="subscriber">Subscriber</MenuItem>
                                <MenuItem value="nonSubscriber">Non-Subscriber</MenuItem>
                                <MenuItem value="inactive">In Active</MenuItem>
                            </Select>
                        </FormControl>

                    </div>

                    {
                        userLoading ? <p className="text-xl">Loading...</p> : (
                            <div>
                                {
                                    data?.data.map((item) => (
                                        <div
                                            onClick={() => handleClick(item?.email)}
                                            key={item?._id}
                                            className={`mb-3 p-2 rounded cursor-pointer flex items-center ${selectedEmails.includes(item?.email) ? 'bg-green-200' : 'bg-gray-200'}`}
                                        >
                                            <p className="mr-3">{item.Id}</p>

                                            <div>
                                                <h2 className="font-semibold text-[14px]">{item.name}</h2>
                                                <p className="text-[12px]">{item.email}</p>
                                            </div>

                                        </div>
                                    ))
                                }
                            </div>
                        )
                    }
                </div>

                <div className="col-span-3">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="border mb-3 px-2 py-2 w-full rounded"
                            type="text"
                            placeholder="Subject"
                            onChange={(e) => setSubject(e.target.value)}
                        />

                        <ReactQuill
                            theme="snow"
                            modules={modules}
                            value={value}
                            onChange={setValue}
                        />

                        <div className="mt-3">
                            <button type="submit" className="button w-[120px] flex items-center justify-center py-2 mb-10">
                                {
                                    isLoading ? <CircularProgress /> : "Send"
                                }
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default UsersControl;
