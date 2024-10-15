import React from 'react';
import { Link } from 'react-router-dom';

const MainNavbar = () => {
    return (
        <nav className=" p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className=" "><img className='h-16' src="/logo.png" alt="" /></div>
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/audios" className="text-white hover:text-blue-400">Home</Link>
                    </li>
                    <li>
                        <Link to="/library" className="text-white hover:text-blue-400">Library</Link>
                    </li>
                    <li>
                        <Link to="/playlists" className="text-white hover:text-blue-400">Playlists</Link>
                    </li>

                    <li>
                        <Link to="/about" className="text-white hover:text-blue-400">About</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default MainNavbar;
