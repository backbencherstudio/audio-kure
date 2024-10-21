import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import sessionImg from '../../assets/images/cure_session.png';
import audio1 from '../../assets/audios/audio1.mp3';
import audio2 from '../../assets/audios/audio2.mp3';
import audio3 from '../../assets/audios/audio3.mp3';
import audio4 from '../../assets/audios/audio4.mp3';
import audio5 from '../../assets/audios/audio5.mp3';
import audio6 from '../../assets/audios/audio6.mp3';
import audio7 from '../../assets/audios/audio7.mp3';
import audio8 from '../../assets/audios/audio8.mp3';
import audio9 from '../../assets/audios/audio9.mp3';
import audio10 from '../../assets/audios/audio10.mp3';
import 'swiper/css';
import './CureSessions.css';
import daysData from './days.json';
import Sessions from './Sessions';

const CureSessions = ({ currentUser }) => {
  const [selectedDay, setSelectedDay] = useState(1); // Start with Day 1
  const [playedAudios, setPlayedAudios] = useState({});
  const user = true; // Example, set to true to allow interaction

  const sessions = [
    {
      id: 1,
      title: "Introduction",
      image: sessionImg,
      audios: [audio1, audio2],
    },
    {
      id: 2,
      title: "Understanding",
      image: sessionImg,
      audios: [audio3, audio4],
    },
    {
      id: 3,
      title: "Awareness",
      image: sessionImg,
      audios: [audio5, audio6],
    },
    {
      id: 4,
      title: "Smooth",
      image: sessionImg,
      audios: [audio7, audio8],
    },
    {
      id: 5,
      title: "Refreshment",
      image: sessionImg,
      audios: [audio9, audio10],
    },
    {
      id: 6,
      title: "Motivated",
      image: sessionImg,
      audios: [audio5, audio6],
    },
    {
      id: 7,
      title: "Awareness",
      image: sessionImg,
      audios: [audio5, audio6],
    },
    {
      id: 8,
      title: "Awareness",
      image: sessionImg,
      audios: [audio5, audio6],
    },
    {
      id: 9,
      title: "Awareness",
      image: sessionImg,
      audios: [audio5, audio6],
    },
    {
      id: 10,
      title: "Awareness",
      image: sessionImg,
      audios: [audio5, audio6],
    },
  ];
console.log('currentUser', currentUser)
  useEffect(() => {
    const savedPlayedAudios = JSON.parse(localStorage.getItem('playedAudios')) || {};
    // Ensure each entry is an array
    Object.keys(savedPlayedAudios).forEach(key => {
      if (!Array.isArray(savedPlayedAudios[key])) {
        savedPlayedAudios[key] = []; // Default to empty array if not an array
      }
    });
    
    setPlayedAudios(savedPlayedAudios);
  }, []);

  const handleDaySelection = (day) => {
    setSelectedDay(day);
  };

  const isDayUnlocked = (day) => {
    const createdDate = new Date(currentUser?.createdAt);
    const currentDate = new Date();

    // Calculate how many days have passed since the created date
    const elapsedTime = Math.floor((currentDate - createdDate) / (1000 * 60 * 60 * 24));

    // Unlock days that match or are less than the elapsed time (i.e., days that should be available based on subscription period)
    return day <= elapsedTime + 1; // `+1` because Day 1 is counted from Day 0
  };

  // Calculate total days based on subscription
  const getTotalDays = (createdAt, expiresDate) => {
    const createdDate = new Date(createdAt);
    const expirationDate = new Date(expiresDate);
    const diffTime = Math.abs(expirationDate - createdDate);
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return totalDays;
  };

  // Assuming `currentUser` has `createdAt` and `expiresDate` properties
  const totalDays = getTotalDays(currentUser?.createdAt, currentUser?.expiresDate);
  const daysData = Array.from({ length: totalDays }, (_, index) => ({ day: index + 1 }));
  const calculatedDays = daysData.slice(0, -1);

return (
  <div className={`${user === false && 'cursor-not-allowed opacity-50'}`}>
    <div className='max-w-7xl mx-4 md:mx-auto'>
      <div className='text-4xl md:text-6xl text-[#dbd1fb]'>Hey {currentUser?.name}!</div>
      <p className='text-[#b0a3f8] my-2 md:my-4'>You are deeply capable of reaching 199 lb</p>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        slidesPerGroup={1}
        breakpoints={{
          640: { slidesPerView: 4, spaceBetween: 5, slidesPerGroup: 1 },
          768: { slidesPerView: 6, spaceBetween: 5, slidesPerGroup: 1 },
          1024: { slidesPerView: 8, spaceBetween: 5, slidesPerGroup: 1 },
          1280: { slidesPerView: 10, spaceBetween: 5, slidesPerGroup: 1 },
        }}
        className="days-slider"
      >
        {calculatedDays.map((dayItem, index) => (
          <SwiperSlide key={index} className='!mr-7 md:!mr-auto'>
            <button 
              className={`border-2 border-[#2f2861] p-4 rounded-3xl font-bold ${selectedDay === dayItem.day ? 'bg-[#130e2b]' : ''}`}
              style={isDayUnlocked(dayItem.day) ? { borderColor: 'rgb(0, 255, 255)', borderWidth: '1px', borderStyle: 'solid' } : {}}
              onClick={() => handleDaySelection(dayItem.day)}
              disabled={user === false || !isDayUnlocked(dayItem.day)}
            >
              <div className='text-slate-300'>Day</div>
              <div className='grid justify-center text-slate-300'>{dayItem.day}</div>
              <div className={`border ${selectedDay === dayItem.day ? 'p-[5px]' : 'p-[13px]'} rounded-full border-[#2f2861]`}>
                {selectedDay === dayItem.day ? <div className='bg-cyan-400 p-2 rounded-full'></div> : '' }
              </div>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    <Sessions selectedDay={selectedDay} setPlayedAudios={setPlayedAudios} playedAudios={playedAudios} sessions={sessions} />
  </div>
  );
};

export default CureSessions;
