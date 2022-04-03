import React from 'react';

const BodyWrapper = ({children}) => {
    return (
        <div className="">
          <main className="">{children}</main>
        </div>
    );
  };
  
  export default BodyWrapper;