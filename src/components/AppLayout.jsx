import React from "react";
import { Outlet } from "react-router-dom";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from "./Sidebar.jsx";
import BodyWrapper from "./BodyWrapper.jsx";
import Navbar from "./Navbar.jsx";
import Home from "./Home.jsx";
import Map from './Map.jsx'
import Weather from "./Weather.jsx";
import Contact from "./Contact.jsx";
import Login from './Login.jsx';
import Signup from "./Signup.jsx";
import NotFound from "./NotFound.jsx";
import Modal from "./Modal.jsx";

import '../styles/main.css';

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