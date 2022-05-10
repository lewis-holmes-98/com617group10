import React from 'react';
import { Link } from "react-router-dom";

const Weather = ({resorts}) => {
    return (
        <div className="container mx-auto pt-6">
        <div className="not-implemented">
        <h2>Page Not Yet implemented</h2>
        <p>That page is still under construction</p>
        <Link to="/" className="font-medium text-gray-600 rounded">Back to the homepage...</Link>
        </div>
    </div>
  );
    }


export default Weather