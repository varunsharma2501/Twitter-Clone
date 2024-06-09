import React from 'react'

import TwitterLogo from '../assets/logo.png'
import { Link } from 'react-router-dom'


const LandingPage = () => {
    return (
        <section className='relative h-screen w-screen bg-black flex flex-col max-[945px]:justify-center max-[945px]:items-center min-[945px]:flex-row'> 
            <div className='h-[50px] w-[50px] mb-4 min-[945px]:h-screen min-[945px]:w-[50%] flex justify-center items-center'>
                <img 
                    className='min-h-[50px] min-w-[50px] min-[945px]:min-h-[500px] min-[945px]:min-w-[500px]'
                    src={TwitterLogo}
                />
            </div>
            <div className='max-w-[480px] h-[80%] min-[945px]:h-screen flex justify-center items-center bg-black'>
                <div className='w-[85%] lg:h-[520px] bg-black flex flex-col'>
                    <div className='text-white text-5xl sm:text-7xl font-bold mb-14 text-center'> Happening now </div> 
                    <div className='text-white text-2xl sm:text-4xl font-bold mb-12 flex items-center justify-center'> Join today. </div> 
                    <div className='mb-2 flex justify-center'>
                        <Link to={'/signup-page'} className='rounded-full overflow-hidden'>
                            <button className='h-12 w-60 sm:w-80 bg-[#1d9bf0] rounded-full text-md text-white font-semibold'>
                                Create Account 
                            </button>
                        </Link>
                    </div>
                    <p className='text-xs text-wrap w-auto sm:text-sm text-center text-gray-500 mb-12'>
                        By signing up, you agree to the <a target='_blank' href='https://x.com/en/tos' className='text-[#1d9bf0] hover:underline'> Terms of Service </a> and <a target='_blank' href='https://x.com/en/privacy' className='text-[#1d9bf0] hover:underline'> Privacy Policy </a>, including <a href='https://help.x.com/en/rules-and-policies/x-cookies' target='_blank' className='text-[#1d9bf0] hover:underline'> Cookie Use. </a>
                    </p>
                    <div className='flex flex-col'>
                        <p className='text-lg font-semibold text-white mb-4 text-center'> Already have an account? </p>
                        <div className='flex justify-center'>
                            <Link to={'/login-email'} className='rounded-full overflow-hidden'>
                                <button className='h-12 w-60 sm:w-80 bg-black rounded-full text-md text-[#1d9bf0] hover:bg-blue-500 font-semibold border-2 border-gray-500 hover:bg-[#1d9bf0]/20'>
                                    Sign In
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
    )
}

export default LandingPage