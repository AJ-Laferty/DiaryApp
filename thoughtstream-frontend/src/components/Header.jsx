import React from 'react';
import "../styles/Header.css";

const Header = ({ user, onLogout }) => {
  const firstName = user?.name?.split(' ')[0] || 'User';

  return (
    <header className="header">
      <div className="logo">
        <h1>ThoughtStream</h1>
      </div>
      <div className="user-info">
        <span>{firstName}</span>
        {user?.picture && (
          <img
            src={user.picture}
            alt="Profile"
            className="user-image"
          />
        )}
        <button onClick={onLogout} className="logout-button">Logout</button>
      </div>
    </header>
  );
};

export default Header;
