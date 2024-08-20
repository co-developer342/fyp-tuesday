import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Spinner = ({path="login"}) => {
  const [count, setCount] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();

useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => {
        if (prevValue <= 1) {
          clearInterval(interval);
          navigate(`/${path}`, {
            state: { from: location.pathname }
          });// Redirect to login and preserve the current path
          return 0;
        }
        return prevValue - 1;
      });
    }, 1000);
    return () => clearInterval(interval); // Clear interval on component unmount
  }, [navigate,location,path]
)
  return (
       <>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="Text-center">redirecting to you in {count} second </h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Spinner;