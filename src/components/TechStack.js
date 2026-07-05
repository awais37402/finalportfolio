import React, { useEffect, useState } from 'react';
import './TechStack.css';

const TechStack = () => {
  const [visibleSections, setVisibleSections] = useState([]);

  // Technology data structure - Removed Mobile, Design, Tools
  const techData = {
    frontend: {
      title: 'Frontend',
      icon: '🎨',
      technologies: [
        { name: 'HTML5', icon: '🌐', experience: '5+ Years', level: 'Advanced' },
        { name: 'CSS3', icon: '🎨', experience: '5+ Years', level: 'Advanced' },
        { name: 'JavaScript', icon: '⚡', experience: '5+ Years', level: 'Advanced' },
        { name: 'React.js', icon: '⚛️', experience: '4+ Years', level: 'Advanced', core: true },
        { name: 'Next.js', icon: '▲', experience: '3+ Years', level: 'Advanced', core: true },
        { name: 'Redux', icon: '🔄', experience: '3+ Years', level: 'Intermediate' },
        { name: 'Tailwind CSS', icon: '🎯', experience: '3+ Years', level: 'Advanced' },
        { name: 'Bootstrap', icon: '📱', experience: '4+ Years', level: 'Advanced' },
      ]
    },
    backend: {
      title: 'Backend',
      icon: '⚙️',
      technologies: [
        { name: 'Node.js', icon: '🟢', experience: '4+ Years', level: 'Advanced' },
        { name: 'Express.js', icon: '🚂', experience: '4+ Years', level: 'Advanced' },
        { name: 'PHP', icon: '🐘', experience: '3+ Years', level: 'Intermediate' },
      ]
    },
    database: {
      title: 'Database',
      icon: '🗄️',
      technologies: [
        { name: 'MongoDB', icon: '🍃', experience: '4+ Years', level: 'Advanced' },
        { name: 'MySQL', icon: '🐬', experience: '3+ Years', level: 'Intermediate' },
        { name: 'Firebase', icon: '🔥', experience: '3+ Years', level: 'Advanced' },
      ]
    }
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionKey = entry.target.dataset.section;
            setVisibleSections(prev => [...new Set([...prev, sectionKey])]);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const sections = document.querySelectorAll('.tech-category');
    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const getLevelBadgeClass = (level) => {
    switch(level) {
      case 'Advanced': return 'level-advanced';
      case 'Intermediate': return 'level-intermediate';
      default: return 'level-beginner';
    }
  };

  return (
    <section className="tech-stack-section" id="tech-stack">
      {/* Background Effects */}
      <div className="tech-bg-effects">
        <div className="tech-glow tech-glow-1"></div>
        <div className="tech-glow tech-glow-2"></div>
        <div className="tech-glow tech-glow-3"></div>
        <div className="tech-particles">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="particle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${15 + Math.random() * 20}s`,
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`
            }}></div>
          ))}
        </div>
      </div>

      <div className="tech-container">
        {/* Section Header */}
        <div className="tech-header">
          <div className="tech-badge">✦ Tech Stack</div>
          <h2 className="tech-title">
            Technologies I <span className="highlight">Work With</span>
          </h2>
          <p className="tech-subtitle">
            A comprehensive overview of my technical expertise and tools
          </p>
          <div className="tech-header-line"></div>
        </div>

        {/* Tech Categories */}
        <div className="tech-categories">
          {Object.entries(techData).map(([key, category], index) => (
            <div 
              key={key} 
              className={`tech-category ${visibleSections.includes(key) ? 'visible' : ''}`}
              data-section={key}
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="category-header">
                <span className="category-icon">{category.icon}</span>
                <h3 className="category-title">{category.title}</h3>
                <span className="category-count">{category.technologies.length}</span>
              </div>

              <div className="tech-grid">
                {category.technologies.map((tech, techIndex) => (
                  <div 
                    key={techIndex} 
                    className={`tech-card ${tech.core ? 'core-card' : ''}`}
                    style={{ animationDelay: `${techIndex * 0.05}s` }}
                  >
                    <div className="tech-card-inner">
                      <div className="tech-icon">{tech.icon}</div>
                      <h4 className="tech-name">{tech.name}</h4>
                      <div className="tech-details">
                        <span className="tech-experience">{tech.experience}</span>
                        <span className={`tech-level ${getLevelBadgeClass(tech.level)}`}>
                          {tech.level}
                        </span>
                      </div>
                      {tech.core && (
                        <div className="core-badge">⭐ Core</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;