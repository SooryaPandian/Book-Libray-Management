import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../components/styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      {/* Quote Section */}
      <div className={styles.quote}>
        <p>"A book is a dream that you hold in your hand."</p>
        <span>- Neil Gaiman</span>
      </div>

      {/* Grid Container */}
      <div className={styles.container}>
        {/* Explore Section */}
        <div>
          <h2>Explore</h2>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/about" className={styles.link}>About Us</Link>
          <Link to="/profile" className={styles.link}>Profile</Link>
        </div>

        {/* Quick Links Section */}
        <div>
          <h2>Quick Links</h2>
          
          <Link to="/contact" className={styles.link}>Contact</Link>
          <Link to="/terms" className={styles.link}>Terms & Conditions</Link>
          <Link to="/privacy" className={styles.link}>Privacy Policy</Link>
        </div>

        {/* Social Media Icons */}
        <div>
          <h2>Follow Us</h2>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <span>© 2024 Book Library. All rights reserved. <Link to="/terms">Terms</Link> | <Link to="/privacy">Privacy</Link></span>
      </div>
    </footer>
  );
};

export default Footer;
