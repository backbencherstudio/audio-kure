import React from 'react';
import { Outlet } from 'react-router-dom';
import MainNavbar from './MainComponents/Navbar';
import LeftNavbar from './MainComponents/LeftNavar';

const AudioLayout = () => {
    return (
        <div>
            <MainNavbar></MainNavbar>
            <div className='grid grid-cols-12 gap-10'>
                <div className='col-span-2  '>
                    <LeftNavbar></LeftNavbar>
                </div>
                <div className='col-span-10 border'>
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
}


export default AudioLayout;