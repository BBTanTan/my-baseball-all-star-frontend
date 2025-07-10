import { useState } from "react";

const Landing = ({ onStart }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative bg-black">
      <img 
        src="/home.png" 
        alt="Home" 
        className="w-full h-full object-cover absolute inset-0 z-0" 
        style={{ minHeight: '100vh', minWidth: '100vw' }}
      />
      <button
        onClick={onStart}
        className="z-10 absolute left-1/2 font-jalnan"
        style={{
          bottom: '30vh',
          transform: 'translateX(-50%)',
          padding: '1rem 3rem',
          fontSize: '1.8rem',
          borderRadius: '2rem',
          background: '#FFFFFF',
          color: '#535353',
          fontWeight: 'normal',
          boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        START
      </button>
    </div>
  );
};

export default Landing;
