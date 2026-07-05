import React, { useEffect, useRef, useState } from 'react';
import './Experience.css';

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  const experiences = [
    {
      id: 1,
      company: 'Bassr Company',
      location: 'Islamabad, Pakistan',
      role: 'Web Developer',
      duration: '1 Year',
      initials: 'B',
      responsibilities: [
        'Developed responsive and user-friendly websites.',
        'Built modern interfaces using HTML, CSS, JavaScript, and React.js.',
        'Converted UI/UX designs into functional web pages.',
        'Optimized website performance and fixed bugs.',
        'Collaborated with designers and team members on client projects.'
      ],
      technologies: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'Git']
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Animate timeline line
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

  return (
    <section className="experience-section" id="experience" ref={sectionRef}>
      {/* Background Effects */}
      <div className="exp-bg-effects">
        <div className="exp-glow exp-glow-1"></div>
        <div className="exp-glow exp-glow-2"></div>
        <div className="exp-glow exp-glow-3"></div>
      </div>

      <div className="exp-container">
        {/* Section Header */}
        <div className="exp-header">
          <span className="exp-badge">✦ Experience</span>
          <h2 className="exp-title">
            My <span className="highlight">Journey</span>
          </h2>
          <p className="exp-subtitle">
            My professional journey as a developer.
          </p>
          <div className="exp-header-line"></div>
        </div>

        {/* Timeline */}
        <div className="exp-timeline">
          {/* Timeline Line */}
          <div className="timeline-line-wrapper">
            <div className="timeline-line" ref={timelineRef}></div>
          </div>

          {/* Experience Items */}
          {experiences.map((exp, index) => (
            <div 
              key={exp.id} 
              className={`exp-item ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              {/* Timeline Dot */}
              <div className="timeline-dot-wrapper">
                <div className="timeline-dot">
                  <div className="dot-pulse"></div>
                </div>
              </div>

              {/* Experience Card */}
              <div className="exp-card">
                <div className="exp-card-inner">
                  {/* Icon */}
                  <div className="exp-icon">
                    <span className="exp-initials">{exp.initials}</span>
                  </div>

                  {/* Content */}
                  <div className="exp-content">
                    <div className="exp-head">
                      <div>
                        <h3 className="exp-company">{exp.company}</h3>
                        <span className="exp-location">{exp.location}</span>
                      </div>
                      <div className="exp-meta">
                        <span className="exp-role">{exp.role}</span>
                        <span className="exp-duration">{exp.duration}</span>
                      </div>
                    </div>

                    <div className="exp-body">
                      <h4 className="exp-responsibilities-title">Responsibilities:</h4>
                      <ul className="exp-responsibilities">
                        {exp.responsibilities.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="exp-tech">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="exp-tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;