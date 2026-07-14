import React, { useEffect, useRef } from "react";
import "./Hero.css";
import profileImg from "../assets/a.jpg";

const Hero = () => {
  const leftRef = useRef(null);
  const centerRef = useRef(null);
  const rightRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (leftRef.current) observer.observe(leftRef.current);
    if (centerRef.current) observer.observe(centerRef.current);
    if (rightRef.current) observer.observe(rightRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-left" ref={leftRef}>
          <span className="hero-tag">👋 Hello, I'm</span>

          <h1>
            Awais <span> Tahir</span>
          </h1>

          <h2>Full Stack Developer</h2>

          <p>
            I build modern, responsive, and user-friendly web applications with 
            React.js, Node.js, and databases, creating fast, clean, and engaging 
            digital experiences from frontend to backend.
          </p>

          <div className="hero-buttons">
            <a href="#projects" className="btn primary">
              View Projects
              <span className="btn-arrow">→</span>
            </a>

            <a href="#contact" className="btn secondary">
              Hire Me
            </a>
          </div>
        </div>

        {/* Center Image */}
        <div className="hero-center" ref={centerRef}>
          <div className="image-circle">
            <img src={profileImg} alt="Awais Tahir" className="hero-image" />
            <div className="image-glow"></div>
          </div>
        </div>

        {/* Right Content */}
        <div className="hero-right" ref={rightRef}>
          <div className="info-box">
            <h3>4<span>+</span></h3>
            <p>Years Experience</p>
            <div className="info-hover-line"></div>
          </div>

          <div className="info-box">
            <h3>20<span>+</span></h3>
            <p>Projects Completed</p>
            <div className="info-hover-line"></div>
          </div>

          <div className="info-box">
            <h3>100<span>%</span></h3>
            <p>Responsive Design</p>
            <div className="info-hover-line"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;