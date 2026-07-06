import React, { useState, useEffect, useRef } from 'react';
import './me.css';

const Me = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const isMobile = window.innerWidth <= 768;

  const socialLinks = [
    {
      id: 1,
      name: 'GitHub',
      url: 'https://github.com/awais37402',
      color: '#333',
      x: isMobile ? -55 : -95,
      y: isMobile ? -35 : -60,
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
        </svg>
      )
    },
    {
      id: 2,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/awais-tahir-037245253/',
      color: '#0A66C2',
      x: isMobile ? -20 : -45,
      y: isMobile ? -70 : -120,
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    },
    {
      id: 3,
      name: 'WhatsApp',
      url: 'https://wa.me/923213762964',
      color: '#25D366',
      x: isMobile ? -60 : -110,
      y: isMobile ? 10 : 10,
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884"/>
        </svg>
      )
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="me-container" ref={menuRef}>
      {/* Social Icons - Fixed Positions */}
      <div className={`social-cluster ${isOpen ? 'active' : ''}`}>
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-item ${isOpen ? 'visible' : ''}`}
            style={{
              '--x': `${link.x}px`,
              '--y': `${link.y}px`,
              '--delay': `${(link.id - 1) * 0.1}s`,
              '--bg': link.color
            }}
            aria-label={link.name}
          >
            <div className="social-icon-wrapper" style={{ '--hover-color': link.color }}>
              {link.icon}
            </div>
            <span className="social-name">{link.name}</span>
          </a>
        ))}
      </div>

      {/* Main toggle button */}
      <button 
        className={`me-toggle-btn ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle social menu"
      >
        {isOpen ? (
          <svg className="close-icon" viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg className="main-icon" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" strokeLinejoin="round"/>
            <path d="M12 2L13.5 9.5L21 11L13.5 12.5L12 20L10.5 12.5L3 11L10.5 9.5L12 2Z" fill="currentColor" fillOpacity="0.15"/>
            <circle cx="18.5" cy="5.5" r="1.5" fill="currentColor" fillOpacity="0.4"/>
            <circle cx="5.5" cy="18.5" r="1.5" fill="currentColor" fillOpacity="0.4"/>
            <circle cx="19.5" cy="18.5" r="1" fill="currentColor" fillOpacity="0.3"/>
            <circle cx="4.5" cy="5.5" r="1" fill="currentColor" fillOpacity="0.3"/>
          </svg>
        )}
      </button>
    </div>
  );
};

export default Me;
