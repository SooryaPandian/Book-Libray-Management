// src/components/AboutUs.js
import React from 'react';
import styles from './styles/AboutUs.module.css';

const AboutUs = () => {
  return (
    <div className={styles.aboutUsContainer}>
      <h1 className={styles.heading}>About Us</h1>
      <p className={styles.description}>
        Welcome to Book Library! We are passionate about books and reading, and our mission is to provide a digital space where book lovers can discover, share, and enjoy their favorite books.
      </p>
      <div className={styles.teamSection}>
        <h2 className={styles.teamHeading}>Our Team</h2>
        <p className={styles.teamDescription}>We are a group of enthusiastic developers and book lovers dedicated to creating an easy-to-use platform for all readers.</p>
      </div>
    </div>
  );
};

export default AboutUs;
