import React from 'react';
import { FaHistory, FaStar, FaClock, FaPlay, FaMusic, FaCog, FaSave } from 'react-icons/fa';

const LeftNavbar = () => {
    return (
        <div className='min-h-[80vh] bg-gradient-to-l from-slate-600 to-slate-800 drop-shadow-2xl rounded-3xl p-6'>
            <h4 className='text-3xl font-bold text-green-400 mb-6 text-center'>
                Discover the Greatest Audio Collections
            </h4>
            <ul className='space-y-4'>
                <li className='flex items-center bg-gray-800 rounded-lg p-3 transition-transform duration-300 hover:scale-105 shadow-lg hover:bg-gray-700'>
                    <FaHistory className='mr-3 text-2xl text-green-400' /> Last Played
                </li>
                <li className='flex items-center bg-gray-800 rounded-lg p-3 transition-transform duration-300 hover:scale-105 shadow-lg hover:bg-gray-700'>
                    <FaStar className='mr-3 text-2xl text-green-400' /> Favorite Collections
                </li>
                <li className='flex items-center bg-gray-800 rounded-lg p-3 transition-transform duration-300 hover:scale-105 shadow-lg hover:bg-gray-700'>
                    <FaSave className='mr-3 text-2xl text-green-400' /> Saved Audios
                </li>
                <li className='flex items-center bg-gray-800 rounded-lg p-3 transition-transform duration-300 hover:scale-105 shadow-lg hover:bg-gray-700'>
                    <FaPlay className='mr-3 text-2xl text-green-400' /> Trending Now
                </li>
                <li className='flex items-center bg-gray-800 rounded-lg p-3 transition-transform duration-300 hover:scale-105 shadow-lg hover:bg-gray-700'>
                    <FaMusic className='mr-3 text-2xl text-green-400' /> My Playlists
                </li>
                <li className='flex items-center bg-gray-800 rounded-lg p-3 transition-transform duration-300 hover:scale-105 shadow-lg hover:bg-gray-700'>
                    <FaCog className='mr-3 text-2xl text-green-400' /> Settings
                </li>
            </ul>
        </div>
    );
}

export default LeftNavbar;
