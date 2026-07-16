const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Dynamic Data Matrix: Mixing Anime Quotes, Global Legends & Affirmations
let items = [
  // --- Anime Quotes Category ---
  { text: "If you don't like your destiny, don't accept it. Instead, have the courage to change it the way you want it to be.", author: "Naruto Uzumaki", category: "Anime" },
  { text: "If you lose credibility, nobody will trust you anymore.", author: "Fujitora (One Piece)", category: "Anime" },
  { text: "People's lives don't end when they die. It ends when they lose faith.", author: "Itachi Uchiha", category: "Anime" },
  { text: "If you don't take risks, you can't create a future!", author: "Monkey D. Luffy", category: "Anime" },
  { text: "Whatever you lose, you'll find it again. But what you throw away you'll never get back.", author: "Kenshin Himura", category: "Anime" },
  { text: "When you give up, your dreams die with you.", author: "Naruto Uzumaki", category: "Anime" },
  { text: "A lesson without pain is meaningless.", author: "Edward Elric", category: "Anime" },
  {text: "Hard work is worthless for those that don't believe in themselves.",author: "Naruto Uzumaki",category: "Anime"
},
{
  text: "Never give up without even trying.",
  author: "Naruto Uzumaki",
  category: "Anime"
},
{
  text: "Those who forgive themselves are the truly strong ones.",
  author: "Itachi Uchiha",
  category: "Anime"
},
{
  text: "People's lives don't end when they die. It ends when they lose faith.",
  author: "Itachi Uchiha",
  category: "Anime"
},
{
  text: "Wake up to reality. Nothing ever goes as planned in this world.",
  author: "Madara Uchiha",
  category: "Anime"
},
{
  text: "The longer you live, the more you realize reality is full of pain.",
  author: "Madara Uchiha",
  category: "Anime"
},
{
  text: "A lesson without pain is meaningless.",
  author: "Edward Elric",
  category: "Anime"
},
{
  text: "Stand up and walk. Keep moving forward.",
  author: "Edward Elric",
  category: "Anime"
},
{
  text: "Fear is not evil. It tells you what your weakness is.",
  author: "Gildarts Clive",
  category: "Anime"
},
{
  text: "Power comes in response to a need, not a desire.",
  author: "Goku",
  category: "Anime"
},
{
  text: "Push through the pain. Giving up hurts more.",
  author: "Vegeta",
  category: "Anime"
},
{
  text: "If you don't take risks, you can't create a future.",
  author: "Monkey D. Luffy",
  category: "Anime"
},
{
  text: "When people are forgotten, that's when they truly die.",
  author: "Dr. Hiluluk",
  category: "Anime"
},
{
  text: "A dropout will beat a genius through hard work.",
  author: "Rock Lee",
  category: "Anime"
},
{
  text: "Growth happens when you go beyond your limits.",
  author: "Jiraiya",
  category: "Anime"
},
{
  text: "Believe in the you that believes in yourself.",
  author: "Kamina",
  category: "Anime"
},
{
  text: "If you win, you live. If you lose, you die.",
  author: "Eren Yeager",
  category: "Anime"
},
{
  text: "The world is cruel, but it is also beautiful.",
  author: "Mikasa Ackerman",
  category: "Anime"
},
{
  text: "The only ones who should kill are those prepared to be killed.",
  author: "Lelouch Lamperouge",
  category: "Anime"
},
{
  text: "You should enjoy the little detours.",
  author: "Ging Freecss",
  category: "Anime"
},
  
  // --- Affirmations Category ---
  { text: "I am computational, adaptable, and capable of solving complex engineering bugs.", author: "Self", category: "Affirmations" },
  { text: "My mind is highly focused, and I conquer every challenge with discipline.", author: "Self", category: "Affirmations" },
  { text: "Every day, I am moving closer to becoming a stellar engineer and open-source leader.", author: "Self", category: "Affirmations" },
  {
  text: "I am capable of achieving great things.",
  author: "Self",
  category: "Affirmations"
},
{
  text: "I believe in myself and my abilities.",
  author: "Self",
  category: "Affirmations"
},
{
  text: "Every day I become stronger and wiser.",
  author: "Self",
  category: "Affirmations"
},
{
  text: "I attract success and positivity.",
  author: "Self",
  category: "Affirmations"
},
{
  text: "I am enough exactly as I am.",
  author: "Self",
  category: "Affirmations"
},
{
  text: "I choose progress over perfection.",
  author: "Self",
  category: "Affirmations"
},
{
  text: "I can overcome every challenge.",
  author: "Self",
  category: "Affirmations"
},
{
  text: "My dreams are worth pursuing.",
  author: "Self",
  category: "Affirmations"
},
{
  text: "I deserve happiness and success.",
  author: "Self",
  category: "Affirmations"
},
{
  text: "I am becoming the best version of myself.",
  author: "Self",
  category: "Affirmations"
},
{
  text: "Today is full of new opportunities.",
  author: "Self",
  category: "Affirmations"
},
{
  text: "I am proud of how far I have come.",
  author: "Self",
  category: "Affirmations"
},
{
  text: "I trust the journey of my life.",
  author: "Self",
  category: "Affirmations"
},
{
  text: "I am fearless, focused, and confident.",
  author: "Self",
  category: "Affirmations"
},
{
  text: "I create my own future with my actions.",
  author: "Self",
  category: "Affirmations"
},

  // --- Other Design Categories matching your layout ---
  { text: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt", category: "Motivation" },
  { text: "Choose a job you love, and you will never have to work a day in your life.", author: "Confucius", category: "Success" },
  { text: "Cultivation of mind should be the ultimate aim of human existence.", author: "B. R. Ambedkar", category: "Study" },
  { text: "In a gentle way, you can shake the world.", author: "Mahatma Gandhi", category: "Life" },
  { text: "You cannot believe in God until you believe in yourself.", author: "Swami Vivekananda", category: "Leadership" },
  { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
  { text: "Success is not the key to happiness. Happiness is the key to success.", author: "Albert Schweitzer" },
  { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { text: "Happiness depends upon ourselves.", author: "Aristotle" },
  { text: "The unexamined life is not worth living.", author: "Socrates" },
  { text: "Knowing yourself is the beginning of all wisdom.", author: "Aristotle" },
  { text: "No one can make you feel inferior without your consent.", author: "Eleanor Roosevelt" },
  { text: "It always seems impossible until it's done.", author: "Nelson Mandela" },
  { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
  { text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" },
  { text: "Well begun is half done.", author: "Aristotle" },
  { text: "Knowing is not enough; we must apply. Willing is not enough; we must do.", author: "Johann Wolfgang von Goethe" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" },
  { text: "Don't count the days, make the days count.", author: "Muhammad Ali" },
  { text: "The best revenge is massive success.", author: "Frank Sinatra" },
  { text: "Our greatest glory is not in never falling, but in rising every time we fall.", author: "Confucius" },
  { text: "Act as if what you do makes a difference. It does.", author: "William James" },
  { text: "If opportunity doesn't knock, build a door.", author: "Milton Berle" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Stay hungry. Stay foolish.", author: "Steve Jobs" },
  { text: "Never, never, never give up.", author: "Winston Churchill" },
  { text: "The successful warrior is the average man, with laser-like focus.", author: "Bruce Lee" },
  { text: "What we think, we become.", author: "Buddha" },
  ];


// Automatically index everything on startup (Tareeka 2)
items = items.map((item, index) => ({ id: index + 1, ...item }));

// Route: Get all items or filter by author/category
app.get('/api/quotes', (req, res) => {
  const { author, category } = req.query;
  let filtered = [...items];

  if (author) {
    filtered = filtered.filter(q => q.author.toLowerCase().includes(author.toLowerCase()));
  }
  if (category) {
    filtered = filtered.filter(q => q.category.toLowerCase() === category.toLowerCase());
  }
  res.json(filtered);
});

// Route: Get a random quote
app.get('/api/quotes/random', (req, res) => {
  if (items.length === 0) return res.status(404).json({ error: "No quotes available" });
  const randomIndex = Math.floor(Math.random() * items.length);
  res.json(items[randomIndex]);
});

// Route: Create a new quote
app.post('/api/quotes', (req, res) => {
  const { text, author, category } = req.body;
  if (!text || !author) return res.status(400).json({ error: "Required fields missing" });

  const newItem = { id: items.length + 1, text, author, category: category || "General" };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.listen(PORT, () => console.log(`Anime Themed Backend on http://localhost:${PORT}`));