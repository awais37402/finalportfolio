import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import './Projects.css';

// Import GSAP
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import project videos
import project1Video from '../assets/videos/project1.mp4';
import project2Video from '../assets/videos/project2.mp4';
import project3Video from '../assets/videos/project3.mp4';
import project4Video from '../assets/videos/project4.mp4';
import project5Video from '../assets/videos/project5.mp4';

// Import project thumbnails
import project1Thumb from '../assets/thumbnails/project1.png';
import project2Thumb from '../assets/thumbnails/project2.png';
import project3Thumb from '../assets/thumbnails/project3.png';
import project4Thumb from '../assets/thumbnails/project4.png';
import project5Thumb from '../assets/thumbnails/project5.png';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);
  const sectionsRef = useRef([]);
  const videoRefs = useRef({});
  const [loading, setLoading] = useState(true);
  const [playingStates, setPlayingStates] = useState({});
  const [progressStates, setProgressStates] = useState({});
  const [showControls, setShowControls] = useState({});

  // Complete project data - 5 Projects
  const projectData = useMemo(() => [
    {
      id: 1,
      title: 'Luxury Watches Store',
      category: 'FULL STACK',
      description: 'A modern full-stack eCommerce website for buying luxury watches with secure authentication, product management, and a seamless shopping experience.',
      video: project1Video,
      thumbnail: project1Thumb,
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'CSS3'],
      color: '#FF6B6B',
      icon: '⌚'
    },
    {
      id: 2,
      title: 'AI Resume Builder',
      category: 'REACT',
      description: 'A SaaS-based AI resume builder that generates professional CVs from basic user information in seconds.',
      video: project2Video,
      thumbnail: project2Thumb,
      technologies: ['React.js', 'JavaScript', 'CSS3', 'HTML5'],
      color: '#4ECDC4',
      icon: '📄'
    },
    {
      id: 3,
      title: 'Dental Clinic Website',
      category: 'FRONTEND',
      description: 'A modern and responsive dental clinic website built with React.js, featuring a clean design, smooth navigation, and an appointment-focused user experience.',
      video: project3Video,
      thumbnail: project3Thumb,
      technologies: ['React.js', 'CSS3', 'JavaScript'],
      color: '#45B7D1',
      icon: '🦷'
    },
    {
      id: 4,
      title: 'Order Management System',
      category: 'FULL-STACK WEB APPLICATION',
      description: 'A complete watch e-commerce order management system where customers can browse watches, place orders, and administrators can manage products, customers, and orders through a secure admin dashboard.',
      video: project4Video,
      thumbnail: project4Thumb,
      technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS', 'Bootstrap'],
      color: '#96CEB4',
      icon: '⌚'
    },
    {
      id: 5,
      title: 'E-Learning Platform',
      category: 'MERN STACK',
      description: 'A comprehensive e-learning platform with course management, video streaming, student progress tracking, and interactive quizzes.',
      video: project5Video,
      thumbnail: project5Thumb,
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
      color: '#9B59B6',
      icon: '📚'
    }
  ], []);

  // Toggle video playback
  const toggleVideo = useCallback((projectId, e) => {
    e.stopPropagation();
    const video = videoRefs.current[projectId];
    if (!video) return;

    if (video.paused) {
      // Pause all other videos
      Object.keys(videoRefs.current).forEach((key) => {
        if (key !== projectId) {
          const otherVideo = videoRefs.current[key];
          if (otherVideo && !otherVideo.paused) {
            otherVideo.pause();
            setPlayingStates(prev => ({ ...prev, [key]: false }));
          }
        }
      });
      
      video.play()
        .then(() => {
          setPlayingStates(prev => ({ ...prev, [projectId]: true }));
          // Show pause button briefly
          setShowControls(prev => ({ ...prev, [projectId]: true }));
          setTimeout(() => {
            setShowControls(prev => ({ ...prev, [projectId]: false }));
          }, 2000);
        })
        .catch(() => {
          setPlayingStates(prev => ({ ...prev, [projectId]: false }));
        });
    } else {
      video.pause();
      setPlayingStates(prev => ({ ...prev, [projectId]: false }));
      setShowControls(prev => ({ ...prev, [projectId]: true }));
    }
  }, []);

  // Handle video click
  const handleVideoClick = useCallback((projectId, e) => {
    e.stopPropagation();
    const video = videoRefs.current[projectId];
    if (!video) return;
    
    if (!video.paused) {
      // If playing, toggle controls visibility
      setShowControls(prev => ({ 
        ...prev, 
        [projectId]: !prev[projectId] 
      }));
      // Auto hide after 2 seconds if showing
      if (!showControls[projectId]) {
        setTimeout(() => {
          setShowControls(prev => ({ ...prev, [projectId]: false }));
        }, 2000);
      }
    } else {
      toggleVideo(projectId, e);
    }
  }, [toggleVideo, showControls]);

  // Update progress
  const updateProgress = useCallback((projectId) => {
    const video = videoRefs.current[projectId];
    if (!video) return;
    
    const progress = (video.currentTime / video.duration) * 100;
    setProgressStates(prev => ({ ...prev, [projectId]: progress }));
  }, []);

  // Set projects on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Initialize states
  useEffect(() => {
    if (!loading) {
      const initialStates = {};
      const initialProgress = {};
      const initialControls = {};
      projectData.forEach(project => {
        initialStates[project.id] = false;
        initialProgress[project.id] = 0;
        initialControls[project.id] = false;
      });
      setPlayingStates(initialStates);
      setProgressStates(initialProgress);
      setShowControls(initialControls);
    }
  }, [loading, projectData]);

  // Video event listeners - FIXED VERSION
  useEffect(() => {
    if (loading) return;

    // Capture the current ref ONCE
    const videos = videoRefs.current;

    const videoElements = Object.keys(videos).map((key) => ({
      id: key,
      element: videos[key],
    }));

    const handlers = videoElements.map(({ id, element }) => {
      if (!element) return null;

      const onTimeUpdate = () => updateProgress(id);
      const onPlay = () => {
        setPlayingStates(prev => ({ ...prev, [id]: true }));
        setShowControls(prev => ({ ...prev, [id]: true }));

        setTimeout(() => {
          setShowControls(prev => ({ ...prev, [id]: false }));
        }, 2000);
      };
      const onPause = () => {
        setPlayingStates(prev => ({ ...prev, [id]: false }));
        setShowControls(prev => ({ ...prev, [id]: true }));
      };
      const onEnded = () => {
        setPlayingStates(prev => ({ ...prev, [id]: false }));
        setProgressStates(prev => ({ ...prev, [id]: 0 }));
        element.currentTime = 0;
        setShowControls(prev => ({ ...prev, [id]: true }));
      };

      element.addEventListener("timeupdate", onTimeUpdate);
      element.addEventListener("play", onPlay);
      element.addEventListener("pause", onPause);
      element.addEventListener("ended", onEnded);

      return {
        element,
        onTimeUpdate,
        onPlay,
        onPause,
        onEnded,
      };
    });

    return () => {
      handlers.forEach((handler) => {
        if (!handler) return;

        const {
          element,
          onTimeUpdate,
          onPlay,
          onPause,
          onEnded,
        } = handler;

        element.removeEventListener("timeupdate", onTimeUpdate);
        element.removeEventListener("play", onPlay);
        element.removeEventListener("pause", onPause);
        element.removeEventListener("ended", onEnded);
      });
    };
  }, [loading, updateProgress]);

  // GSAP Horizontal Scroll Animation
  useEffect(() => {
    if (loading || projectData.length === 0) return;

    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      const header = document.querySelector('header') || document.querySelector('.header') || document.querySelector('nav');
      const headerHeight = header ? header.offsetHeight : 0;
      
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);

      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      const sections = sectionsRef.current.filter(el => el !== null);
      
      const panelCount = sections.length;
      container.style.width = `${panelCount * 100}vw`;
      container.style.display = 'flex';
      container.style.position = 'relative';
      container.style.height = '100vh';

      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          pinSpacing: true,
          scrub: 0.5,
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: 0.3,
            ease: "power1.inOut"
          },
          end: `+=${container.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true
        }
      });

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);

      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, 150);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [loading, projectData]);

  if (loading) {
    return (
      <div className="projects-loading">
        <div className="loader"></div>
        <p>Loading amazing projects...</p>
      </div>
    );
  }

  return (
    <div id="projects" className="projects-wrapper">
      {/* Intro Section */}
      <div className="projects-intro-section">
        <div className="intro-content">
          <h2>Explore My Work</h2>
          <div className="project-stats">
            <span>🎨 Creative</span>
            <span>💡 Innovative</span>
            <span>🚀 Modern</span>
          </div>
        </div>
      </div>

      {/* Horizontal Scrolling Projects */}
      <div className="projects-container" ref={containerRef}>
        {projectData.map((project, index) => {
          const isPlaying = playingStates[project.id] || false;
          const progress = progressStates[project.id] || 0;
          const showControl = showControls[project.id] || false;
          
          return (
            <section 
              key={project.id}
              className="panel project-panel"
              ref={el => sectionsRef.current[index] = el}
            >
              <div className="project-card">
                {/* Video Section */}
                <div 
                  className="project-media"
                  onClick={(e) => handleVideoClick(project.id, e)}
                >
                  <video 
                    ref={el => videoRefs.current[project.id] = el}
                    src={project.video}
                    poster={project.thumbnail}
                    muted
                    loop={false}
                    playsInline
                    className="project-video"
                  />
                  
                  {/* Play Button - Shows when video is paused */}
                  <button 
                    className={`video-play-btn ${!isPlaying ? 'show' : ''}`}
                    onClick={(e) => toggleVideo(project.id, e)}
                    aria-label="Play video"
                  >
                    ▶
                  </button>

                  {/* Pause Button - Shows on hover when playing OR click */}
                  <button 
                    className={`video-pause-btn ${isPlaying ? 'show-on-hover' : ''} ${isPlaying && showControl ? 'show' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      const video = videoRefs.current[project.id];
                      if (video) {
                        video.pause();
                        setPlayingStates(prev => ({ ...prev, [project.id]: false }));
                        setShowControls(prev => ({ ...prev, [project.id]: true }));
                      }
                    }}
                    aria-label="Pause video"
                  >
                    ⏸
                  </button>

                  {/* Progress Bar */}
                  <div className="video-progress">
                    <div 
                      className="video-progress-bar" 
                      style={{ width: `${progress}%` }}
                    />
                  </div>

                  {/* Status Badge */}
                  <div className="video-status">
                    <span className={`status-dot ${isPlaying ? 'playing' : 'paused'}`} />
                    {isPlaying ? 'Playing' : 'Paused'}
                  </div>
                </div>
                
                {/* Content */}
                <div className="project-content">
                  <div className="project-header">
                    <div className="project-icon" style={{ background: project.color }}>
                      <span>{project.icon}</span>
                    </div>
                    <h3 className="project-title">{project.title}</h3>
                  </div>
                  
                  <p className="project-description">{project.description}</p>
                  
                  <div className="project-tech">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="tech-tag" style={{ borderColor: project.color }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        })}

        {/* Outro Panel */}
        <div className="panel outro-panel">
          <div className="outro-content">
            <h2>Let's Build Something Amazing!</h2>
            <p>Interested in working together?</p>
            <button className="contact-btn">Get in Touch</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;