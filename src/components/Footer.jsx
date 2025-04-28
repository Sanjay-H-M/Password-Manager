import React from 'react'

const Footer = () => {
    const handleLogoClick = () => {
        navigate('/');
    };
    return (
        <div className="flex flex-row bg-slate-800 text-white justify-between px-10 items-center gap-2 fixed bottom-0 w-full">
            <p className="text-sm text-gray-400">
                Copyright © 2025 Sanjay. All rights reserved.
            </p>
            <div className="logo font-bold text-white text-2xl hover:cursor-pointer" onClick={handleLogoClick}>
                <span className='text-blue-500'> &lt;</span>
                Pass
                <span className='text-blue-500'>OP/&gt;</span>
            </div>
        </div>
    )
}

export default Footer