import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./components/Login";
import MovieList from "./components/MovieList";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          🎬 Movie App
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="video-background"
        onError={(e) => console.log('Video error:', e)}
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        style={{ objectFit: 'cover' }}
      >
        <source src="/video/video1.mp4" type="video/mp4" />
      </video>
      
      {/* Dark overlay */}
      <div className="overlay"></div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={isLoggedIn ? "dashboard" : "login"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          {isLoggedIn ? (
            <MovieList setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Login setIsLoggedIn={setIsLoggedIn} />
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App