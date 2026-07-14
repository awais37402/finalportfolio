import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const mobileMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  // Fixed: Wrap navLinks with useMemo to prevent recreation on every render
  const navLinks = useMemo(() => [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ], []);

  // Handle scroll events with performance optimization
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          setIsScrolled(scrollY > 50);

          const sections = navLinks.map(link => link.href.substring(1));
          const scrollPosition = scrollY + 100;

          for (const section of sections) {
            const element = document.getElementById(section);
            if (element) {
              const offsetTop = element.offsetTop;
              const offsetBottom = offsetTop + element.offsetHeight;
              if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                setActiveSection(section);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navLinks]);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // FIXED: Improved navigation click handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    closeMobileMenu();

    // Get the target element
    const targetId = href.substring(1); // Remove the '#'
    const target = document.getElementById(targetId);
    
    if (target) {
      // Calculate offset (adjust based on your header height)
      const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
      const offsetTop = target.offsetTop - headerHeight;
      
      // Smooth scroll to the element
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Update active section
      setActiveSection(targetId);
    } else {
      // If element not found, try using querySelector with href
      const element = document.querySelector(href);
      if (element) {
        const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
        const offsetTop = element.offsetTop - headerHeight;
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  };

  // Fixed: Wrap handleOutsideClick with useCallback
  const handleOutsideClick = useCallback((e) => {
    if (isMobileMenuOpen &&
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(e.target) &&
      toggleButtonRef.current &&
      !toggleButtonRef.current.contains(e.target)) {
      closeMobileMenu();
    }
  }, [isMobileMenuOpen]);

  // Fixed: Add handleOutsideClick to dependency array
  useEffect(() => {
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [handleOutsideClick]);

  const handleWhatsApp = () => {
    window.open('https://wa.me/923213762964', '_blank');
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          {/* Logo */}
          <a href="#home" className="logo" onClick={(e) => handleNavClick(e, '#home')}>
            <div className="logo-icon">
              <span className="logo-text">AT</span>
              <div className="logo-glow"></div>
            </div>
            <span className="logo-name">Awais<span className="logo-highlight">.dev</span></span>
          </a>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <ul className="nav-list">
              {navLinks.map((link) => (
                <li key={link.name} className="nav-item">
                  <a
                    href={link.href}
                    className={`nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    <span className="nav-link-text">{link.name}</span>
                    <span className="nav-link-dot"></span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* WhatsApp Button */}
          <button className="whatsapp-btn" onClick={handleWhatsApp}>
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            <span>WhatsApp</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            ref={toggleButtonRef}
            className={`mobile-toggle ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className="toggle-line"></span>
            <span className="toggle-line"></span>
            <span className="toggle-line"></span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <div 
        ref={mobileMenuRef}
        className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}
        onClick={closeMobileMenu}
      >
        <div className="mobile-nav-background">
          <div className="mobile-glow mobile-glow-1"></div>
          <div className="mobile-glow mobile-glow-2"></div>
        </div>
        
        {/* Close Button - White X */}
        <button 
          className="mobile-close-btn" 
          onClick={closeMobileMenu}
          aria-label="Close menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <div className="mobile-nav-content" onClick={(e) => e.stopPropagation()}>
          <ul className="mobile-nav-list">
            {navLinks.map((link, index) => (
              <li 
                key={link.name} 
                className="mobile-nav-item" 
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <a
                  href={link.href}
                  className={`mobile-nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span className="mobile-nav-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="mobile-nav-name">{link.name}</span>
                  <span className="mobile-nav-arrow">→</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-footer">
            <div className="mobile-social">
              <a href="https://github.com/awais37402" target="_blank" rel="noopener noreferrer" className="mobile-social-link">GitHub</a>
              <a href="https://www.linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" className="mobile-social-link">LinkedIn</a>
              <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" className="mobile-social-link">Twitter</a>
            </div>
            <button className="mobile-whatsapp-btn" onClick={handleWhatsApp}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;