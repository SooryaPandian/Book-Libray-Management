import React from 'react';
import Slider from 'react-slick';
import './styles/RecommendedBooksCarousel.css';
// import { PrevArrow, NextArrow } from '../components/CustomArrow'; // Import custom arrows

// Import images
import cover1 from '../assets/tgg.jpeg';
import cover2 from '../assets/To_Kill_a_Mockingbird.jpg';
import cover3 from '../assets/invisibleman.jpg';
import cover4 from '../assets/The_hobbit.avif';
import cover5 from '../assets/Harry_Potter.jpeg';
import cover6 from '../assets/walk_into_the_shadows.jpeg'
import cover7 from '../assets/hide_and_seek.webp'

const recommendedBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', cover: cover1 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', cover: cover2 },
  { id: 3, title: 'Invisible Man', author: 'Ralph Ellison', cover: cover3 },
  { id: 4, title: 'The Hobbit', author: 'J.R.R. Tolkien', cover: cover4 },
  { id: 5, title: 'Harry Potter', author: 'J.K. Rowling', cover: cover5 },
  { id: 6, title: 'Walk Into the Shadows', author: 'J.K. Rowling', cover: cover6 },
  { id: 7, title: 'Hide And Seek', author: 'J.K. Rowling', cover: cover7 },
  // Add more recommended books as needed
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3, // Show one slide at a time
  slidesToScroll: 1,
  arrows: true, // Enable arrows
  autoplay: true, // Enable automatic sliding
  autoplaySpeed: 3000, // Set the speed (in milliseconds) between slides
  // prevArrow: <PrevArrow />,
  // nextArrow: <NextArrow />,
};

const RecommendedBooksCarousel = () => {
  return (
    <div className="recommended-books-carousel">
      <Slider {...settings}>
        {recommendedBooks.map(book => (
          <div key={book.id} className="book-slide">
            <img src={book.cover} alt={book.title} />
            {/* <h3>{book.title}</h3>
            <p>{book.author}</p> */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default RecommendedBooksCarousel;
