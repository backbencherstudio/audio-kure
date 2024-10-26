/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
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
import Sessions from './Sessions';

const CureSessions = ({ currentUser }) => {
  const [selectedMonth, setSelectedMonth] = useState(1)
  const [playedAudios, setPlayedAudios] = useState({});
  const user = true; 

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

  useEffect(() => {
    const savedPlayedAudios = JSON.parse(localStorage.getItem('playedAudios')) || {};
    Object.keys(savedPlayedAudios).forEach(key => {
      if (!Array.isArray(savedPlayedAudios[key])) {
        savedPlayedAudios[key] = []; 
      }
    });

    setPlayedAudios(savedPlayedAudios);


    const createdDate = new Date(currentUser?.createdAt);
    const currentDate = new Date();
    const elapsedMonths = getElapsedMonths(createdDate, currentDate);
    setSelectedMonth(elapsedMonths);
  }, [currentUser?.createdAt]);

  const handleMonthSelection = (month) => {
    if (isMonthUnlocked(month)) {
      setSelectedMonth(month);
    }
  };

  const isMonthUnlocked = (month) => {
    const createdDate = new Date(currentUser?.createdAt);
    const currentDate = new Date();
    const elapsedMonths = getElapsedMonths(createdDate, currentDate);
    return month <= elapsedMonths;
  };

  const getElapsedMonths = (startDate, endDate) => {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();
    return (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
  };

  const getTotalMonths = (createdAt, expiresDate) => {
    const createdDate = new Date(createdAt);
    const expirationDate = new Date(expiresDate);
    return getElapsedMonths(createdDate, expirationDate);
  };

  const totalMonths = getTotalMonths(currentUser?.createdAt, currentUser?.expiresDate);
  const monthsData = Array.from({ length: totalMonths }, (_, index) => ({ month: index + 1 }));
  const calculatedMonths = monthsData.slice(0, -1);
  
  return (
    <div className={`${user === false && 'cursor-not-allowed opacity-50'}`}>
      <div className='max-w-7xl mx-4 md:mx-auto'>
        <div className='text-4xl md:text-6xl text-[#dbd1fb]'>Hey {currentUser?.name}!</div>
        <p className='text-[#b0a3f8] my-2 md:my-4'>You are deeply capable of reaching 199 lb</p>
        {calculatedMonths?.length === 12 && (
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
            className="months-slider"
          >
            {calculatedMonths.map((monthItem, index) => (
              <SwiperSlide key={index} className=' !w-[90px] !mr-7 md:!mr-auto'>
                <button 
                  className={`border-2 border-[#2f2861] p-4 rounded-3xl font-bold ${selectedMonth === monthItem.month ? 'bg-[#130e2b]' : ''}`}
                  style={isMonthUnlocked(monthItem.month) ? { borderColor: 'rgb(0, 255, 255)', borderWidth: '1px', borderStyle: 'solid' } : {}}
                  onClick={() => handleMonthSelection(monthItem.month)}
                  disabled={user === false || !isMonthUnlocked(monthItem.month)}
                >
                  <div className='text-slate-300'>Month</div>
                  <div className='grid justify-center text-slate-300'>{monthItem.month}</div>
                  <div className='grid justify-center'>
                    <div className={`grid justify-center items-center border w-7 h-7  rounded-full border-[#2f2861]`}>
                      {selectedMonth === monthItem.month ? <div className='bg-cyan-400 p-2 rounded-full'></div> : '' }
                    </div>
                  </div>
                </button>              
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <Sessions selectedMonth={selectedMonth} setPlayedAudios={setPlayedAudios} playedAudios={playedAudios} sessions={sessions} />

    </div>
  );
};

export default CureSessions;
