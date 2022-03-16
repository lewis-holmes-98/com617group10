// src/components/header.js

import React from 'react'

function Header() {
    return (
        <div>
            <nav className="bg-slate-500 shadow-lg">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between">
                        <div className="flex space-x-7">
                            <div>

                                <a href="#" className="flex items-center py-4 px-2">
                                    <span className="font-semibold text-white text-lg">Snowcore</span>
                                </a>
                            </div>

                            <div className="hidden md:flex items-center space-x-1">
                                <a href="" className="py-4 px-2 text-white border-b-4 font-semibold bg-slate-500 hover:bg-slate-300 border-slate-500 transition duration-300 ">Home</a>
                                <a href="" className="py-4 px-2 text-white border-b-4 font-semibold bg-slate-500 hover:bg-slate-300 border-slate-500 transition duration-300">Map</a>
                                <a href="" className="py-4 px-2 text-white border-b-4 font-semibold bg-slate-500 hover:bg-slate-300 border-slate-500 transition duration-300">Weather</a>
                                <a href="" className="py-4 px-2 text-white border-b-4 font-semibold bg-slate-500 hover:bg-slate-300 border-slate-500 transition duration-300">Contact Us</a>
                            </div>
                        </div>

                        <div className="hidden md:flex items-center space-x-3 ">
                            <a href="" className="py-2 px-2 font-medium text-white rounded hover:bg-sky-100 hover:text-gray-600 transition duration-300">Log In</a>
                            <a href="" className="py-2 px-2 font-medium text-gray-600 rounded bg-sky-100 hover:bg-slate-500 hover:text-white transition duration-300">Sign Up</a>
                        </div>

                        <div className="md:hidden flex items-center">
                            <button className="outline-none mobile-menu-button">
                                <svg className=" w-6 h-6 text-white bg-slate-500 "
                                    x-show="!showMenu"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="hidden mobile-menu">
                    <ul className="">
                        <li className="active"><a href="index.html" className="block text-sm px-2 py-4 text-white bg-slate-500 font-semibold">Home</a></li>
                        <li><a href="#" className="block text-sm px-2 py-4 bg-slate-500 hover:bg-slate-300 border-slate-500 transition duration-300">Map</a></li>
                        <li><a href="#" className="block text-sm px-2 py-4 bg-slate-500 hover:bg-slate-300 border-slate-500 transition duration-300">Weather</a></li>
                        <li><a href="#" className="block text-sm px-2 py-4 bg-slate-500 hover:bg-slate-300 border-slate-500 transition duration-300">Contact Us</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header