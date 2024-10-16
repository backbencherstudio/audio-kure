import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className='min-h-screen  container mx-auto flex items-center justify-center'>
           <div>
           <h4 className='text-5xl'><span className='text-red-600'>404</span> <span>Page Not Found</span></h4>
           <Link to={"/"}>Back to Home</Link>
           </div>
        </div>
    );
}


export default ErrorPage;