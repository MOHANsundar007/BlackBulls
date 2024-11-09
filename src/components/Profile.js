import React from 'react';
import './Profile.css';

function Profile() {
  return (
    <div className="profile-container">
      <h1>Profile</h1>
      <p className="subtitle">I'm a creative PHP webdeveloper</p>
      
      <div className="profile-content">
        <div className="about-section">
          <h2>About me</h2>
          <p>
            I am an all-round web developer. I am a senior programmer with good knowledge of
            front-end techniques. Vitae sapien pellentesque habitant morbi tristique senectus et.
            Aenean sed adipiscing diam donec adipiscing tristique risus.
          </p>
        </div>
        
        <div className="profile-image">
        <img src="logo512.png" alt="Profile" />
        </div>
        
        <div className="details-section">
          <h2>Details</h2>
          <p><strong>Name:</strong> Ajith Kumar</p>
          <p><strong>Age:</strong> 20 years</p>
          <p><strong>Location:</strong> 's-Hertogenbosch, The Netherlands, Earth</p>
          
          <div className="social-links">
            {/* <a href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
            <a href="#" aria-label="Facebook"><i className="fab fa-facebook"></i></a>
            <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
