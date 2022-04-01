import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../styles/main.css';
import Navbar from './Navbar.jsx';
import AppLayout from "./AppLayout.jsx";
import Map from './Map.jsx'
import Weather from "./Weather.jsx";
import Contact from "./Contact.jsx";
import Login from './Login.jsx';
import Home from './Home.jsx';
import Signup from "./Signup.jsx";
import NotFound from "./NotFound.jsx";
import { Sidebar } from "semantic-ui-react";

function App() {
    return (
        <BrowserRouter>
        <div className="App">
                <AppLayout />
            <div className="content">
                <Routes>
                    <Route>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/map" element={<Map />} />
                        <Route path="/weather" element={<Weather />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </div>
        </div>
        </BrowserRouter>
    )
}

export default App; 