import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa'; // Importing the play icon

const Doctors = () => {
    const [cardsData, setCardsData] = useState([]);
    const [hoveredCard, setHoveredCard] = useState(null); // State to track hovered card

    useEffect(() => {
        fetch("data.json")
            .then(res => res.json())
            .then(data => setCardsData(data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    return (
        <div className='p-10 bg-gray-900 text-white'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                {cardsData.map(card => (
                    <div 
                        key={card.id} 
                        className='bg-gradient-to-b from-slate-600 to-slate-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105'
                        onMouseEnter={() => setHoveredCard(card.id)} // Set hovered card
                        onMouseLeave={() => setHoveredCard(null)} // Clear hovered card
                    >
                        <Link to={`/audios/dr/${card.id}`}>
                            <div className='relative'>
                                <img src={card.therapist_avatar} alt={card.therapist} className='w-full h-48 object-cover' />
                                {hoveredCard === card.id && (
                                    <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                                        <FaPlay className='text-green-400 text-4xl animate-pulse' />
                                    </div>
                                )}
                            </div>
                            <div className='p-4'>
                                <h4 className='text-lg font-semibold text-white'>{card.title}</h4> {/* Changed color */}
                                <p className='text-gray-300 text-sm'>{card.therapist}</p> {/* Changed color */}
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Doctors;
