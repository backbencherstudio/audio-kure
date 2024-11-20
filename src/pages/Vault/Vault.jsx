import Logo from '../../shared/Logo';
import hypno from './../../assets/hypno.jpg';
import { useSelector } from 'react-redux';
import { logOut, selectCurrentUser } from '../../redux/fetures/auth/authSlice';
import authApi from '../../redux/fetures/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
// import data from "../../../public/sessions.json";

const Vault = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const currentUser = useSelector(selectCurrentUser);
    const { data: userData } = authApi.useGetSingleUserQuery(currentUser?.email);
    const { data: audioUrls, isLoading } = authApi.useAllAudioPathsQuery();

    const counterValue = parseInt(userData?.data?.selfId) * 100;
    const vault = audioUrls?.vault



    if (!counterValue || isLoading) {
        return (
            <div className='w-full h-[100vh] flex justify-center items-center'>
                <p className='text-black text-center text-2xl font-semibold'>Loading...</p>
            </div>
        );
    }

    if (counterValue < 1000) {
        navigate("/login");
        dispatch(logOut());
        return null;
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

                <div>
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
                            <div className="bg-zinc-800/50 rounded-lg shadow-xl overflow-hidden p-2">

                                <div className='text-center text-2xl' >
                                    <h2>Natoc Na Kore Mon Diye Kaj Koro</h2>
                                </div>

                                {
                                    vault?.map(item => <h2 key={item._id} >{item.name}</h2>)
                                }

                            </div>
                        </div>
                    </div>                  


                </div>


            </div>

        </div>
    );
};

export default Vault;