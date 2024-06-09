import React, { useEffect, useState } from 'react'

import Avatar from './Avatar'


const AddTweetDefaultInputBox = () => {
  
    const [tweetContent, setTweetContent] = useState(''); 
    const [charCount, setCharCount] = useState(0); 

    const [errorTextForCharLimitExceeded, setErrortTextForCharLimitExceeded] = useState('No error, Limit Not Excedded'); 

    const [isPostTweetButtonDisabled, setIsPostTweetButtonDisabled] = useState(true);  

    const handleTweetInput = (e) => {
        const tweet = e.target.value; 
        setCharCount(tweet.length);
        
        if(tweet.length === 0 || tweet.length === 280){
            setIsPostTweetButtonDisabled(true); 
        }
        else{
            setIsPostTweetButtonDisabled(false); 
        }

        if(tweet.length === 280){
            setErrortTextForCharLimitExceeded('Character limit exceeded'); 
        }
        else{
            setErrortTextForCharLimitExceeded('Limit not exceeded'); 
        }
        setTweetContent(tweet); 
    }

    useEffect( () => {
        const autoResize = (event) => {
            const textarea = document.querySelector("#tweetPost"); 
            if(event.target.value === ''){
                textarea.style.height = '52px';
            }
            else{
                textarea.style.height = textarea.scrollHeight + 'px';
            }
        }
        
        const textarea = document.querySelector("#tweetPost");
        textarea.addEventListener('input', autoResize, false);
 
        return () => {
            textarea.removeEventListener('input', autoResize, false);
        }; 
    }, [tweetContent]); 

    return (
        <div className='hidden min-[500px]:flex p-4 bg-purple-400 h-auto w-full border-b-[1px] border-gray-500'>
            
            <div className='hidden min-[500px]:block'>
                <Avatar heightVal={45} widthVal={45} />
            </div>

            <div className='ml-2 w-full h-auto bg-green-500 rounded-lg'>
                <form className='h-auto w-full'>
                    
                    <textarea
                        maxLength={280} 
                        required 
                        name='tweetPost' 
                        id='tweetPost' 
                        value={tweetContent}
                        onChange={handleTweetInput}
                        className='resize-none h-[52px] w-full py-3 pl-1 pr-1 rounded-lg bg-orange-500 text-xl text-white outline-none caret-white overflow-hidden'
                        placeholder='What is happening?!' 
                    >
                    </textarea>

                    <div className='flex justify-center items-center'>
                        <div className='p-[1px] w-[100%] rounded-full bg-gray-500'>
                        </div>
                    </div>

                    <div className='flex justify-end items-center'>
                        <h1 className={`m-1 select-none text-red-500 text-xs max-w-[200px] ${charCount === 280 ? 'visible' : 'invisible'} text-center`}>
                            {errorTextForCharLimitExceeded}
                        </h1>
                        <h1 className='text-white m-1 select-none min-w-[78px]'>
                            <span className={`${charCount === 280 ? 'text-red-500 text-lg' : 'tex-white'} m-1`}>
                                {charCount} 
                            </span>
                            / 280
                        </h1>
                        <button disabled={isPostTweetButtonDisabled} type='submit' className={'h-[32px] min-w-[60px] m-[6px] rounded-full ' + `${isPostTweetButtonDisabled ? 'bg-[#323333]/60' : 'bg-[#1d9bf0] cursor-pointer hover:bg-blue-500' }`}> 
                            <p className='text-white px-2'>
                                Post 
                            </p>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTweetDefaultInputBox