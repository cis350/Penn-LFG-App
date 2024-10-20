import React from 'react';
import './css/CustomButton.css';

function CustomButton({
  variant, type, children, onClick,
}) {
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
