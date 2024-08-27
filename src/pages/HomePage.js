// src/pages/HomePage.js
import React from 'react';
import Header from '../components/Header';

const HomePage = () => {
  return (
    <div className="relative h-screen bg-white overflow-hidden">
      <img
        src="/assets/images/waves.png"
        alt="Wave Background"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-auto pointer-events-none select-none"
      />
      <div className="relative z-10">
        <Header />
        {/* Add other content here */}
      </div>
    </div>
  );
};

export default HomePage;
