import React, { Component } from "react";
import './main.css';
import AppLayout from "./components/AppLayout.js";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = { apiResponse: "" };
    }

    callAPI() {
        fetch("http://localhost:9000/testAPI")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }
    render() {
        return (
            <div className="App">
                <p className="App-intro">{this.state.apiResponse}</p>
                <AppLayout />
            </div>
        );
    }
}

export default App; 