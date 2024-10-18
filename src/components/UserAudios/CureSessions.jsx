import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './CureSessions.css'; // Create this file if you want to customize styles
import daysData from './days.json';
import Sessions from './Sessions';

const CureSessions = () => {
  return (
    <div>
        <div className='max-w-7xl mx-4 md:mx-auto'>
            <div className='text-4xl md:text-6xl text-[#dbd1fb]'>Hey em!</div>
            <p className='text-[#b0a3f8] my-2 md:my-4'>You are deeply capable of reaching 199 lb</p>
            <Swiper
                spaceBetween={20}
                slidesPerView={6}
                breakpoints={{
                640: {
                    slidesPerView: 6,
                    spaceBetween: 0,
                },
                768: {
                    slidesPerView: 6,
                    spaceBetween: 0,
                },
                1024: {
                    slidesPerView: 15,
                    spaceBetween: 0,
                },
                }}
                // navigation
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                className="days-slider"
            >
                {daysData.map((dayItem, index) => (
                <SwiperSlide key={index} className=' md:!w-[72.267px]'>
                    <button className='border-2 border-[#2f2861] p-4 rounded-3xl font-bold'>
                    <div className='text-slate-300'>Day</div>
                    <div className='grid justify-center text-slate-300'>{dayItem.day}</div>
                    <div className='border p-[13px] rounded-full border-[#2f2861]'></div>
                    </button>
                </SwiperSlide>
                ))}
            </Swiper>
        </div>
        <Sessions />
    </div>
  );
};

export default CureSessions;
