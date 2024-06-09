import React from 'react'

import { RxCross2 } from "react-icons/rx";

import TwitterLogo from '../assets/logo.png'


const AuthLayout = ({children}) => {
    return (
        <>  
            <section className='relative h-screen w-screen bg-[#242d34]'> 
                <div className='absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] h-[600px] rounded-2xl w-[40%] bg-black over-hidden'>
                    <div className='relative flex h-[50px] bg-blue-500'>
                        <button className='absolute h-10 w-10 top-1 left-2 bg-red-500 rounded-full'>
                        <RxCross2 />
                        </button>
                        <div className='flex justify-center items-center bg-green-500 w-full h-full'>
                            <img 
                                height={40}
                                width={40}
                                src={TwitterLogo}
                            />
                        </div>
                    </div>
                </div>
            </section> 
        </>
    )
}

export default AuthLayout