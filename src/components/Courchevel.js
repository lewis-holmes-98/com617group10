import React from 'react';
import { Link } from "react-router-dom";

class Courchevel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            apiResponse: ""
        };
    }

    callAPI() {
        fetch("http://localhost:9000/courchevel")
            .then(res => res.text())
            .then(res => this.setState({ apiResponse: res }))
            .catch(err => err);
    }

    componentDidMount() {
        this.callAPI();
    }

    render() {
        return (
            <div className="container mx-auto pt-6">
                <div className="not-implemented">
                    <h2>Page Not Yet implemented</h2>
                    <p className="resort">{this.state.apiResponse}</p>
                    <Link to="/" className="font-medium text-gray-600 rounded">Back to the homepage...</Link>
                </div>
            </div>
        );
    }
}


export default Courchevel