import React from 'react';
import { Link } from "react-router-dom";

const Weather = ({resorts}) => {
    return (
        <div className="resort-list">
          {resorts.map(resort => (
            <div className="resort-name" key={resort.formattedName} >
                <h2>{ resort.name }</h2>
                <p>Best week: { resort.bestWeekWindow }</p>
            </div>
          ))}
        </div>
      );
    }


export default Weather