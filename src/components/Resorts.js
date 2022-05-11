import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Resorts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: "",
            dbResponse: ""
        };
    }

    callAPI() {
        fetch("http://localhost:9000/resort")
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

    componentDidMount() {
        this.callAPI();
        this.callDB();
    }
    render() {
        return (
            <div className="App">
                <p className="App-intro">{this.state.apiResponse}</p>
                <p className="App-intro">{this.state.dbResponse}</p>
            </div>
        );
    }
}

export default Resorts; 