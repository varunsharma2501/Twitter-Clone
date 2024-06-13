// This feature is underdevelopment 


import React, { useRef, useState, useEffect } from 'react' 

import { IoClose } from 'react-icons/io5'
import { FaSearch } from 'react-icons/fa' 
import axios from 'axios'
import toast from 'react-hot-toast'

import SearchResultUserCard from '../small components/SearchResultUserCard.jsx' 
import LoadingSpinner from '../small components/LoadingSpinner.jsx'
import validateSearchQuery from '../../helpers/validateSearchQuery.js'

let shouldConstantSearchOccur = true; 
let searchWhenUserStopsTypingFor500ms; 


const SearchBar = () => {

    const [searchQuery, setSearchQuery] = useState(''); 
    const [userSearchResult, setUserSearchResult] = useState([]); 

    const [loading, setLoading] = useState(false); 
    const [searchResultIsHidden, setSearchResultIsHidden] = useState(true); 
    const [searchDone, setSearchDone] = useState(false); 

    const searchBarCardRef = useRef(); 
    const searchResultContainerRef = useRef(); 

    // useEffect( () => {
    //     const handler = (e) => {
    //         e.stopPropagation();
    //         if(!searchBarCardRef.current.contains(e.target) && !searchResultContainerRef.current.contains(e.target)){
    //             setSearchResultIsHidden(true); 
    //             setSearchDone(false); 
    //             setLoading(false); 
    //             setSearchQuery('');
    //             setUserSearchResult([]); 
    //         }
    //     }
    //     document.addEventListener('mousedown', handler); 
    //     return () => {
    //         document.removeEventListener('mousedown', handler);
    //     };
    // })

    const onSubmitSearchDatabase = (e) => {

        clearInterval(searchWhenUserStopsTypingFor500ms);

        setLoading(true); 

        e.preventDefault(); 
        e.stopPropagation(); 

        axios({ 
            method : 'put', 
            url : `${import.meta.env.VITE_BACKEND_URL}/api`, 
            data : {searchQuery} 
        })
        .then( (response) => {
            if(response?.data?.success){
                setUserSearchResult(response?.data?.data);
                setSearchDone(true); 
                setLoading(false);
                setSearchResultIsHidden(false);
            }
            else{
                setLoading(false);
                toast.error('Internal Server Error, Search was Unsuccessfull'); 
            }
        })
        .catch( (err) => {
            toast.error(err?.response?.data?.message); 
            setLoading(false);
            console.log(err); 
			if(err?.response?.data?.logout){
				sessionTimeOutLogout(dispatch); 
				navigate('/login-email'); 
			}
        })
    }

        
    const searchDatabaseConstantly = (shouldSearchOccur) => {

        if(searchQuery === ''){
            setSearchDone(false); 
            setSearchResultIsHidden(true); 
            return;
        }

        if(!shouldSearchOccur){
            setSearchDone(false); 
            setSearchResultIsHidden(true);
            return;
        }

        setLoading(true); 

        axios({ 
            method : 'put', 
            url : `${import.meta.env.VITE_BACKEND_URL}/api`, 
            data : {searchQuery} 
        })
        .then( (response) => {
            if(response?.data?.success){
                setUserSearchResult(response?.data?.data);
                setSearchDone(true); 
                setLoading(false);
                setSearchResultIsHidden(false);
            }
        })
        .catch( (err) => {
            toast.error(err?.response?.data?.message); 
            setLoading(false); 
            setSearchDone(false); 
            setSearchResultIsHidden(true); 
            console.log(err); 
			if(err?.response?.data?.logout){
				sessionTimeOutLogout(dispatch); 
				navigate('/login-email'); 
			}
        })
    }

    const [isSearchBarErrorTextInvisible, setIsSearchBarErrorTextInvisible] = useState(true); 
    const [searchBarErrorText, setSearchBarErrorText] = useState('Display Search Bar Error Text'); 
    
    const searchQueryChangeHandler = (e) => {
        const value = e.target.value; 
        shouldConstantSearchOccur = validateSearchQuery(value, {
            setIsSearchBarErrorTextInvisible,
            setSearchBarErrorText
        }); 
        setSearchQuery(value); 
    }

    useEffect( () => {
        searchWhenUserStopsTypingFor500ms = setTimeout( () => {
            searchDatabaseConstantly(shouldConstantSearchOccur); 
        }, 500);
        return () => {
            clearTimeout(searchWhenUserStopsTypingFor500ms); 
        }
    }, [searchQuery])

    const closeSearchResult = (e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        setSearchResultIsHidden(true); 
        setSearchDone(false); 
    }

    return (
        <>  
            <div className='mt-4 h-[80px] w-full flex flex-col justify-center items-center'>
                <form className='relative flex w-[80%]' onSubmit={onSubmitSearchDatabase}>
                    <input
                        type='text' 
                        id='search-bar' 
                        placeholder='Search' 
                        value={searchQuery} 
                        onChange={searchQueryChangeHandler}
                        required
                        className='w-full outline-none py-[11px] h-full pl-7 pr-8 rounded-full text-white text-sm bg-[#202327]' 
                    />
                    <button disabled={!shouldConstantSearchOccur} type='submit' className='absolute top-[1px] right-3 mt-[5px] text-white hover:text-green-500 w-7 h-7 flex justify-center items-center rounded-full'>
                        {
                            loading ? (
                                <LoadingSpinner height={5} width={5} />
                            ) : (
                                <FaSearch  className='text-gray-500'/>
                            )
                        }
                    </button> 
                </form>
                <p className={'text-[10px] text-red-500 pl-2 pr-1 font-mono rounded-md mt-2 mx-2 mb-1 w-72 h-6 text-center '  + `${isSearchBarErrorTextInvisible && 'invisible'}`}> {searchBarErrorText} </p>
            </div>
            
            {/* Display Search Results */} 
            <div className={`${ searchResultIsHidden && 'hidden'} flex justify-center relative -mt-[26px] z-10 w-full`} ref={searchResultContainerRef}> 

                <div className='absolute w-[80%] mx-[9%] bg-black rounded-t-xl rounded-b-xl flex flex-col min-h-0 max-h-[310px] overflow-x-auto scroll-smooth scrollbar glow-white'>
                    
                    {
                        userSearchResult.length === 0 && searchDone && (
                            <>
                                <p className='text-white px-4 py-2 text-sm rounded-lg cursor-pointer bg-red-500 flex relative'> 
                                    No User Found 
                                    <button className='pl-1 absolute h-3.5 w-3.5 rounded-bl-lg top-0 right-0' onClick={ closeSearchResult } > 
                                        <IoClose className='rounded-bl-lg text-white text-sm absolute top-[0.3px] right-[0.2px] bg-zinc-800 hover:bg-black' /> 
                                    </button>
                                </p> 
                            </> 
                        ) 
                    }

                    {
                        userSearchResult.length !== 0 && searchDone && (
                            
                            <div className='flex flex-col relative'>
                                <button className='absolute right-0 pl-1 h-3.5 w-3.5 rounded-bl-lg rounded-tr-lg mt-[0.5px] z-20' onClick={ closeSearchResult } > 
                                    <IoClose className='rounded-bl-lg rounded-tr-lg text-black text-sm absolute top-0 right-0 bg-zinc-300 hover:bg-red-500 cursor-pointer' /> 
                                </button>

                                {
                                    userSearchResult.map( (appUser, index) => {
                                        return(
                                            <SearchResultUserCard key={appUser._id} appUser={appUser}/>
                                        )
                                    })
                                }
                            </div>
                        )
                    }

                </div>
            </div>
        </>
    )
}

export default SearchBar