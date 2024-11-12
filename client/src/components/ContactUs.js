// src/components/ContactUs.js
import React, { useState } from 'react';
import styles from './styles/ContactUs.module.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStatus('Your message has been sent successfully!');
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <div className={styles.contactUsContainer}>
      <h1 className={styles.heading}>Contact Us</h1>
      <p className={styles.description}>
        We’d love to hear from you! Please feel free to reach out if you have any questions, feedback, or inquiries.
      </p>

      <div className={styles.contactInfo}>
        <h2 className={styles.subheading}>Our Contact Information</h2>
        <p className={styles.contactDetail}>Email: <a href="mailto:shafeerahamedm.22cse@kongu.edu" className={styles.contactLink}>shafeerahamedm.22cse@kongu.edu</a></p>
        <p className={styles.contactDetail}>Phone: +91 98765 43210</p>
        <p className={styles.contactDetail}>Address: 123 Book Street, Library City, Country</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.contactForm}>
        <h2 className={styles.subheading}>Send Us a Message</h2>
        {status && <p className={styles.statusMessage}>{status}</p>}
        <div className={styles.inputGroup}>
          <label htmlFor="name" className={styles.label}>Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="message" className={styles.label}>Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
        </div>

        <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>

      {/* Optional Google Map Section */}
      <div className={styles.mapContainer}>
        <iframe
          src="https://www.google.com/maps/embed?pb=..."
          width="100%"
          height="450"
          frameBorder="0"
          allowFullScreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
