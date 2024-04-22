import React, { useEffect, useState } from "react";
import "./popup.css";

const Popup = ({ message, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose(); 
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <>
      {isVisible && (
        <div className="popup">
          <div className="popup-content">
            <p>{message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Popup;
