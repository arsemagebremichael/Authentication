import React from 'react';
import './style.css';

function Button({ label, variant = 'primary', onClick ,disabled,type}) {
  return (
    <button className={`share-button ${variant}`.trim()} onClick={onClick}
    disabled={disabled}
    type={type}>
      {label}
    </button>
  );
}

export default Button;