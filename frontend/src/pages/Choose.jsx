import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../PageCSS/Choose.css';

function Choose() {
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState('user');
  const [showTerms, setShowTerms] = useState(false);

  const handleUserClick = () => {
    setSelectedMode('user');
    setTimeout(() => {
      navigate('/signup');
    }, 300);
  };

  const handleAuthorityClick = () => {
    setSelectedMode('authority');
    setShowTerms(true);
  };

  const agreeAndContinue = () => {
    setShowTerms(false);
    navigate('/authority-register');
  };

  return (
    <div className="choose-container">
      <h1>Select Your Mode</h1>
      <div className="choose-card-wrapper">
        <div
          className={`choose-card ${selectedMode === 'user' ? 'selected' : ''}`}
          onClick={handleUserClick}
        >
          <h2>User Mode</h2>
          <p style={{color:"green"}}>Continue as a regular user</p>
        </div>

        <div
          className={`choose-card ${selectedMode === 'authority' ? 'selected' : ''}`}
          onClick={handleAuthorityClick}
        >
          <h2>Authoritative Mode</h2>
          <p>Manage and monitor data</p>
          <p className="warning-text" style={{color:"red"}}>🚨 Only for authorised admins</p>
        </div>
      </div>

      {showTerms && (
        <div className="terms-modal">
          <div className="terms-box">
            <h3>Terms and Conditions</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
              fermentum eros a eros dignissim, nec rhoncus sapien suscipit. 
              Suspendisse potenti. Proin eget ligula sit amet arcu bibendum luctus.
            </p>
            <button className="agree-button" onClick={agreeAndContinue}>
              Agree and Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Choose;
