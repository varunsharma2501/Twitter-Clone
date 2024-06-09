import React from 'react'

const Avatar = ({heightVal, widthVal}) => {
    return (
        <div style={{ height : `${heightVal}px`, width : `${widthVal}px`}} className='rounded-full bg-purple-500 cursor-pointer overflow-hidden'>
            
        </div>
    )
}

export default Avatar