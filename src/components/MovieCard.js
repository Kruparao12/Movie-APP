import React from "react";
import { motion } from "framer-motion";

function MovieCard({ movie, favorites, toggleFavorite }) {
  // Fallback image if the poster fails to load
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/300x450?text=No+Poster";
  };

  return (
    <motion.div
      className="movie-card"
      initial={{ opacity: 0, scale: 0.8, rotateY: 10 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      whileHover={{ 
        scale: 1.05,
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.3 }
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="movie-poster">
        <img 
          src={movie.image} 
          alt={movie.title}
          onError={handleImageError}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '1rem'
          }}
        />
      </div>
      
      <h3 className="movie-title">{movie.title}</h3>
      <p className="movie-genre">{movie.genre}</p>
      
      <div className="movie-rating">
        <span>⭐</span>
        <span>{movie.rating}</span>
        <div className="stars">
          {[...Array(5)].map((_, i) => (
            <span 
              key={i} 
              className={i < Math.floor(movie.rating) ? "star-filled" : ""}
              style={{ fontSize: '1.2rem' }}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <motion.button
        className={`favorite-button ${favorites.includes(movie.id) ? "active" : ""}`}
        onClick={() => toggleFavorite(movie.id)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {favorites.includes(movie.id) ? "❤️ In Watchlist" : "🤍 Add to Watchlist"}
      </motion.button>
    </motion.div>
  );
}

export default MovieCard;