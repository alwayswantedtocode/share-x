import React, { useEffect, useState } from "react";

const Alert = ({ type, Message , isVisible }) => {
  const [displayAlert, setDisplayAlert] = useState(isVisible);
  
  useEffect(() => {
    let timeoutId;
    if (isVisible) {
      timeoutId = setTimeout(() => {
        setDisplayAlert(false);
      }, 5000);
    }
    return () => clearTimeout(timeoutId);
  }, [isVisible]);
  return (
    <aside className={`${displayAlert ? "errmsg" : "offscreen"}`}>
      <div className={`alert-${type}`}>
        <p  aria-live="assertive">
          {Message}
        </p>
      </div>
    </aside>
  );
};

export default Alert;
