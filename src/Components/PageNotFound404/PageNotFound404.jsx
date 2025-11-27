import React from 'react';
import error from '../../../public/error1.avif';
import { useNavigate } from 'react-router';

const PageNotFound404 = () => {

    const navigate = useNavigate();

    return (
        <div>
            <div className='flex justify-center bg-[#e5e7eb] px-15 py-20'>
                <div className='space-y-4'>
                    <img src={error} alt="" />
                    <h2 className='text-2xl sm:text-4xl font-bold text-center'>Oops, page not found!</h2>
                    <p className='text-center text-zinc-500'>The page you are looking for is not available.</p>
                    <button onClick={() => navigate('/')} className='flex  mx-auto border hover:bg-blue-500 bg-[#632EE3] text-white text-[1.2rem] font-semibold px-10 py-2 rounded-sm'>Back to Home!</button>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound404;