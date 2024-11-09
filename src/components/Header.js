import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="app-name">TrueFalse</div>
      <nav className="nav-links">
        <ul>
          
          <li>
            <NavLink to="/home" activeClassName="active">Home</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard" activeClassName="active">Patients</NavLink>
          </li>
          <li>
            <NavLink to="/community" activeClassName="active">Community</NavLink>
          </li>
          <li>
            <NavLink to="/imgcap" activeClassName="active">Imagecaption</NavLink>
          </li>
          <li>
            <NavLink to="/drug" activeClassName="active">DrugInteraction</NavLink>
          </li>
          <li>
            <NavLink to="/profile" activeClassName="active">Profile</NavLink>
          </li>
          
        </ul>
      </nav>
    </header>
  );
}

export default Header;
