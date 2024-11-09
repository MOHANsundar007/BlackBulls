import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div id="/" className="home-container">
      <div className="hero-section">
        <h1 className="title">Revolutionizing Healthcare Research with AI</h1>
        <p className="info">
          Imagine a future where healthcare professionals can effortlessly access the most relevant medical information.
          <br />Our project is bringing this vision to life by developing an innovative AI-powered system that automates the creation of precise Boolean queries.
        </p>
      </div>
      <div className="feat">
        <p className="">
        <p className="info">Key Features:</p>
        <ul className="key">
          <li><b>Natural Language Understanding:</b> Our system seamlessly interprets complex medical terms and phrases.</li>
          <li><b>Contextual Awareness:</b> It accurately understands the context of your queries, ensuring relevant results.</li>
          <li><b>Adaptive Learning:</b> It continually learns and adapts to the evolving medical landscape.</li>
        </ul>
        </p>
        
        <p className="info">
          By streamlining the research process, our solution empowers healthcare professionals to make informed decisions, accelerate groundbreaking discoveries, and ultimately improve patient outcomes.
        </p>
        <Link to="/queries">
          <button className="start-button">Experience the Future of Healthcare Research</button>
        </Link>
      </div>
      
     
    </div>
  );
}

export default Home;
