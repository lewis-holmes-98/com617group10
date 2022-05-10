import React, { Component } from "react";
import axios from 'axios';
import './main.css';
import AppLayout from "./components/AppLayout.js";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: "",
            dbResponse: ""
        };
    }

    callAPI() {
        fetch("http://localhost:9000/courchevel")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    callDB() {
        fetch("http://localhost:9000/testDB")
            .then(res => res.text())
            .then(res => this.setState({ dbResponse: res }))
            .catch(err => err);
    }

    getDataFromDB = () => {
        fetch('http://localhost:9000/api/getData')
    }

    componentDidMount() {
        this.callAPI();
        this.callDB();
    }
    render() {
        return (
            <div className="App">
                <p className="App-intro">{this.state.apiResponse}</p>
                <p className="App-intro">{this.state.dbResponse}</p>
                <AppLayout />
            </div>
        );
    }
}

export default App; 