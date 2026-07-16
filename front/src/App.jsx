import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // Navigation State Control View: 'home' | 'categories' | 'favorites' | 'about'
  const [currentView, setCurrentView] = useState('home');
  
  // Data States
  const [mainQuote, setMainQuote] = useState({ text: "Loading...", author: "System", category: "Anime" });
  const [folderQuotes, setFolderQuotes] = useState([]);
  const [activeFolder, setActiveFolder] = useState('All');
  const [bookmarks, setBookmarks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const API_URL = "http://localhost:5000/api/quotes";

  // Exact UI folders matrix match
  const folderStructure = [
    { name: "Anime", icon: "🥷" },
    { name: "Affirmations", icon: "🧠" },
    { name: "Motivation", icon: "📈" },
    { name: "Success", icon: "🏆" },
    { name: "Study", icon: "🎓" },
    { name: "Life", icon: "🌱" },
    { name: "Leadership", icon: "👥" }
  ];

  // Load baseline framework actions
  useEffect(() => {
    fetchRandomHeroQuote();
    fetchFolderData('All');
    setBookmarks(JSON.parse(localStorage.getItem("sparkFavs")) || []);
  }, []);

  const fetchRandomHeroQuote = async () => {
    try {
      const res = await axios.get(`${API_URL}/random`);
      setMainQuote(res.data);
    } catch (err) { console.error("Server down/refused.", err); }
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
    } catch (err) { console.error(err); }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API_URL}?author=${searchQuery}`);
      setFolderQuotes(res.data);
      setCurrentView('categories'); // Shift viewport to folders list to visualize matches
      setActiveFolder(`Search: "${searchQuery}"`);
    } catch (err) { console.error(err); }
  };

  const toggleBookmark = (item) => {
    const isPresent = bookmarks.some(b => b.id === item.id);
    let updated;
    if (isPresent) {
      updated = bookmarks.filter(b => b.id !== item.id);
    } else {
      updated = [...bookmarks, item];
    }
    setBookmarks(updated);
    localStorage.setItem("sparkFavs", JSON.stringify(updated));
  };

  const copyText = (item) => {
    navigator.clipboard.writeText(`"${item.text}" — ${item.author}`);
    alert("Quote successfully copied to clipboard! 📋");
  };

  return (
    <div>
      {/* GLOBAL NAVBAR - 100% WORKING TABS */}
      <nav className="navbar">
        <div className="logo" onClick={() => setCurrentView('home')}>✨ QuoteSpark</div>
        <div className="nav-links">
          <span className={currentView === 'home' ? 'active' : ''} onClick={() => setCurrentView('home')}>Home</span>
          <span className={currentView === 'categories' ? 'active' : ''} onClick={() => { setCurrentView('categories'); fetchFolderData('All'); }}>Categories</span>
          <span className={currentView === 'favorites' ? 'active' : ''} onClick={() => setCurrentView('favorites')}>Favorites ({bookmarks.length})</span>
          <span className={currentView === 'about' ? 'active' : ''} onClick={() => setCurrentView('about')}>About</span>
        </div>
      </nav>

      {/* GRADIENT DYNAMIC HERO HEADER */}
      <div className="hero-banner">
        <h2>{currentView === 'home' ? "Quote of the Day" : currentView.toUpperCase()}</h2>
        <p>Discover inspiring folders and premium content instantly.</p>
      </div>

      {/* CORE DISPLAY ROUTER ENGINE SECTION */}
      <div className="view-container">
        
        {/* VIEW 1: HOME SCREEN VIEW */}
        {currentView === 'home' && (
          <div className="main-layout">
            {/* Left Side: Hero Cards & Folder Box Navigation */}
            <div>
              <div className="main-card">
                <div className="quote-icon">“</div>
                <p className="quote-main-text">{mainQuote.text}</p>
                <span className="quote-author">— {mainQuote.author}</span>
                <span className="tag-badge">{mainQuote.category}</span>
                
                <div className="action-row">
                  <button className="btn btn-primary" onClick={fetchRandomHeroQuote}>New Quote 🔄</button>
                  <button className="btn btn-accent" onClick={() => toggleBookmark(mainQuote)}>
                    {bookmarks.some(b => b.id === mainQuote.id) ? "★ Bookmarked" : "☆ Bookmark"}
                  </button>
                  <button className="btn btn-outline" onClick={() => copyText(mainQuote)}>Copy Text</button>
                </div>
              </div>

              <h3 style={{marginTop: '30px'}} className="folder-view-header">Quick Categories Section</h3>
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
                    <div className="category-icon">{folder.icon}</div>
                    <div style={{fontWeight:'600'}}>{folder.name}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side Dashboard Previews */}
            <div>
              <h3 className="folder-view-header">Popular Anime Spotlight Stream</h3>
              <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
                {folderQuotes.filter(q => q.category === 'Anime').slice(0, 2).map((q, i) => (
                  <div key={i} className="display-card">
                    <p className="display-card-text">"{q.text}"</p>
                    <div className="display-card-footer">
                      <span style={{fontSize:'0.85rem', color:'var(--text-s)'}}>— {q.author}</span>
                      <span className="bookmark-star active" onClick={() => toggleBookmark(q)}>★</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: CATEGORIES FOLDER LOOKUP SCREEN VIEW */}
        {currentView === 'categories' && (
          <div>
            {/* Dynamic Search bar routing capability */}
            <form className="search-bar-wrap" onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Search quotes or authors (e.g. Naruto, Self, Gandhi)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} 
              />
              <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {/* Live Folder Selection Strip Buttons */}
            <div className="categories-layout-grid" style={{marginBottom: '40px'}}>
              <div 
                className={`category-box ${activeFolder === 'All' ? 'active' : ''}`}
                onClick={() => fetchFolderData('All')}
              >
                <div className="category-icon">🌐</div>
                <div style={{fontWeight:'600'}}>All Folders</div>
              </div>
              {folderStructure.map((folder, idx) => (
                <div 
                  key={idx} 
                  className={`category-box ${activeFolder === folder.name ? 'active' : ''}`}
                  onClick={() => fetchFolderData(folder.name)}
                >
                  <div className="category-icon">{folder.icon}</div>
                  <div style={{fontWeight:'600'}}>{folder.name}</div>
                </div>
              ))}
            </div>

            {/* Folder Data Grid Output Stream */}
            <h3 className="folder-view-header">Folder: <span style={{color:'var(--primary)'}}>{activeFolder}</span> ({folderQuotes.length} Items found)</h3>
            <div className="quotes-list-grid">
              {folderQuotes.length === 0 ? (
                <p>This folder is currently empty.</p>
              ) : (
                folderQuotes.map((item, idx) => (
                  <div key={idx} className="display-card">
                    <div>
                      <p className="display-card-text">“{item.text}”</p>
                      <p style={{fontSize:'0.85rem', fontStyle:'italic', color:'var(--text-s)'}}>— {item.author}</p>
                    </div>
                    <div className="display-card-footer">
                      <span className="tag-badge">{item.category}</span>
                      <div style={{display:'flex', gap:'10px', alignItems:'center'}}>
                        <button className="btn btn-outline" style={{padding:'4px 8px', fontSize:'0.75rem'}} onClick={() => copyText(item)}>Copy</button>
                        <span 
                          className={`bookmark-star ${bookmarks.some(b => b.id === item.id) ? 'active' : ''}`} 
                          onClick={() => toggleBookmark(item)}
                        >
                          ★
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* VIEW 3: BOOKMARKS / FAVORITES TAB SCREEN VIEW */}
        {currentView === 'favorites' && (
          <div className="favorites-card">
            <h3 className="folder-view-header" style={{marginBottom:'20px'}}>Your Bookmarked Collection Store</h3>
            {bookmarks.length === 0 ? (
              <p style={{color: 'var(--text-s)'}}>Your saved collection is empty. Click stars on any quote folder to save them here!</p>
            ) : (
              <div className="quotes-list-grid">
                {bookmarks.map((item, idx) => (
                  <div key={idx} className="display-card">
                    <p className="display-card-text">“{item.text}”</p>
                    <div className="display-card-footer">
                      <span style={{fontSize:'0.85rem', color:'var(--text-s)'}}>— {item.author}</span>
                      <span className="bookmark-star active" onClick={() => toggleBookmark(item)}>★</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 4: ABOUT TAB SCREEN VIEW */}
        {currentView === 'about' && (
          <div className="about-card">
            <h3 className="folder-view-header">About QuoteSpark</h3>
            <p style={{lineHeight:'1.8', color:'var(--text-p)', marginTop:'15px'}}>
              Welcome to <strong>QuoteSpark</strong>! This is an interactive dashboard tailored for deep modern layout execution. 
              Featuring dynamic multi-view routing states, an integrated comprehensive <strong>Affirmation system repository</strong>, 
              and an expanded <strong>Anime inspiration zone</strong> mapped precisely to your premium color design specification values.
            </p>
            <p style={{marginTop:'15px', fontWeight:'600', color:'var(--primary)'}}>Designed with Precision. Mapped with Care.</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
