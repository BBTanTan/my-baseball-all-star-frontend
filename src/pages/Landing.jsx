import { useState } from "react";

const Landing = ({ onStart }) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative bg-black">
      <img 
        src="/landing.png" 
        alt="Home" 
        className="w-full h-full object-cover absolute inset-0 z-0" 
      />
      <div className="z-10 flex flex-col items-center justify-start gap-1" style={{ position: 'absolute', top: '2vh', left: '50%', transform: 'translateX(-50%)' }}>
        <img
          src="/element/logo.png"
          alt="Logo"
          className="mb-2"
          style={{ width: '55vw', maxWidth: '75vw', height: 'auto' }}
        />
        <img
          src="/element/baseball-cap.png"
          alt="Baseball Cap"
          className="mb-2"
          style={{ width: '120px', height: '120px', maxWidth: '30vw', maxHeight: '30vw', objectFit: 'contain' }}
        />
        <img
          src="/element/title.png"
          alt="Title"
          className="mb-6"
          style={{ width: '224px', maxWidth: '64vw', height: 'auto' }}
        />
        <button
          onClick={onStart}
          className="font-jalnan"
          style={{
            padding: '0.3rem 1rem',
            fontSize: '1.8rem',
            borderRadius: '2rem',
            background: '#FFFFFF',
            color: '#535353',
            fontWeight: 'normal',
            boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
            border: 'none',
            cursor: 'pointer',
            width: 'min(240px, 60vw)'
          }}
        >
          START
        </button>
      </div>
    </div>
  );
};

export default Landing;
