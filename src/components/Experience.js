import React, { useEffect, useRef, useState } from 'react';
import './Experience.css';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [flippedCards, setFlippedCards] = useState({});
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const isTouchDevice = useRef(false);

  const experiences = [
    {
      id: 1,
      company: 'Bassr Company',
      location: 'Islamabad, Pakistan',
      role: 'Web Developer',
      duration: '1 Year',
      initials: 'B',
      color: '#f7971e',
      icon: '💻',
      responsibilities: [
        'Developed responsive and user-friendly websites.',
        'Built modern interfaces using HTML, CSS, JavaScript, and React.js.',
        'Converted UI/UX designs into functional web pages.',
        'Optimized website performance and fixed bugs.',
        'Collaborated with designers and team members on client projects.'
      ],
      technologies: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Git'],
      achievement: 'Increased page load speed by 40%'
    },
    {
      id: 2,
      company: 'Huawei Technologies',
      location: 'Islamabad, Pakistan',
      role: 'Civil Design Specialist',
      duration: '1 Year',
      initials: 'H',
      color: '#00d4ff',
      icon: '🏗️',
      responsibilities: [
        'Created detailed civil engineering designs using AutoCAD.',
        'Developed accurate 2D and 3D models for infrastructure projects.',
        'Collaborated with engineering teams to ensure design accuracy.',
        'Prepared technical drawings and documentation for project approval.',
        'Ensured compliance with industry standards and project specifications.'
      ],
      technologies: ['AutoCAD', 'Civil 3D', 'Drafting', '3D Modeling', 'Technical Drawing'],
      achievement: 'Delivered 50+ projects with 100% accuracy'
    }
  ];

  // Detect touch device
  useEffect(() => {
    isTouchDevice.current = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (timelineRef.current) {
              setTimeout(() => {
                timelineRef.current.style.height = '100%';
              }, 300);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle flip on arrow click
  const handleArrowClick = (e, expId) => {
    e.stopPropagation(); // Prevent card click from firing
    setFlippedCards(prev => ({
      ...prev,
      [expId]: !prev[expId]
    }));
  };

  // Handle card click for touch devices
  const handleCardClick = (expId) => {
    if (isTouchDevice.current) {
      setFlippedCards(prev => ({
        ...prev,
        [expId]: !prev[expId]
      }));
    }
  };

  return (
    <section className="experience-section" id="experience" ref={sectionRef}>
      {/* Background Effects */}
      <div className="exp-bg-effects">
        <div className="exp-glow exp-glow-1"></div>
        <div className="exp-glow exp-glow-2"></div>
        <div className="exp-glow exp-glow-3"></div>
        <div className="exp-grid-lines"></div>
      </div>

      <div className="exp-container">
        {/* Section Header */}
        <div className="exp-header">
          <span className="exp-badge">
            <span className="badge-pulse"></span>
            ✦ Experience
          </span>
          <h2 className="exp-title">
            My <span className="highlight">Journey</span>
            <span className="title-underline"></span>
          </h2>
          <p className="exp-subtitle">
            Crafting digital experiences & engineering solutions
          </p>
          <div className="exp-header-line"></div>
        </div>

        {/* 3D Timeline */}
        <div className="exp-timeline-3d">
          {/* Timeline Line with Gradient */}
          <div className="timeline-line-wrapper-3d">
            <div className="timeline-line-3d" ref={timelineRef}>
              <div className="line-glow"></div>
            </div>
          </div>

          {/* Experience Items with Flip Cards */}
          {experiences.map((exp, index) => {
            const isFlipped = flippedCards[exp.id] || false;
            const isHovered = hoveredCard === exp.id;
            
            return (
              <div 
                key={exp.id} 
                className={`exp-item-3d ${isVisible ? 'visible' : ''}`}
                style={{ 
                  animationDelay: `${index * 0.4}s`,
                  '--card-color': exp.color 
                }}
                onMouseEnter={() => !isTouchDevice.current && setHoveredCard(exp.id)}
                onMouseLeave={() => !isTouchDevice.current && setHoveredCard(null)}
                onClick={() => handleCardClick(exp.id)}
              >
                {/* Timeline Dot with 3D effect */}
                <div className="timeline-dot-wrapper-3d">
                  <div className="timeline-dot-3d">
                    <div className="dot-ring"></div>
                    <div className="dot-core"></div>
                    <div className="dot-pulse-3d"></div>
                  </div>
                </div>

                {/* Flip Card */}
                <div className="flip-card">
                  <div className={`flip-card-inner ${(isHovered || isFlipped) ? 'flipped' : ''}`}>
                    {/* Front Side */}
                    <div className="flip-card-front">
                      <div className="card-shine"></div>
                      <div className="card-gradient-bg"></div>
                      
                      <div className="card-header">
                        <div className="card-icon-wrapper">
                          <div className="card-icon" style={{ background: exp.color }}>
                            <span>{exp.icon}</span>
                          </div>
                        </div>
                        <div className="card-badge">{exp.duration}</div>
                      </div>

                      <div className="card-body">
                        <h3 className="card-company">{exp.company}</h3>
                        <p className="card-location">
                          <svg className="location-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                            <circle cx="12" cy="10" r="3"/>
                          </svg>
                          {exp.location}
                        </p>
                        <div className="card-role-wrapper">
                          <span className="card-role">{exp.role}</span>
                        </div>
                        
                        <div className="card-tech-preview">
                          {exp.technologies.slice(0, 4).map((tech, idx) => (
                            <span key={idx} className="tech-preview-tag">{tech}</span>
                          ))}
                          {exp.technologies.length > 4 && (
                            <span className="tech-preview-more">+{exp.technologies.length - 4}</span>
                          )}
                        </div>
                      </div>

                      <div className="card-footer">
                        <span className="flip-hint">
                          {isTouchDevice.current ? 'Tap to flip →' : 'Hover to explore →'}
                        </span>
                        <div 
                          className={`card-arrow ${isTouchDevice.current ? 'bounce-arrow' : ''}`}
                          onClick={(e) => handleArrowClick(e, exp.id)}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Back Side */}
                    <div className="flip-card-back">
                      <div className="card-shine"></div>
                      <div className="back-gradient"></div>
                      
                      <div className="back-header">
                        <span className="back-achievement">🏆</span>
                        <span className="back-achievement-text">{exp.achievement}</span>
                      </div>

                      <div className="back-body">
                        <h4 className="back-title">Key Responsibilities</h4>
                        <ul className="back-responsibilities">
                          {exp.responsibilities.map((item, idx) => (
                            <li key={idx}>
                              <span className="bullet-point"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="back-footer">
                        <div className="back-tech-stack">
                          {exp.technologies.map((tech, idx) => (
                            <span key={idx} className="back-tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section - Single Row for all devices */}
        <div className="exp-stats">
          <div className="stat-item">
            <span className="stat-number">2+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Projects Delivered</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Client Satisfaction</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
