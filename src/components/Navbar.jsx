import React from 'react';

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white w-full sm:w-full '>
            <div className="container mx-auto flex flex-col sm:flex-row sm:justify-between items-center px-4 py-5">
                <div className="logo font-bold text-white text-2xl mb-2 sm:mb-0">
                    <span className='text-blue-500'> &lt;</span>
                    Pass
                    <span className='text-blue-500'>OP/&gt;</span>
                </div>
                <ul className="flex flex-col sm:flex-row gap-4 items-center">
                    <li><a className='hover:font-bold hover:text-blue-700' href="/">Home</a></li>
                    <li><a className='hover:font-bold hover:text-blue-700' href="#">About</a></li>
                    <li>
                        <button className="text-white bg-blue-600 rounded-full flex items-center justify-between ring-white ring-1 hover:ring-2 hover:bg-black hover:text-white">
                            <img className='invert w-8 p-1' src="github.svg" alt="github logo" />
                            <span className="font-bold px-2">GitHub</span>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;