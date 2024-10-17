import React, { useState } from 'react'
import "../../layout/layout.css"
import { FaRegUser } from 'react-icons/fa'
import CureSessions from '../../components/UserAudios/CureSessions';

const DailyAudios = () => {
    const [isOpen, setIsOpen] = useState();

    const handleDropdown = () => {
        setIsOpen(!isOpen);
    }

  return (
    <div className='area overflow-y-scroll'>
    <div className='container mx-auto'>
      <div className='relative'>
        <div className='grid justify-end my-4 mx-4'>
          <button onClick={handleDropdown}>
            <FaRegUser className='text-2xl' />
          </button>
        </div>
        {isOpen && (
          <div className="absolute right-4 w-24 bg-[#4937af] rounded-md shadow-lg py-2 
                          ring-1 ring-black ring-opacity-5 transition transform 
                          ease-out duration-300 origin-top-right z-10">
            <a href="#" className="block px-4 py-2 text-sm text-[#dbd1fb] hover:bg-gray-100 hover:text-[#42358b]">
              Profile
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-[#dbd1fb] hover:bg-gray-100 hover:text-[#42358b]">
              Settings
            </a>
            <a href="#" className="block px-4 py-2 text-sm text-[#dbd1fb] hover:bg-gray-100 hover:text-[#42358b]">
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
      <CureSessions />
  </div>
  )
}

export default DailyAudios