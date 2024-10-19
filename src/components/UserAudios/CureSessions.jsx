import  { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './CureSessions.css';
import daysData from './days.json'; // Assuming this JSON has your days data
import Sessions from './Sessions';

const CureSessions = () => {
  const [selectedDay, setSelectedDay] = useState(1); // Start with Day 1
  const user = true;

  const handleDaySelection = (day) => {
    setSelectedDay(day); 
  };

  return (
    <div>
      <div className='max-w-7xl mx-4 md:mx-auto'>
        <div className='text-4xl md:text-6xl text-[#dbd1fb]'>Hey em!</div>
        <p className='text-[#b0a3f8] my-2 md:my-4'>You are deeply capable of reaching 199 lb</p>
        <Swiper
            spaceBetween={20}
            slidesPerView={3}
            slidesPerGroup={1}
            breakpoints={{
                640: {
                slidesPerView: 4,
                spaceBetween: 5,
                slidesPerGroup: 1,
                },
                768: {
                slidesPerView: 6,
                spaceBetween: 5,
                slidesPerGroup: 1,
                },
                1024: {
                slidesPerView: 8,
                spaceBetween: 5,
                slidesPerGroup: 1,
                },
                1280: {
                slidesPerView: 10,
                spaceBetween: 5,
                slidesPerGroup: 1,
                },
            }}
            className="days-slider"
        >

          {daysData.map((dayItem, index) => (
            <SwiperSlide key={index} className='!mr-7 md:!mr-auto'>
              <button 
                className={`border-2 border-[#2f2861] p-4 rounded-3xl font-bold ${selectedDay === dayItem.day ? 'bg-[#130e2b]' : ''}`}
                style={selectedDay === dayItem.day ? { borderColor: 'rgb(0, 255, 255)', borderWidth: '1px', borderStyle: 'solid' } : {}}
                onClick={() => handleDaySelection(dayItem.day)} // Set selected day
                disabled={user === false}
              >
                <div className='text-slate-300'>Day</div>
                <div className='grid justify-center text-slate-300'>{dayItem.day}</div>
                <div className={`border ${selectedDay === dayItem.day ? 'p-[5px]' : 'p-[13px]'} rounded-full border-[#2f2861]`}>{selectedDay === dayItem.day ? <div className='bg-cyan-400 p-2 rounded-full'></div> : '' }</div>
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {user && (
        <Sessions selectedDay={selectedDay} />
       )}
    </div>
  );
};

export default CureSessions;
