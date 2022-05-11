import React from "react";
import { Outlet } from "react-router-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from "./Sidebar.js";
import BodyWrapper from "./BodyWrapper.js";
import Navbar from "./Navbar.js";
import Home from "./Home.js";
import Map from './Map.js'
import Weather from "./Weather.js";
import Contact from "./Contact.js";
import Login from './Login.js';
import Signup from "./Signup.js";
import NotFound from "./NotFound.js";
import Modal from "./Modal.js";
import Resort from "./Resorts"

import '../main.css';

const AppLayout = ({ children }) => {
    return (
        <BrowserRouter>
            <BodyWrapper>
                <div className="">
                    <Navbar />
                </div>
                <div className="flex bg-gray-200">
                    <Sidebar />
                    <Outlet />
                    <div className="mx-auto">
                        <Routes>
                            <Route>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Modal />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/map" element={<Map />} />
                                <Route path="/weather" element={<Weather />} />
                                <Route path="/contact" element={<Contact />} />
                                <Route path="/resort" element={<Resort />} />
                                <Route path="*" element={<NotFound />} />
                            </Route>
                        </Routes>
                    </div>
                    <div className="flex overflow-hidden">
                        <main className="content">
                            <section className="sm:flex-row flex flex-col flex-1">
                                <div
                                    className="content-box"
                                    style={{ flexGrow: 2, flexBasis: "0%" }}
                                >
                                    {children}
                                </div>
                            </section>
                        </main>
                    </div>
                </div>
            </BodyWrapper>
        </BrowserRouter>
    )
};

export default AppLayout;