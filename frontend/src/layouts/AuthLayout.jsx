import React from 'react'

import { RxCross2 } from "react-icons/rx";

import TwitterLogo from '../assets/logo.png'


const AuthLayout = ({children}) => {
    return (
        <>  
            <section className='relative h-screen w-screen bg-[#242d34]'> 
                <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] h-[600px] rounded-2xl w-[40%] bg-black overflow-hidden'>
                    <div className='relative flex h-[50px]'>
                        <button className='absolute h-8 w-8 top-2 left-2 rounded-full flex justify-center items-center hover:bg-[#323333]/60 cursor-pointer'>
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
                    <div className='h-[calc(100%-50px)]'>
                        {children} 
                    </div>
                </div>
            </section> 
        </>
    )
}

export default AuthLayout