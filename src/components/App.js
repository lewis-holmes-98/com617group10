import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../styles/main.css';
import Navbar from './Navbar.jsx';
import Sidebar from "./Sidebar.jsx";
import Map from './Map.jsx'
import Weather from "./Weather.jsx";
import Contact from "./Contact.jsx";
import Login from './Login.jsx';
import Home from './Home.jsx';
import Signup from "./Signup.jsx";
import NotFound from "./NotFound.jsx";

function App() {
    return (
        <Router>
            <div className="App">
                <Navbar />
                <div className="content">
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/signup">
                            <Signup />
                        </Route>
                        <Route path="/map">
                            <Map />
                        </Route>
                        <Route path="/weather">
                            <Weather />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default App; 