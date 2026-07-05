import React, { useState, useEffect } from 'react';
import './Hero.css';
import profileImg from '../assets/a.jpg';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const professions = [
    'Full Stack Developer',
    'React Specialist',
    'UI/UX Enthusiast',
    'Problem Solver'
  ];

  // Reset scroll position on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % professions.length;
      const fullText = professions[i];
      
      setDisplayText(prev => {
        if (isDeleting) {
          return fullText.substring(0, prev.length - 1);
        } else {
          return fullText.substring(0, prev.length + 1);
        }
      });

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && displayText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, loopNum, typingSpeed, professions]);

  return (
    <section className="hero-section" id="home">
      {/* Animated Background Particles */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            {/* Floating Badge */}
            <div className="floating-badge">✨ Available for Work</div>

            <h1 className="hero-title">
              <span className="word-by-word">Hi, I'm </span>
              <span className="letter-by-letter">Awais Tahir</span>
            </h1>
            
            <h2 className="hero-subtitle">
              <span className="typing-effect">
                {displayText}
                <span className="cursor-blink">|</span>
              </span>
            </h2>
            
            <p className="hero-description">
              I build responsive and user-friendly web applications
              with modern technologies like React, Node.js, and MongoDB.
              Passionate about creating clean and efficient code.
            </p>
            
            <div className="hero-buttons">
              <button className="btn btn-primary">
                <span className="btn-text">View My Work</span>
                <span className="btn-icon">→</span>
              </button>
              <button className="btn btn-secondary">
                <span className="btn-text">Contact Me</span>
                <span className="btn-icon">✉</span>
              </button>
            </div>

            {/* Social Icons */}
            <div className="social-icons">
              <a href="#" className="social-icon">GitHub</a>
              <a href="#" className="social-icon">LinkedIn</a>
              <a href="#" className="social-icon">Twitter</a>
            </div>
          </div>
          
          <div className="hero-image">
            <div className="image-wrapper">
              <div className="image-border"></div>
              <img 
                src={profileImg} 
                alt="Awais Tahir" 
                className="profile-image"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;