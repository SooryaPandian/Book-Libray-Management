import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'; // Import useNavigate
import Navbar from "./components/Navbar";
import RecommendedBooksCarousel from "./components/RecommendedBooksCarousel";
import BookCard from "./components/BookCard";
import BookShelf from "./components/BookShelf";
import BookDetails from "./components/BookDetails"; // Import BookDetails
import Signup from './components/Signup';
import Login from './components/Login';
import "./App.css";

// Add image paths to books array
const books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Fiction', description:'Set in the Roaring Twenties, The Great Gatsby is a profound exploration of the American Dream and the emptiness that often lies behind wealth and glamour. The story is told through the eyes of Nick Carraway, who moves to Long Island and becomes entangled in the lives of his wealthy neighbor, Jay Gatsby, and his cousin Daisy Buchanan. Gatsby, a mysterious millionaire, throws lavish parties in hopes of reconnecting with Daisy, his lost love, who is now married to Tom Buchanan. Through beautiful prose and rich symbolism, Fitzgerald examines themes of love, obsession, class, and the hollowness of material success. The green light at the end of Daisy’s dock represents Gatsby’s unattainable dream, and the novel’s tragic conclusion reveals the disillusionment that often accompanies the pursuit of wealth. The Great Gatsby remains one of the greatest American novels, capturing the essence of a turbulent era and the universal human desire for meaning and connection.', cover: require('./assets/tgg.jpeg') },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Fiction',description:'To Kill a Mockingbird is a poignant exploration of racism, morality, and justice set in the Deep South during the 1930s. The story is told through the eyes of Scout Finch, a young girl whose father, Atticus Finch, is a lawyer defending a black man, Tom Robinson, falsely accused of raping a white woman. As the trial unfolds, Scout learns about the complexities of human nature, the prevalence of racial injustice, and the courage required to stand up for what is right.Harper Lee’s novel is both a gripping courtroom drama and a deeply personal narrative about family, community, and conscience. Atticus Finch’s quiet heroism and moral integrity have made him one of literature’s most admired characters, and the book’s themes of empathy and understanding continue to resonate today. To Kill a Mockingbird is more than just a novel about race; it is a powerful meditation on the moral challenges we all face in our everyday lives.', cover: require('./assets/To_Kill_a_Mockingbird.jpg') },
  { id: 3, title: 'A Brief History of Time', author: 'Stephen Hawking', genre: 'Science', description:'"A Brief History of Time" by Stephen Hawking is a groundbreaking exploration of the universe, addressing some of the most profound questions in science. First published in 1988, it brings complex topics like the nature of time, the Big Bang, black holes, and the theory of relativity into focus for a general audience. Hawking traces the evolution of cosmology, from Aristotle to Einstein, offering an accessible yet intellectually rich explanation of how our universe works. He discusses the birth of the universe, the concept of time travel, and the potential of a unified "Theory of Everything."Through clear analogies and sharp insights, Hawking explains the mysteries of black holes, space-time, and quantum mechanics. He also ponders the philosophical implications of these scientific discoveries, including humanitys role in the cosmos. *A Brief History of Time* has become one of the most popular and influential science books, inspiring millions to think about the universe and our place within it.',cover: require('./assets/invisibleman.jpg') },
  { id: 4, title: '1984', author: 'George Orwell', genre: 'Dystopian', description:'George Orwell’s 1984 is a harrowing vision of a totalitarian future where the state, represented by Big Brother, controls every aspect of life. In this world, history is rewritten, language is manipulated, and even thoughts are monitored through the Thought Police. The novel follows Winston Smith, a low-ranking member of the Party, who secretly despises the regime and dreams of rebellion. Winston’s journey is one of psychological struggle as he attempts to hold onto his humanity in a world that seeks to erase individuality.The novel’s themes of surveillance, propaganda, and the loss of freedom resonate strongly in today’s world, making 1984 a timeless warning about the dangers of authoritarianism. Orwell’s portrayal of a world where reality is shaped by the government’s lies remains chillingly relevant, and his concept of “doublethink” has entered the lexicon as a way to describe the manipulation of truth. 1984 is not just a work of fiction; it is a powerful critique of political power and a cautionary tale about the fragility of personal freedom.',cover: require('./assets/The_hobbit.avif') },
  { id: 5, title: 'The Art of War', author: 'Sun Tzu', genre: 'Philosophy',description:'The Art of War by Sun Tzu is an ancient Chinese military treatise that emphasizes the importance of strategy, deception, and understanding the nature of conflict. Central to Sun Tzus philosophy is the idea that successful warfare is not about sheer force but rather about outsmarting the opponent. He advocates for careful planning, knowing oneself and ones enemy, and adapting to changing circumstances on the battlefield. The text outlines various strategies, such as the importance of positioning, the use of spies, and the necessity of flexibility in tactics to exploit the enemys weaknesses while preserving ones own strengths.Moreover, The Art of War extends beyond military applications, offering insights applicable to various fields such as business, politics, and personal development. Sun Tzus principles underscore the significance of preparation, adaptability, and the psychological aspects of competition. For instance, he emphasizes that the best victory is one achieved without fighting, highlighting the value of negotiation and alliance-building. The treatise remains influential today, with its teachings serving as a guide for leaders and strategists aiming to achieve success in any competitive arena.', cover: require('./assets/artofwar.jpg') },
  { id: 6, title: 'Walk Into The Shadows', author: 'F. Scott Fitzgerald', genre: 'Fiction',description:'"Walk Into The Shadows" is a narrative often associated with themes of mystery, introspection, and the exploration of hidden depths within oneself. It can symbolize a journey into the unknown, encouraging individuals to confront their fears, embrace change, and seek personal growth. This metaphorical journey into the shadows represents the darker aspects of life, where one might find hidden truths, unresolved emotions, or unacknowledged potential.In literature and art, walking into the shadows can evoke a sense of suspense and intrigue, inviting the audience to reflect on the complexities of human experience. It suggests that by facing the unknown and embracing vulnerability, one can emerge stronger and more enlightened. Whether in a story, poem, or song, this theme resonates with the idea that transformation often occurs in the depths of struggle and darkness, leading to a deeper understanding of oneself and the world.', cover: require('./assets/walk_into_the_shadows.jpeg') },
  { id: 7, title: 'Hide And Seek', author: 'Harper Lee', genre: 'Fiction',description:'"Hide and Seek" is a classic childrens game that involves players hiding while one player seeks them out. The game typically begins with the seeker counting to a predetermined number while the other players find places to conceal themselves. Once the counting is complete, the seeker searches for the hidden players, aiming to find and "tag" them. The first player found often becomes the next seeker, and the game continues in this fashion. Beyond its simplicity, "Hide and Seek" carries deeper themes of trust, strategy, and the joy of discovery. It fosters creativity as players find unique hiding spots, and it also encourages social interaction and physical activity. Additionally, the game has been adapted into various cultural forms, including literature and art, where it often symbolizes the complexities of relationships, the passage of time, and the contrast between visibility and invisibility in human experience. The playful nature of the game makes it a beloved pastime across generations, allowing participants to engage in the thrill of anticipation and surprise.', cover: require('./assets/hide_and_seek.webp') },
  { id: 8, title: 'Pride And Prejudice', author: 'Stephen Hawking', genre: 'Science',description:'**"Pride and Prejudice"** is a classic novel by Jane Austen, published in 1813. Set in the early 19th century, the story follows Elizabeth Bennet, one of five sisters in a genteel but financially precarious family. The novel explores themes of social class, marriage, and the complexities of human relationships, particularly through the interactions between Elizabeth and the wealthy, enigmatic Mr. Darcy. Initially, Elizabeth is prejudiced against Darcy due to his aloof demeanor and the influence of societal expectations, while Darcy struggles with his pride and sense of superiority.As the narrative unfolds, both characters undergo significant personal growth, leading to a deeper understanding of themselves and each other. Elizabeth learns to confront her own biases, while Darcy challenges his social prejudices and learns to appreciate Elizabeths intelligence and wit. Through their evolving relationship, Austen critiques the societal norms surrounding marriage, emphasizing the importance of love and mutual respect over financial considerations and social status. Ultimately, **"Pride and Prejudice"** remains a timeless exploration of human nature, individuality, and the transformative power of love.', cover: require('./assets/pap.jpg') },
  // { id: 9, title: '1984', author: 'George Orwell', genre: 'Dystopian', cover: require('./assets/The_hobbit.avif') },
  // { id: 10, title: 'The Art of War', author: 'Sun Tzu', genre: 'Philosophy', cover: require('./assets/Harry_Potter.jpeg') }
];

function App() {
  const [filteredBooks, setFilteredBooks] = useState(books);
  const navigate = useNavigate(); // Initialize navigate here

  const handleSearch = (query) => {
    if (!query) {
      setFilteredBooks(books);
      return;
    }
    const lowercasedQuery = query.toLowerCase();
    const filtered = books.filter(book =>
      book.title.toLowerCase().includes(lowercasedQuery) ||
      book.author.toLowerCase().includes(lowercasedQuery) ||
      book.genre.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredBooks(filtered);
  };

  return (
    <div className="App">
      <Navbar onSearch={handleSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <RecommendedBooksCarousel />
              <BookShelf />
              <div className="book-cards-container">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map(book => (
                    <BookCard
                      key={book.id}
                      book={book}
                      onBookClick={(selectedBook) => navigate(`/book/${selectedBook.id}`, { state: { book: selectedBook } })}
                    />
                  ))
                ) : (
                  <p>No books found</p>
                )}
              </div>
            </div>
          }
        />
        <Route path="/book/:id" element={<BookDetails books={books} />} />
        <Route path="/signup" element={<Signup />} /> {/* Signup route */}
        <Route path="/login" element={<Login />} />    {/* Login route */}
      </Routes>
    </div>
  );
}

// Wrap App component in Router
const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
