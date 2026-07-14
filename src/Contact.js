import React, { useState, useEffect, useRef } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  return (
    <section className="contact-section" id="contact" ref={sectionRef}>
      {/* Animated Background */}
      <div className="contact-bg">
        <div className="contact-glow contact-glow-1"></div>
        <div className="contact-glow contact-glow-2"></div>
        <div className="contact-glow contact-glow-3"></div>
        <div className="contact-glow contact-glow-4"></div>
        
        {/* Floating Particles */}
        <div className="contact-particles">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="contact-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 20}s`,
                width: `${2 + Math.random() * 6}px`,
                height: `${2 + Math.random() * 6}px`
              }}
            ></div>
          ))}
        </div>

        {/* Floating Shapes */}
        <div className="floating-shapes">
          <div className="shape shape-1">✦</div>
          <div className="shape shape-2">◆</div>
          <div className="shape shape-3">●</div>
          <div className="shape shape-4">■</div>
          <div className="shape shape-5">▲</div>
        </div>
      </div>

      <div className="contact-container">
        {/* Centered Header */}
        <div className={`contact-header-center ${isVisible ? 'visible' : ''}`}>
          <span className="contact-badge">✦ Let's Connect</span>
          <h2 className="contact-title">
            Get In <span className="highlight">Touch</span>
          </h2>
          <div className="contact-line-center"></div>
          <p className="contact-subtitle-center">
            Have a project in mind or want to collaborate? 
            Let's create something amazing together.
          </p>
        </div>

        {/* Contact Details - TOP */}
        <div className={`contact-details-center ${isVisible ? 'visible' : ''}`}>
          <div className="contact-details-grid">
            <div className="contact-detail-item">
              <div className="detail-icon">📧</div>
              <div className="detail-info">
                <h4>Email</h4>
                <p>awaistahir01234@gmail.com</p>
              </div>
            </div>
            <div className="contact-detail-item">
              <div className="detail-icon">📍</div>
              <div className="detail-info">
                <h4>Location</h4>
                <p>Islamabad, Pakistan</p>
              </div>
            </div>
            <div className="contact-detail-item">
              <div className="detail-icon">📱</div>
              <div className="detail-info">
                <h4>Phone</h4>
                <p>+92 321 3762964</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form - BOTTOM */}
        <div className={`contact-form-wrapper ${isVisible ? 'visible' : ''}`}>
          <div className="contact-form-container">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                <span className="input-focus"></span>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                <span className="input-focus"></span>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-input"
                />
                <span className="input-focus"></span>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  rows="5"
                ></textarea>
                <span className="input-focus"></span>
              </div>

              <button type="submit" className="form-submit">
                <span className="btn-text">Send Message</span>
                <span className="btn-icon">→</span>
                <span className="btn-shimmer"></span>
              </button>
            </form>

            {/* Success Message */}
            {isSubmitted && (
              <div className="success-message">
                <span className="success-icon">✓</span>
                <p>Message sent successfully! I'll get back to you soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;