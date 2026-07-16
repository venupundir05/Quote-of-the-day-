import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [mainQuote, setMainQuote] = useState({ text: "Loading elite quotes...", author: "System", category: "Anime" });
  const [popularQuotes, setPopularQuotes] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const API_URL = "http://localhost:5000/api/quotes";

  // Categories directly synchronized with the layout images + Affirmation tab
  const categoryList = [
    { name: "Anime", icon: "🥷" },
    { name: "Affirmations", icon: "🧠" },
    { name: "Motivation", icon: "📈" },
    { name: "Success", icon: "🏆" },
    { name: "Study", icon: "🎓" },
    { name: "Life", icon: "🌱" },
    { name: "Leadership", icon: "👥" }
  ];

  const fetchRandomQuote = async () => {
    try {
      const res = await axios.get(`${API_URL}/random`);
      setMainQuote(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchPopularQuotes = async (cat = "") => {
    try {
      const url = cat && cat !== "All" ? `${API_URL}?category=${cat}` : API_URL;
      const res = await axios.get(url);
      setPopularQuotes(res.data.slice(0, 6)); // Display max 6 items in the grid space
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    fetchRandomQuote();
    fetchPopularQuotes();
    setBookmarks(JSON.parse(localStorage.getItem("hexFavs")) || []);
  }, []);

  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName);
    fetchPopularQuotes(catName);
  };

  const handleBookmark = (quoteItem) => {
    const exists = bookmarks.some(b => b.id === quoteItem.id);
    let updated;
    if (exists) {
      updated = bookmarks.filter(b => b.id !== quoteItem.id);
    } else {
      updated = [...bookmarks, quoteItem];
    }
    setBookmarks(updated);
    localStorage.setItem("hexFavs", JSON.stringify(updated));
  };

  const copyText = (q) => {
    navigator.clipboard.writeText(`"${q.text}" - ${q.author}`);
    alert("Copied to clipboard! 📋");
  };

  return (
    <div>
      {/* Top navbar styling layer */}
      <nav className="navbar">
        <div className="logo">✨ QuoteSpark</div>
        <div className="nav-links">
          <span>Home</span>
          <span>Categories</span>
          <span style={{color: 'var(--accent)'}}>Favorites ({bookmarks.length})</span>
          <span>About</span>
        </div>
      </nav>

      {/* Modern High-End Banner */}
      <div className="hero-banner">
        <h2>Quote of the Day</h2>
        <p>Discover inspiring quotes every day.</p>
      </div>

      {/* Two Column Layout Grid System matching image layout */}
      <div className="dashboard-grid">
        
        {/* LEFT COLUMN: Main Showcase & Category Selection */}
        <div>
          <div className="main-card">
            <div className="quote-icon">“</div>
            <p className="quote-main-text">{mainQuote.text}</p>
            <span className="quote-author">- {mainQuote.author}</span>
            <span className="tag-badge">{mainQuote.category}</span>
            
            <div className="action-row">
              <button className="btn btn-primary" onClick={fetchRandomQuote}>New Quote</button>
              <button className="btn btn-accent" onClick={() => handleBookmark(mainQuote)}>
                {bookmarks.some(b => b.id === mainQuote.id) ? "★ Bookmarked" : "☆ Bookmark"}
              </button>
              <button className="btn btn-outline" onClick={() => copyText(mainQuote)}>Copy Quote</button>
            </div>
          </div>

          <h3 className="section-title">Categories Section</h3>
          <div className="categories-grid">
            <div 
              className={`category-box ${selectedCategory === "All" ? "active" : ""}`}
              onClick={() => handleCategoryClick("All")}
            >
              <div className="category-icon">🌐</div>
              <div>All Quotes</div>
            </div>
            {categoryList.map((cat, idx) => (
              <div 
                key={idx} 
                className={`category-box ${selectedCategory === cat.name ? "active" : ""}`}
                onClick={() => handleCategoryClick(cat.name)}
              >
                <div className="category-icon">{cat.icon}</div>
                <div>{cat.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Bookmarks Grid & Dynamic Stream List */}
        <div>
          {bookmarks.length > 0 && (
            <>
              <h3 className="section-title">Bookmarked Quotes Section</h3>
              <div className="sub-grid">
                {bookmarks.map((b, i) => (
                  <div key={i} className="small-card">
                    <span className="bookmark-icon" onClick={() => handleBookmark(b)}>★</span>
                    <p className="small-card-text">"{b.text}"</p>
                    <span className="small-card-author">- {b.author}</span>
                    <span style={{fontSize:'0.75rem', color:'var(--primary)'}}>{b.category}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          <h3 className="section-title">Popular Quotes Section ({selectedCategory})</h3>
          <div className="sub-grid">
            {popularQuotes.map((p, i) => (
              <div key={i} className="small-card">
                <span 
                  className="bookmark-icon" 
                  onClick={() => handleBookmark(p)}
                  style={{color: bookmarks.some(b => b.id === p.id) ? 'var(--accent)' : '#ccc'}}
                >
                  ★
                </span>
                <p className="small-card-text">"{p.text}"</p>
                <span className="small-card-author">- {p.author}</span>
              </div>
            ))}
          </div>

          <div className="inspiration-banner">
            <h3>Daily Inspiration Banner</h3>
            <p>Get your daily dose of elite anime inspiration!</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;