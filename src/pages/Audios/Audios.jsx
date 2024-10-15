import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavbar from './MainComponents/Navbar';
import LeftNavbar from './MainComponents/LeftNavar';
const AudioLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <MainNavbar />
            <div className="flex flex-grow gap-10">
                <div className="w-1/4 bg-gradient-to-b from-slate-600 to-slate-800 p-6 shadow-lg rounded-r-2xl">
                    <LeftNavbar />
                </div>
                <div className="flex-grow x-6  shadow-lg rounded-l-2xl  rounded-xl">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default AudioLayout;
