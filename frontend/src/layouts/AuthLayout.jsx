import React from 'react'
import { useNavigate } from 'react-router-dom';

import { RxCross2 } from "react-icons/rx";

import TwitterLogo from '../assets/logo.png'


const AuthLayout = ({children}) => {

    const navigate = useNavigate(); 

    const handleCut = () => {
        navigate('/'); 
    }

    return (
        <>  
            <section className='relative h-screen w-screen bg-[#242d34]'> 
                <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] h-screen w-screen sm:h-[600px] sm:rounded-2xl sm:w-[600px] bg-black overflow-hidden'>
                    <div className='relative flex h-[50px]'>
                        <button onClick={handleCut} className='absolute h-8 w-8 top-2 left-2 rounded-full flex justify-center items-center hover:bg-[#323333]/60 cursor-pointer'>
                            <RxCross2 className='text-xl text-white'/>
                        </button>
                        <div className='flex justify-center items-center w-full h-full'>
                            <img 
                                height={40}
                                width={40}
                                src={TwitterLogo}
                            />
                        </div>
                    </div>
                    <div className='h-[calc(100%-50px)] w-full'>
                        {children} 
                    </div>
                </div>
            </section> 
        </>
    )
}

export default AuthLayout