// src/components/PrivacyPolicy.js
import React from 'react';
import styles from './styles/PrivacyPolicy.module.css';

const PrivacyPolicy = () => {
  return (
    <div className={styles.privacyContainer}>
      <h1 className={styles.heading}>Privacy Policy</h1>
      <p className={styles.intro}>
        At Book Library, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website and use our services. By using our site, you agree to the practices described in this policy.
      </p>

      <div className={styles.section}>
        <h2 className={styles.subheading}>1. Information We Collect</h2>
        <p>
          We collect information from you when you visit our website, register an account, or use our services. The types of personal information we collect include:
        </p>
        <ul className={styles.list}>
          <li>Name</li>
          <li>Email address</li>
          <li>Phone number (if provided)</li>
          <li>Browsing behavior and interaction with the website</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subheading}>2. How We Use Your Information</h2>
        <p>
          The information we collect is used for the following purposes:
        </p>
        <ul className={styles.list}>
          <li>To personalize your experience and respond to your individual needs.</li>
          <li>To improve our website functionality and performance.</li>
          <li>To send periodic emails for updates, promotions, and notifications.</li>
          <li>To communicate with you regarding your account or any customer service inquiries.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subheading}>3. How We Protect Your Information</h2>
        <p>
          We use a variety of security measures to maintain the safety of your personal information, including encryption and secure servers. Your data is stored in a secure environment and is only accessible by authorized personnel.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subheading}>4. Cookies</h2>
        <p>
          Our website uses cookies to enhance your experience, provide personalized content, and analyze site traffic. A cookie is a small file that is placed on your device when you visit our site. You can disable cookies through your browser settings, but this may affect the functionality of the website.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subheading}>5. Sharing Your Information</h2>
        <p>
          We do not sell, trade, or otherwise transfer your personal information to third parties, except as required by law or as necessary to provide our services. We may share your data with trusted third parties who assist us in operating our website and conducting our business, but these parties are obligated to keep your information confidential.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subheading}>6. Your Rights</h2>
        <p>
          You have the right to:
        </p>
        <ul className={styles.list}>
          <li>Access the personal information we have about you.</li>
          <li>Request corrections or updates to your personal data.</li>
          <li>Request deletion of your personal information (subject to applicable laws).</li>
        </ul>
        <p>If you wish to exercise any of these rights, please contact us at <a href="mailto:shafeerahamedm.22cse@kongu.edu" className={styles.link}>shafeerahamedm.22cse@kongu.edu</a>.</p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subheading}>7. Changes to This Privacy Policy</h2>
        <p>
          We may update our Privacy Policy from time to time. When we make changes, we will post the updated policy on this page and update the effective date at the bottom. We encourage you to review this page periodically to stay informed about how we are protecting your information.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.subheading}>8. Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at <a href="mailto:shafeerahamedm.22cse@kongu.edu" className={styles.link}>shafeerahamedm.22cse@kongu.edu</a>.
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
