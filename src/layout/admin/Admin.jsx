import { Link, Outlet } from "react-router-dom";

const Admin = () => {
    return (
        <div className="text-black">

            <div className="grid grid-cols-7" >
                <div className="col-span-1 bg-gray-200 " >
                    <div className="flex flex-col  items-center h-[100vh] px-5" >
                        <Link className="mt-5 bg-gray-300 w-full text-center py-1 rounded-md " to="/admin/users" >Users</Link>
                        <Link className="mt-5 bg-gray-300 w-full text-center py-1 rounded-md " to="/admin/audios" >Audios</Link>
                    </div>
                </div>
                <div className="col-span-6 p-5 " > <Outlet /> </div>
            </div>

        </div>
    );
};

export default Admin;