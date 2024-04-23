import React from 'react';
import './css/CustomButton.css';

// Assume onClick and type are the only props used by button, add more if needed
function CustomButton({ variant, type, children, onClick }) {
  return (
    <button
      className={`custom-button ${variant}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export default CustomButton;
