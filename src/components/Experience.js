import React, { useState, useRef, useEffect } from 'react';
import './Experience.css';

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
    color: '#ffd200',
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

const Experience = () => {
  const [activeId, setActiveId] = useState(experiences[0].id);
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const progress = Math.min(Math.max((rect.top * -1) / (rect.height - windowHeight), 0), 1);
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const activeExp = experiences.find(exp => exp.id === activeId);

  return (
    <section className="experience-section" ref={sectionRef}>
      <div className="experience-progress-bar" style={{ transform: `scaleX(${scrollProgress})` }} />
      
      <div className="experience-container">
        <div className="experience-header">
          <span className="experience-badge">✦ My Journey</span>
          <h2 className="experience-title">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="experience-subtitle">
            Crafting digital experiences & engineering solutions with passion
          </p>
        </div>

        <div className="experience-grid">
          <div className="timeline-wrapper">
            <div className="timeline-line">
              {experiences.map((exp) => (
                <div
                  key={exp.id}
                  className={`timeline-item ${activeId === exp.id ? 'active' : ''}`}
                  onClick={() => setActiveId(exp.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveId(exp.id)}
                >
                  <div 
                    className="timeline-dot"
                    style={{ 
                      background: activeId === exp.id ? exp.color : '#1a1a1a',
                      boxShadow: activeId === exp.id ? `0 0 60px ${exp.color}40, 0 0 120px ${exp.color}20` : 'none',
                      borderColor: activeId === exp.id ? exp.color : 'rgba(255,255,255,0.06)'
                    }}
                  >
                    <span className="timeline-icon">{exp.icon}</span>
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-company" style={{ color: activeId === exp.id ? exp.color : '#888' }}>
                      {exp.company}
                    </div>
                    <div className="timeline-role">{exp.role}</div>
                    <div className="timeline-duration">{exp.duration}</div>
                    {activeId === exp.id && (
                      <div className="timeline-indicator">▶</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {activeExp && (
            <div className="details-wrapper">
              <div 
                className="details-card"
                style={{
                  borderColor: activeExp.color,
                }}
              >
                <div className="details-glow-container">
                  <div 
                    className="details-glow"
                    style={{ 
                      background: `radial-gradient(circle at 30% 20%, ${activeExp.color}30, transparent 70%)` 
                    }}
                  />
                  <div 
                    className="details-glow-secondary"
                    style={{ 
                      background: `radial-gradient(circle at 70% 80%, ${activeExp.color === '#f7971e' ? '#ffd200' : '#f7971e'}20, transparent 70%)` 
                    }}
                  />
                </div>

                <div className="details-header">
                  <div 
                    className="details-icon-wrapper"
                    style={{ 
                      background: `${activeExp.color}15`, 
                      borderColor: `${activeExp.color}25`,
                      boxShadow: `0 0 40px ${activeExp.color}10`
                    }}
                  >
                    <span className="details-icon">{activeExp.icon}</span>
                  </div>
                  <div className="details-title-group">
                    <h3 className="details-company" style={{ color: activeExp.color }}>
                      {activeExp.company}
                    </h3>
                    <p className="details-location">{activeExp.location}</p>
                  </div>
                  <div 
                    className="details-achievement-badge"
                    style={{ 
                      background: `${activeExp.color}12`, 
                      color: activeExp.color,
                      borderColor: `${activeExp.color}25`
                    }}
                  >
                    🏆 {activeExp.achievement}
                  </div>
                </div>

                <div className="details-body">
                  <div className="details-role-section">
                    <span className="details-role-badge" style={{ color: activeExp.color, background: `${activeExp.color}12` }}>
                      Current Role
                    </span>
                    <h4 className="details-role-title">{activeExp.role}</h4>
                    <span className="details-duration">{activeExp.duration}</span>
                  </div>

                  <div className="details-responsibilities">
                    <h5 className="section-label">Key Responsibilities</h5>
                    <ul className="responsibilities-list">
                      {activeExp.responsibilities.map((item, idx) => (
                        <li key={idx} className="responsibility-item">
                          <span 
                            className="bullet-point"
                            style={{ background: activeExp.color }}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="details-technologies">
                    <h5 className="section-label">Tech Stack</h5>
                    <div className="tech-tags">
                      {activeExp.technologies.map((tech, idx) => (
                        <span 
                          key={idx} 
                          className="tech-tag"
                          style={{ 
                            background: `${activeExp.color}12`,
                            color: activeExp.color,
                            borderColor: `${activeExp.color}25`
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Experience;