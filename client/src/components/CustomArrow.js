import React from 'react';
// import '../components/CustomArrows.css'; // Create this CSS file to style your arrows

export const PrevArrow = ({ onClick }) => (
  <div className="custom-arrow custom-arrow-prev" onClick={onClick}>
    &#9664; {/* Left arrow symbol */}
  </div>
);

export const NextArrow = ({ onClick }) => (
  <div className="custom-arrow custom-arrow-next" onClick={onClick}>
    &#9654; {/* Right arrow symbol */}
  </div>
);
