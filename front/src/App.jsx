import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [mainQuote, setMainQuote] = useState({ text: "Loading quote...", author: "System", category: "Anime" });
  const [folderQuotes, setFolderQuotes] = useState([]);
  const [activeFolder, setActiveFolder] = useState('All');
  const [bookmarks, setBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAboutModal, setShowAboutModal] = useState(false);

  const API_URL = "http://localhost:5000/api/quotes";

  // Categories with Professional FontAwesome Icons
  const folderStructure = [
    { name: "Anime", icon: "fa-solid fa-wand-magic-sparkles" },
    { name: "Affirmations", icon: "fa-solid fa-brain" },
    { name: "Motivation", icon: "fa-solid fa-fire" },
    { name: "Success", icon: "fa-solid fa-trophy" },
    { name: "Study", icon: "fa-solid fa-graduation-cap" },
    { name: "Life", icon: "fa-solid fa-compass" },
    { name: "Leadership", icon: "fa-solid fa-crown" }
  ];

  useEffect(() => {
    fetchRandomHeroQuote();
    fetchFolderData('All');
    const saved = JSON.parse(localStorage.getItem("sparkFavs")) || [];
    setBookmarks(saved);
  }, []);

  const fetchRandomHeroQuote = async () => {
    try {
      const res = await axios.get(`${API_URL}/random`);
      setMainQuote(res.data);
    } catch (err) {
      console.error("Backend Error:", err);
    }
  };

  const fetchFolderData = async (folderName) => {
    try {
      let url = API_URL;
      if (folderName !== 'All') {
        url = `${API_URL}?category=${folderName}`;
      }
      const res = await axios.get(url);
      setFolderQuotes(res.data);
      setActiveFolder(folderName);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;
    try {
      const res = await axios.get(`${API_URL}?author=${searchQuery}`);
      setFolderQuotes(res.data);
      setCurrentView('categories');
      setActiveFolder(`Search: "${searchQuery}"`);
    } catch (err) {
      console.error(err);
    }
  };

  const toggleBookmark = (item) => {
    const isPresent = bookmarks.some(b => b.id === item.id);
    let updated = isPresent 
      ? bookmarks.filter(b => b.id !== item.id)
      : [...bookmarks, item];
    
    setBookmarks(updated);
    localStorage.setItem("sparkFavs", JSON.stringify(updated));
  };

  const copyText = (item) => {
    navigator.clipboard.writeText(`"${item.text}" — ${item.author}`);
    alert("Quote copied to clipboard! ✨");
  };

  return (
    <div>
      {/* Glassmorphism Header */}
      <nav className="navbar">
        <div className="logo" onClick={() => setCurrentView('home')}>
          <i className="fa-solid fa-quote-left" style={{ fontSize: '1.8rem', color: '#38BDF8' }}></i>
          <span>QuoteSpark</span>
        </div>
        <div className="nav-links">
          <div className={`nav-item ${currentView === 'home' ? 'active' : ''}`} onClick={() => setCurrentView('home')}>
            <i className="fa-solid fa-house"></i> Home
          </div>
          <div className={`nav-item ${currentView === 'categories' ? 'active' : ''}`} onClick={() => { setCurrentView('categories'); fetchFolderData('All'); }}>
            <i className="fa-solid fa-compass"></i> Explore
          </div>
          <div className={`nav-item ${currentView === 'favorites' ? 'active' : ''}`} onClick={() => setCurrentView('favorites')}>
            <i className="fa-solid fa-bookmark"></i> Saved ({bookmarks.length})
          </div>
          <div className="nav-item" onClick={() => setShowAboutModal(true)}>
            <i className="fa-solid fa-circle-info"></i> About
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div className="hero-banner">
        <h1>{currentView === 'home' ? "Daily Spark of Inspiration" : currentView.toUpperCase()}</h1>
        <p>Fuel your day with high-impact wisdom, quotes, and affirmations.</p>
      </div>

      {/* Main Container */}
      <div className="view-container">
        {currentView === 'home' && (
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '30px' }}>
            <div>
              <div className="glass-card">
                <span className="tag-badge">
                  <i className="fa-solid fa-bolt"></i> {mainQuote.category}
                </span>
                <p className="quote-main-text">“{mainQuote.text}”</p>
                <p style={{ textAlign: 'right', fontStyle: 'italic', color: 'var(--text-muted)' }}>— {mainQuote.author}</p>
                
                <div className="btn-group">
                  <button className="btn btn-primary" onClick={fetchRandomHeroQuote}>
                    <i className="fa-solid fa-rotate"></i> New Quote
                  </button>
                  <button className="btn btn-outline" onClick={() => toggleBookmark(mainQuote)}>
                    <i className={`fa-${bookmarks.some(b => b.id === mainQuote.id) ? 'solid' : 'regular'} fa-star`} style={{ color: '#F59E0B' }}></i> Save
                  </button>
                  <button className="btn btn-outline" onClick={() => copyText(mainQuote)}>
                    <i className="fa-regular fa-copy"></i> Copy
                  </button>
                </div>
              </div>

              <h3 style={{ marginTop: '35px', marginBottom: '10px' }}>Explore Categories</h3>
              <div className="categories-layout-grid">
                {folderStructure.map((folder, index) => (
                  <div 
                    key={index} 
                    className="category-box"
                    onClick={() => {
                      setCurrentView('categories');
                      fetchFolderData(folder.name);
                    }}
                  >
                    <div className="category-icon">
                      <i className={folder.icon}></i>
                    </div>
                    <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{folder.name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3>Featured Anime Wisdom</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                {folderQuotes.filter(q => q.category === 'Anime').slice(0, 3).map((q, i) => (
                  <div key={i} className="glass-card" style={{ padding: '20px' }}>
                    <p style={{ fontWeight: '500', fontSize: '0.95rem' }}>"{q.text}"</p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '10px', textAlign: 'right' }}>— {q.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentView === 'categories' && (
          <div>
            <form className="search-container" onSubmit={handleSearch}>
              <div className="search-input-wrapper">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input 
                  type="text" 
                  className="search-input"
                  placeholder="Search by author or quote..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button type="submit" className="btn btn-primary">Search</button>
            </form>

            <div className="categories-layout-grid" style={{ marginBottom: '30px' }}>
              <div className={`category-box ${activeFolder === 'All' ? 'active' : ''}`} onClick={() => fetchFolderData('All')}>
                <div className="category-icon"><i className="fa-solid fa-border-all"></i></div>
                <div style={{ fontWeight: '600' }}>All</div>
              </div>
              {folderStructure.map((folder, idx) => (
                <div key={idx} className={`category-box ${activeFolder === folder.name ? 'active' : ''}`} onClick={() => fetchFolderData(folder.name)}>
                  <div className="category-icon"><i className={folder.icon}></i></div>
                  <div style={{ fontWeight: '600' }}>{folder.name}</div>
                </div>
              ))}
            </div>

            <h3>Folder: <span style={{ color: 'var(--primary-accent)' }}>{activeFolder}</span></h3>
            <div className="quotes-list-grid">
              {folderQuotes.map((item, idx) => (
                <div key={idx} className="glass-card">
                  <p style={{ fontWeight: '500', marginBottom: '15px', lineHeight: '1.5' }}>“{item.text}”</p>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', textAlign: 'right' }}>— {item.author}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', paddingTop: '15px', borderTop: '1px solid var(--card-border)' }}>
                    <span className="tag-badge">{item.category}</span>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <i className="fa-regular fa-copy" style={{ cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => copyText(item)}></i>
                      <i className={`fa-${bookmarks.some(b => b.id === item.id) ? 'solid' : 'regular'} fa-star`} style={{ cursor: 'pointer', color: bookmarks.some(b => b.id === item.id) ? '#F59E0B' : 'var(--text-muted)' }} onClick={() => toggleBookmark(item)}></i>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'favorites' && (
          <div>
            <h3 style={{ marginBottom: '20px' }}>Saved Favorites</h3>
            {bookmarks.length === 0 ? (
              <p style={{ color: 'var(--text-muted)' }}>No bookmarks added yet. Click ★ on quotes to save them here!</p>
            ) : (
              <div className="quotes-list-grid">
                {bookmarks.map((item, idx) => (
                  <div key={idx} className="glass-card">
                    <p style={{ fontWeight: '500' }}>“{item.text}”</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '10px', textAlign: 'right' }}>— {item.author}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* About Modal */}
      {showAboutModal && (
        <div className="modal-overlay" onClick={() => setShowAboutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <i className="fa-solid fa-xmark close-modal" onClick={() => setShowAboutModal(false)}></i>
            
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <i className="fa-solid fa-quote-left" style={{ fontSize: '2.5rem', color: 'var(--primary-accent)' }}></i>
              <h2 style={{ marginTop: '10px' }}>About QuoteSpark</h2>
            </div>

            <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', fontSize: '0.95rem' }}>
              QuoteSpark is a modern developer-centric web application built to deliver daily motivation, anime insights, and positive affirmations through an interactive dashboard.
            </p>

            <div className="developer-box">
              <h4 style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <i className="fa-solid fa-code"></i> Developer Profile
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '8px' }}>
                <i className="fa-solid fa-envelope" style={{ marginRight: '8px' }}></i> 
                <strong>Email:</strong> quoteday05@gmail.com
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <i className="fa-brands fa-linkedin" style={{ marginRight: '8px' }}></i> 
                <strong>LinkedIn:</strong> <a href="https://linkedin.com" target="_blank" rel="noreferrer">linkedin.com/in/veenu-pundir</a>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;