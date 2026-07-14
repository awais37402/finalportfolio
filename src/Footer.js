import React, { useEffect, useRef } from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef(null);

  useEffect(() => {
    // Reset visibility on mount
    const elements = document.querySelectorAll('.footer-animate');
    elements.forEach((el) => {
      el.classList.remove('visible');
    });

    // Check if footer is visible on mount
    const checkVisibility = () => {
      const elements = document.querySelectorAll('.footer-animate');
      const windowHeight = window.innerHeight;
      
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Check if element is in viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          el.classList.add('visible');
        }
      });
    };

    // Initial check after DOM is ready
    const timeoutId = setTimeout(checkVisibility, 100);

    // Create observer that works continuously
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Add class when entering viewport, remove when leaving
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            // Optional: Remove class when leaving viewport
            // Uncomment below if you want elements to disappear when scrolling away
            // entry.target.classList.remove('visible');
          }
        });
      },
      { 
        threshold: 0.05,
        rootMargin: '50px'
      }
    );

    // Observe all footer-animate elements
    const animateElements = document.querySelectorAll('.footer-animate');
    animateElements.forEach((el) => {
      observer.observe(el);
    });

    // Also observe the footer container
    const current = footerRef.current;
    if (current) {
      observer.observe(current);
    }

    return () => {
      clearTimeout(timeoutId);
      observer.disconnect();
    };
  }, []);

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/923213762964', '_blank');
  };

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-bg">
        <div className="footer-glow footer-glow-1"></div>
        <div className="footer-glow footer-glow-2"></div>
        <div className="footer-glow footer-glow-3"></div>
      </div>

      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand footer-animate">
            <div className="footer-logo-wrapper">
              <div className="footer-logo">
                <span className="footer-logo-text">AT</span>
                <div className="footer-logo-ring"></div>
              </div>
            </div>
            <h3 className="footer-brand-name">
              Awais<span className="footer-brand-highlight">.dev</span>
            </h3>
            <p className="footer-brand-desc">
              Building responsive and user-friendly web applications with modern technologies.
            </p>
            <div className="footer-brand-line"></div>
          </div>

          <div className="footer-links footer-animate">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links-list">
              {quickLinks.map((link, index) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="footer-link"
                  >
                    <span className="footer-link-dot">✦</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-contact footer-animate">
            <h4 className="footer-title">Contact</h4>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">✉</span>
              <a href="mailto:awaistahir01234@gmail.com">awaistahir01234@gmail.com</a>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📍</span>
              <span>Islamabad, Pakistan</span>
            </div>
            <div className="footer-contact-item">
              <span className="footer-contact-icon">📱</span>
              <a href="tel:+923213762964">+92 321 3762964</a>
            </div>
            <button className="footer-whatsapp-btn" onClick={handleWhatsApp}>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>WhatsApp</span>
              <span className="btn-shimmer"></span>
            </button>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {currentYear} <span className="footer-copyright-highlight">Awais Tahir</span>. All rights reserved.
            </p>
            <p className="footer-credit">
              Built with <span className="footer-heart">❤</span> using <span className="footer-tech">React</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;