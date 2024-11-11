// src/components/TermsConditions.js
import React from 'react';
import styles from './styles/TermsConditions.module.css';

const TermsConditions = () => {
  return (
    <div className={styles.termsContainer}>
      <h1 className={styles.heading}>Terms and Conditions</h1>
      <p className={styles.intro}>
        Welcome to Book Library! These terms and conditions outline the rules and regulations for the use of our service.
        By accessing and using our website, you agree to comply with these terms. If you disagree with any part of these terms, you may not use our website.
      </p>

      <div className={styles.section}>
        <h2 className={styles.subheading}>1. Acceptance of Terms</h2>
        <p>
          By using our website, you agree to the terms and conditions set forth in this agreement. If you do not accept these terms, you are not permitted to use our website or services.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subheading}>2. Use of the Website</h2>
        <p>
          You agree to use our website in accordance with all applicable local, state, and national laws and regulations. You must not use the website in any way that may damage, disable, overburden, or impair the website.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subheading}>3. Account Registration</h2>
        <p>
          To access certain features of the website, you may need to create an account. You agree to provide accurate and complete information when registering for an account and to maintain the accuracy of this information.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subheading}>4. Privacy Policy</h2>
        <p>
          We respect your privacy and are committed to protecting the personal information you provide. Please review our <a href="/privacy" className={styles.link}>Privacy Policy</a> to learn more.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subheading}>5. Limitation of Liability</h2>
        <p>
          We are not responsible for any loss or damage that may arise from using our website, including but not limited to data loss or damages resulting from viruses or other malicious software. You use the website at your own risk.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subheading}>6. Termination</h2>
        <p>
          We reserve the right to terminate or suspend your access to our website at any time, without notice, for conduct that we believe violates these terms or is harmful to others or the website.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subheading}>7. Governing Law</h2>
        <p>
          These terms and conditions are governed by and construed in accordance with the laws of your jurisdiction. Any disputes related to these terms shall be resolved in the appropriate courts of your jurisdiction.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subheading}>8. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms and conditions at any time. Any changes will be posted on this page, and your continued use of the website after such changes constitutes acceptance of those changes.
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;
