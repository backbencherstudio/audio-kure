import  { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';

const GoogleReviews = () => {
    const [reviews, setReviews] = useState([]);

    const FetchReviews = async () => {
        try {
            const response = await fetch('reviews.json');
            const result = await response.json()
            setReviews(result);
        } catch (error) {
            console.log(error);            
        }
    }
    useEffect(() => {
        FetchReviews()
    }, [])
    return (
        <div className='py-20 px-4'>
            <h1 className='text-center merriweather text-4xl md:text-5xl font-semibold mb-10'>Why <span className='text-[#8A5EFF]'>Kustomers</span> love <span className='text-[#8A5EFF]'>healer</span> app</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    reviews.map((review, index) =>
                        <div key={index} className='text-center border border-violet-500 p-4 space-y-3 rounded-3xl'>
                            <h1 className='text-lg'>{review.name}</h1>
                            <p className='text-sm text-zinc-300 '>{review.reviewText}</p>
                            <div className='flex justify-center'>
                                {/* Generate stars based on review score */}
                                {[...Array(5)].map((_, starIndex) => (
                                    <FaStar key={starIndex} className={starIndex < review.review ? 'text-yellow-500' : 'text-gray-300'} />
                                ))}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default GoogleReviews;