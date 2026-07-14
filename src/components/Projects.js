import React, { useEffect, useRef, useState, useMemo } from 'react';
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

  // Complete project data - 5 Projects (wrapped with useMemo to prevent recreation)
  const projectData = useMemo(() => [
    {
      id: 1,
      title: 'Luxury Watches Store',
      category: 'FULL STACK',
      description: 'A modern full-stack eCommerce website for buying luxury watches with secure authentication, product management, and a seamless shopping experience.',
      video: project1Video,
      thumbnail: project1Thumb,
      technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'CSS3'],
      features: ['Secure Authentication', 'Shopping Cart', 'Product Management', 'Order Management'],
      liveDemo: 'https://example.com/project1',
      github: 'https://github.com/awais37402/watch',
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
      features: ['AI CV Generation', 'Professional Templates', 'Instant Preview', 'Responsive Design'],
      liveDemo: 'https://example.com/project2',
      github: 'https://github.com/awais37402/resume',
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
      features: ['Responsive Design', 'Online Appointment Section', 'Modern UI/UX', 'Smooth Navigation'],
      liveDemo: 'https://example.com/project3',
      github: 'https://github.com/yourusername/project3',
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
      features: [
        'User Registration & Login',
        'Watch Product Catalog',
        'Shopping Cart',
        'Secure Checkout',
        'Order Tracking',
        'Admin Dashboard',
        'Order Management',
        'Product Management'
      ],
      liveDemo: 'https://example.com/project4',
      github: 'https://github.com/yourusername/order-management-system',
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
      features: ['Course Management', 'Video Streaming', 'Progress Tracking', 'Interactive Quizzes', 'Live Chat'],
      liveDemo: 'https://example.com/project5',
      github: 'https://github.com/yourusername/project5',
      color: '#9B59B6',
      icon: '📚'
    }
  ], []);

  // Handle video play/pause on click
  const handleVideoClick = (projectId) => {
    const video = videoRefs.current[projectId];
    if (video) {
      if (video.paused) {
        // Pause all other videos
        Object.keys(videoRefs.current).forEach((key) => {
          if (key !== projectId) {
            const otherVideo = videoRefs.current[key];
            if (otherVideo && !otherVideo.paused) {
              otherVideo.pause();
            }
          }
        });
        // Play this video
        video.play();
      } else {
        video.pause();
      }
    }
  };

  // Set projects on load
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Auto-play videos when they become visible
  useEffect(() => {
    if (loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const videoElement = entry.target;
          if (entry.isIntersecting) {
            // Pause all other videos
            Object.keys(videoRefs.current).forEach((key) => {
              const otherVideo = videoRefs.current[key];
              if (otherVideo && otherVideo !== videoElement && !otherVideo.paused) {
                otherVideo.pause();
              }
            });
            // Play this video
            videoElement.play().catch(() => {
              // Autoplay might be blocked, handle silently
            });
          } else {
            // Pause video when not visible
            if (!videoElement.paused) {
              videoElement.pause();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    // Observe all video elements
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        observer.observe(video);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [loading]);

  // GSAP Horizontal Scroll Animation
  useEffect(() => {
    if (loading || projectData.length === 0) return;

    const timer = setTimeout(() => {
      const container = containerRef.current;
      if (!container) return;

      // Get header height dynamically
      const header = document.querySelector('header') || document.querySelector('.header');
      const headerHeight = header ? header.offsetHeight : 70;
      
      // Set CSS variable for header height
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);

      // Kill any existing ScrollTriggers
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());

      const sections = sectionsRef.current.filter(el => el !== null);
      
      // Set container width based on number of panels
      const panelCount = sections.length + 2; // +2 for intro and outro
      container.style.width = `${panelCount * 100}vw`;
      container.style.display = 'flex';
      container.style.position = 'relative';
      container.style.height = '100vh';

      // Create horizontal scroll animation (removed unused variable)
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          pin: true,
          pinSpacing: true,
          scrub: 0.5, // Faster sliding
          snap: {
            snapTo: 1 / (sections.length - 1),
            duration: 0.3,
            ease: "power1.inOut"
          },
          end: `+=${container.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true
        }
      });

      // Refresh ScrollTrigger
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);

      // Handle resize
      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, 150);

    // Cleanup
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
    <div className="projects-wrapper">
      <div className="projects-container" ref={containerRef}>
        {/* First Panel - Introduction */}
        <div className="panel intro-panel">
          <div className="intro-content">
            <h2>Explore My Work</h2>
            <div className="project-stats">
              <span>🎨 Creative</span>
              <span>💡 Innovative</span>
              <span>🚀 Modern</span>
            </div>
          </div>
        </div>

        {/* Project Panels */}
        {projectData.map((project, index) => (
          <section 
            key={project.id}
            className="panel project-panel"
            ref={el => sectionsRef.current[index] = el}
          >
            <div className="project-card">
              {/* Video/Thumbnail - Click to play/pause */}
              <div 
                className="project-media"
                onClick={() => handleVideoClick(project.id)}
              >
                <video 
                  ref={el => videoRefs.current[project.id] = el}
                  src={project.video}
                  poster={project.thumbnail}
                  muted
                  loop
                  playsInline
                  className="project-video"
                  autoPlay
                />
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
        ))}

        {/* Last Panel - Conclusion */}
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