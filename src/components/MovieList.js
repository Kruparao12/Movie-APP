import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MovieCard from "./MovieCard";

const moviesData = [
  { id: 1, title: "Drushyam", genre: "Thriller", rating: 8.8, image: "/images/Drushyam.jpg"},
  { id: 2, title: "Pushpa The Rule", genre: "Action", rating: 9.4, image: "/images/Pushpa The Rule.jpg"},
  { id: 3, title: "Interstellar", genre: "Sci-Fi", rating: 8.6, image: "/images/Interstellar.jpg"},
  { id: 4, title: "Baahubali 2: The Conclusion", genre: "Action", rating: 9.0, image: "/images/Baahubali 2.jpg"},
  { id: 5, title: "Kshanam", genre: "Thriller", rating: 8.9, image: "/images/Kshanam.jpg"},
  { id: 6, title: "Oke Oka Jeevitham", genre: "Sci-Fi", rating: 8.7, image: "/images/Oke Oka Jeevitham.jpg"},
  { id: 7, title: "Jathi Ratnalu", genre: "Comedy", rating: 8.80, image: "/images/Jathi Ratnalu.jpg"}
];

function MovieList({ setIsLoggedIn }) {
  const [genre, setGenre] = useState("All");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  );

  const filtered = moviesData
    .filter((m) => genre === "All" || m.genre === genre)
    .filter((m) => m.title.toLowerCase().includes(search.toLowerCase()));

  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter((fav) => fav !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  const genres = ["All", "Action", "Comedy", "Thriller", "Sci-Fi"];

  return (
    <div className="dashboard">
      <motion.div 
        className="dashboard-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="header-left">
          <h1 className="dashboard-title glitch">🎬 CINEMA</h1>
        </div>
        <div className="header-right">
          <motion.button
            className="logout-button"
            onClick={logout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Exit Cinema
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        className="filter-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="genre-buttons">
          {genres.map((g) => (
            <motion.button
              key={g}
              className={`genre-button ${genre === g ? 'active' : ''}`}
              onClick={() => setGenre(g)}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {g}
            </motion.button>
          ))}
        </div>

        <motion.input
          type="text"
          placeholder="🔍 Search for movies..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          whileHover={{ scale: 1.02 }}
          whileFocus={{ scale: 1.02 }}
        />
      </motion.div>

      <motion.div 
        className="movie-grid"
        layout
      >
        {filtered.length === 0 && (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.4 }}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '4rem 2rem',
      margin: '2rem auto',
      background: 'rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      borderRadius: '2rem',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      color: 'rgba(255, 255, 255, 0.8)',
      fontFamily: "'Space Grotesk', sans-serif",
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      width: '100%',
      maxWidth: '600px',
      gridColumn: '1 / -1', /* This makes it span all grid columns */
    }}
  >
    <div style={{ 
      fontSize: '5rem', 
      marginBottom: '1.5rem',
      filter: 'drop-shadow(0 0 20px rgba(124, 58, 237, 0.5))'
    }}>
      🎬
    </div>
    <h3 style={{ 
      fontSize: '2.2rem', 
      fontWeight: '700',
      marginBottom: '0.8rem',
      background: 'linear-gradient(135deg, #fff, #c084fc)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontFamily: "'Outfit', sans-serif"
    }}>
      No Movies Found
    </h3>
    <p style={{ 
      fontSize: '1.2rem', 
      color: 'rgba(255,255,255,0.8)',
      marginBottom: '0.8rem'
    }}>
      No movies found matching "{search}"
    </p>
    <p style={{ 
      fontSize: '1rem', 
      color: 'rgba(255,255,255,0.5)',
      marginBottom: '1.5rem'
    }}>
      Try different keywords or select another category
    </p>
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => {
        setSearch("");
        setGenre("All");
      }}
      style={{
        padding: '0.8rem 2rem',
        background: 'linear-gradient(135deg, #7c3aed, #9f7aea)',
        border: 'none',
        borderRadius: '2rem',
        color: 'white',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        fontFamily: "'Outfit', sans-serif",
        boxShadow: '0 5px 15px rgba(124, 58, 237, 0.4)'
      }}
    >
      Clear Filters
    </motion.button>
  </motion.div>
)}
        <AnimatePresence>
          {filtered.map((movie, index) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ delay: index * 0.1 }}
              layout
            >
              <MovieCard
                movie={movie}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default MovieList;