import React, { useEffect, useState } from 'react';
import styles from './styles/ReviewSection.module.css';

const ReviewSection = ({ bookId, setAverageRating }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 0, review_text: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${bookId}`);
      const data = await response.json();
      setReviews(data.reviews);
      setAverageRating(data.averageRating);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    // Check if token exists to determine if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    fetchReviews();
  }, [bookId]);

  const handleSubmitReview = async () => {
    if (!newReview.review_text || newReview.rating === 0) {
      alert('Please fill out both the review text and rating fields.');
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ book_id: bookId, ...newReview }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      alert('Review added successfully!');
      setNewReview({ rating: 0, review_text: '' });

      // Re-fetch reviews after submission
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className={styles.reviewSection}>
      <h3>Reviews</h3>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review._id} className={styles.reviewItem}>
            <p className={styles.reviewAuthor}>{review?.user?.user_name}</p>
            <p className={styles.reviewText}>{review?.review_text}</p>
            <p className={styles.reviewRating}>Rating: {review?.rating}/5</p>
          </div>
        ))
      ) : (
        <p className={styles.noReviews}>No reviews yet.</p>
      )}

      <h4>Add a Review</h4>

      {isLoggedIn ? (
        <div className={styles.addReviewForm}>
          <textarea
            value={newReview.review_text}
            onChange={(e) => setNewReview({ ...newReview, review_text: e.target.value })}
            placeholder="Write your review here"
          />
          <select
            value={newReview.rating}
            onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
          >
            <option value={0}>Select Rating</option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option key={rating} value={rating}>{rating}</option>
            ))}
          </select>
          <button className={styles.submitButton} onClick={handleSubmitReview}>
            Submit Review
          </button>
        </div>
      ) : (
        <p className={styles.loginPrompt}>Please log in to add a review.</p>
      )}
    </div>
  );
};

export default ReviewSection;
