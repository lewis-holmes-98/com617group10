import { Link } from "react-router-dom";
import { React, useEffect } from "react";

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Page Not Found</h2>
      <p>That page cannot be found</p>
      <Link to="/" className="">Back to the homepage...</Link>
    </div>
  );
}
 
export default NotFound;