import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './Projects.css';

// Import project videos
import project1Video from '../assets/videos/project1.mp4';
import project2Video from '../assets/videos/project2.mp4';
import project3Video from '../assets/videos/project3.mp4';
import project4Video from '../assets/videos/project4.mp4';
import project5Video from '../assets/videos/project5.mp4';
import project6Video from '../assets/videos/project6.mp4';

// Import project thumbnails
import project1Thumb from '../assets/thumbnails/project1.png';
import project2Thumb from '../assets/thumbnails/project2.png';
import project3Thumb from '../assets/thumbnails/project3.png';
import project4Thumb from '../assets/thumbnails/project4.png';
import project5Thumb from '../assets/thumbnails/project5.png';
import project6Thumb from '../assets/thumbnails/project6.png';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const cardRefs = useRef([]);
  const videoRef = useRef(null);
  const observerRef = useRef(null);

  const projects = useMemo(() => [
    {
      id: 1,
      title: 'Luxury Watches Store',
      category: 'Full Stack',
      description: 'A modern full-stack eCommerce website for buying luxury watches with secure authentication, product management, and a seamless shopping experience.',
      video: project1Video,
      thumbnail: project1Thumb,
      technologies: [
        'React.js',
        'Node.js',
        'Express.js',
        'MongoDB',
        'JWT',
        'CSS3'
      ],
      features: [
        'Secure Authentication',
        'Shopping Cart',
        'Product Management',
        'Order Management'
      ],
      liveDemo: 'https://example.com/project1',
      github: 'https://github.com/awais37402/watch'
    },
    {
      id: 2,
      title: 'AI Resume Builder',
      category: 'React',
      description: 'A SaaS-based AI resume builder that generates professional CVs from basic user information in seconds.',
      video: project2Video,
      thumbnail: project2Thumb,
      technologies: ['React.js', 'JavaScript', 'CSS3', 'HTML5'],
      features: [
        'AI CV Generation',
        'Professional Templates',
        'Instant Preview',
        'Responsive Design'
      ],
      liveDemo: 'https://example.com/project2',
      github: 'https://github.com/awais37402/resume'
    },
    {
      id: 3,
      title: 'Portfolio Website',
      category: 'Frontend',
      description: 'A modern and responsive portfolio website with smooth animations and interactive elements.',
      video: project3Video,
      thumbnail: project3Thumb,
      technologies: ['React', 'Framer Motion', 'CSS3'],
      features: ['Smooth Animations', 'Responsive Design', 'Dark Mode', 'Interactive UI'],
      liveDemo: 'https://example.com/project3',
      github: 'https://github.com/yourusername/project3'
    },
    {
      id: 4,
      title: 'Weather Dashboard',
      category: 'API Integration',
      description: 'A weather forecasting application with interactive maps and real-time weather data.',
      video: project4Video,
      thumbnail: project4Thumb,
      technologies: ['React', 'OpenWeather API', 'Leaflet.js'],
      features: ['Real-time Weather', 'Interactive Maps', '7-day Forecast', 'Location Search'],
      liveDemo: 'https://example.com/project4',
      github: 'https://github.com/yourusername/project4'
    },
    {
      id: 5,
      title: 'Social Media App',
      category: 'Full Stack',
      description: 'A social media platform with posts, comments, likes, and real-time notifications.',
      video: project5Video,
      thumbnail: project5Thumb,
      technologies: ['React', 'Node.js', 'Socket.io', 'PostgreSQL'],
      features: ['Real-time Chat', 'Post Creation', 'Comment System', 'Notifications'],
      liveDemo: 'https://example.com/project5',
      github: 'https://github.com/yourusername/project5'
    },
    {
      id: 6,
      title: 'Food Delivery App',
      category: 'Mobile',
      description: 'A food delivery application with restaurant search, ordering, and tracking features.',
      video: project6Video,
      thumbnail: project6Thumb,
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Google Maps'],
      features: ['Restaurant Search', 'Order Tracking', 'Payment Integration', 'Rating System'],
      liveDemo: 'https://example.com/project6',
      github: 'https://github.com/yourusername/project6'
    }
  ], []);

  // Intersection Observer for scroll animations - optimized
  useEffect(() => {
    if ('IntersectionObserver' in window) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = parseInt(entry.target.dataset.index);
              setVisibleCards(prev => {
                if (!prev.includes(index)) {
                  return [...prev, index];
                }
                return prev;
              });
            }
          });
        },
        {
          threshold: 0.05,
          rootMargin: '0px 0px -30px 0px'
        }
      );

      cardRefs.current.forEach((ref) => {
        if (ref) observerRef.current.observe(ref);
      });
    } else {
      // Fallback: show all cards immediately
      setVisibleCards(projects.map((_, i) => i));
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [projects]);

  // 3D Tilt Effect - optimized with requestAnimationFrame
  const handleMouseMove = useCallback((e, card) => {
    if (!card) return;
    
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    // Use requestAnimationFrame for smooth performance
    requestAnimationFrame(() => {
      card.style.transform = `perspective(800px) rotateX(${y * -6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
    });
  }, []);

  const handleMouseLeave = useCallback((card) => {
    if (!card) return;
    card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
  }, []);

  const openModal = useCallback((project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    setVideoLoaded(false);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setVideoLoaded(false);
    document.body.style.overflow = 'auto';
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true);
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isModalOpen) {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isModalOpen, closeModal]);

  return (
    <section className="projects-section" id="projects">
      {/* Animated Background Elements */}
      <div className="projects-bg-elements">
        <div className="bg-circle bg-circle-1"></div>
        <div className="bg-circle bg-circle-2"></div>
        <div className="bg-circle bg-circle-3"></div>
      </div>

      <div className="projects-container">
        <div className="projects-header">
          <div className="header-badge">✦ Featured</div>
          <h2 className="section-title">
            <span className="highlight">Featured</span> Projects
          </h2>
          <p className="section-subtitle">
            A selection of projects I've designed and developed.
          </p>
          <div className="header-line"></div>
        </div>

        <div className="projects-grid">
          {projects.map((project, index) => (
            <div 
              key={project.id} 
              className={`project-card ${visibleCards.includes(index) ? 'visible' : ''}`}
              ref={el => cardRefs.current[index] = el}
              data-index={index}
              style={{ transitionDelay: `${index * 0.06}s` }}
              onClick={() => openModal(project)}
              onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
              onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
            >
              <div className="project-thumbnail">
                <img 
                  src={project.thumbnail} 
                  alt={project.title} 
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <div className="play-overlay">
                  <div className="play-button">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <div className="project-category">{project.category}</div>
              </div>
              <div className="project-info">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-hover-line"></div>
                <button className="project-view-btn">View Project →</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Preview Modal */}
      {isModalOpen && selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal} aria-label="Close modal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
            
            <div className="modal-video-container">
              {!videoLoaded && (
                <div className="video-loader">
                  <div className="loader-spinner"></div>
                  <span>Loading video...</span>
                </div>
              )}
              <video 
                ref={videoRef}
                src={selectedProject.video} 
                controls 
                autoPlay
                className="modal-video"
                poster={selectedProject.thumbnail}
                onLoadedData={handleVideoLoad}
                style={{ display: videoLoaded ? 'block' : 'none' }}
                preload="metadata"
              />
              <div className="video-glow"></div>
            </div>

            <div className="modal-info">
              <div className="modal-header">
                <div>
                  <h2 className="modal-title">{selectedProject.title}</h2>
                  <span className="modal-category">{selectedProject.category}</span>
                </div>
                <div className="modal-id">#{String(selectedProject.id).padStart(2, '0')}</div>
              </div>
              
              <p className="modal-description">{selectedProject.description}</p>
              
              <div className="modal-features">
                <h4>✨ Features</h4>
                <ul>
                  {selectedProject.features.map((feature, index) => (
                    <li key={index}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-tech">
                <h4>🛠️ Technologies</h4>
                <div className="tech-tags">
                  {selectedProject.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-actions">
                <a href={selectedProject.liveDemo} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  <span>Live Demo</span>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                  </svg>
                </a>
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  <span>GitHub</span>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;