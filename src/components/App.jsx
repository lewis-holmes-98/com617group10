import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '../styles/main.css';
import AppLayout from "./AppLayout.jsx";
import Map from './Map.jsx'
import Weather from "./Weather.jsx";
import Contact from "./Contact.jsx";
import Login from './Login.jsx';
import Signup from "./Signup.jsx";
import NotFound from "./NotFound.jsx";


function App() {
    return (
        <div className="App">
                <AppLayout />
        </div>
    )
}

export default App; 