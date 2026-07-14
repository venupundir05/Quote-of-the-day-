import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // State variables
  const [quote, setQuote] = useState({ text: "Loading quote...", author: "Please wait..." });
  const [searchAuthor, setSearchAuthor] = useState("");
  const [favorites, setFavorites] = useState([]);

  // Backend URL
  const API_URL = "http://localhost:5000/api/quotes";

  // 1. Ek random quote fetch karne ka function
  const fetchRandomQuote = async () => {
    try {
      const response = await axios.get(`${API_URL}/random`);
      setQuote(response.data);
    } catch (error) {
      console.error("Error fetching random quote:", error);
      setQuote({ text: "Oops! Failed to connect to server.", author: "System Error" });
    }
  };

  // App load hote hi sabse pehle ek quote load ho
  useEffect(() => {
    fetchRandomQuote();
    // LocalStorage se pehle se save kiye hue favorites load karna
    const savedFavorites = JSON.parse(localStorage.getItem("favQuotes")) || [];
    setFavorites(savedFavorites);
  }, []);

  // 2. Specific Author search karne ka function
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchAuthor.trim()) return;

    try {
      const response = await axios.get(`${API_URL}?author=${searchAuthor}`);
      if (response.data && response.data.length > 0) {
        // Agar us author ke multiple quotes hain, toh unme se pehla show kar do
        setQuote(response.data[0]);
      } else {
        alert(`No quotes found for author: "${searchAuthor}"`);
      }
    } catch (error) {
      console.error("Error searching author:", error);
    }
  };

  // 3. Current quote ko Copy karne ka function
  const copyToClipboard = () => {
    const textToCopy = `"${quote.text}" — ${quote.author}`;
    navigator.clipboard.writeText(textToCopy);
    alert("Quote copied to clipboard! 📋");
  };

  // 4. Twitter par share karne ka function
  const shareOnTwitter = () => {
    const tweetText = encodeURIComponent(`"${quote.text}" — ${quote.author}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, '_blank');
  };

  // 5. WhatsApp par share karne ka function
  const shareOnWhatsApp = () => {
    const message = encodeURIComponent(`"${quote.text}" — ${quote.author}`);
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  // 6. Favorites add/remove karne ka logic
  const toggleFavorite = () => {
    // Check karein ki ye quote pehle se toh favorited nahi hai
    const isAlreadyFav = favorites.some(fav => fav.text === quote.text);
    let updatedFavs;

    if (isAlreadyFav) {
      // Agar favorited hai, toh list se remove karo
      updatedFavs = favorites.filter(fav => fav.text !== quote.text);
    } else {
      // Agar favorited nahi hai, toh list me add karo
      updatedFavs = [...favorites, quote];
    }

    setFavorites(updatedFavs);
    localStorage.setItem("favQuotes", JSON.stringify(updatedFavs));
  };

  // Favorite list se direct remove karne ke liye function
  const removeFavorite = (textToRemove) => {
    const updatedFavs = favorites.filter(fav => fav.text !== textToRemove);
    setFavorites(updatedFavs);
    localStorage.setItem("favQuotes", JSON.stringify(updatedFavs));
  };

  const isCurrentFav = favorites.some(fav => fav.text === quote.text);

  return (
    <div className="app-container">
      <h1>✨ Quote of the Day ✨</h1>

      {/* SEARCH BAR */}
      <form className="search-container" onSubmit={handleSearch}>
        <input 
          type="text" 
          placeholder="Search quote by author (e.g. Buddha, Jobs)..." 
          className="search-input"
          value={searchAuthor}
          onChange={(e) => setSearchAuthor(e.target.value)}
        />
        <button type="submit" className="search-btn">Search</button>
      </form>

      {/* MAIN QUOTE CARD */}
      <div className="quote-card">
        <p className="quote-text">“{quote.text}”</p>
        <span className="quote-author">— {quote.author}</span>

        {/* CARD ACTIONS */}
        <div className="card-actions">
          <button className="icon-btn" onClick={toggleFavorite} title={isCurrentFav ? "Remove from Favorites" : "Add to Favorites"}>
            {isCurrentFav ? "❤️" : "🤍"}
          </button>
          <button className="icon-btn" onClick={copyToClipboard} title="Copy Quote">
            📋
          </button>
          <button className="icon-btn" onClick={shareOnTwitter} title="Share on Twitter">
            🐦
          </button>
          <button className="icon-btn" onClick={shareOnWhatsApp} title="Share on WhatsApp">
            💬
          </button>
        </div>
      </div>

      {/* NEW QUOTE TRIGGER BUTTON */}
      <button className="btn-primary" onClick={fetchRandomQuote}>
        Get New Quote 🔄
      </button>

      {/* FAVORITE LIST SECTION */}
      {favorites.length > 0 && (
        <div className="favorites-container">
          <h3>Your Bookmarked Quotes ⭐</h3>
          {favorites.map((fav, index) => (
            <div key={index} className="fav-item">
              <span className="fav-text">
                "<strong>{fav.text}</strong>" — <em>{fav.author}</em>
              </span>
              <button className="remove-fav" onClick={() => removeFavorite(fav.text)} title="Remove">
                ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;