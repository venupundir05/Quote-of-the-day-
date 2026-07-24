const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


 const quotesData = [
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
 //Motivational Quotes Category
 {
  text: "Success is the sum of small efforts repeated day in and day out.",
  author: "Robert Collier",
  category: "Motivation"
},
{
  text: "Don't watch the clock; do what it does. Keep going.",
  author: "Sam Levenson",
  category: "Motivation"
},
{
  text: "The future depends on what you do today.",
  author: "Mahatma Gandhi",
  category: "Motivation"
},
{
  text: "Dream big and dare to fail.",
  author: "Norman Vaughan",
  category: "Motivation"
},
{
  text: "Action is the foundational key to all success.",
  author: "Pablo Picasso",
  category: "Motivation"
},
{
  text: "Your only limit is your mind.",
  author: "Unknown",
  category: "Motivation"
},
{
  text: "Push yourself because no one else is going to do it for you.",
  author: "Unknown",
  category: "Motivation"
},
{
  text: "Small steps every day lead to big results.",
  author: "Unknown",
  category: "Motivation"
},
{
  text: "Work hard in silence, let success make the noise.",
  author: "Frank Ocean",
  category: "Motivation"
},
{
  text: "Difficult roads often lead to beautiful destinations.",
  author: "Zig Ziglar",
  category: "Motivation"
},
{
  text: "Believe you can and you're halfway there.",
  author: "Theodore Roosevelt",
  category: "Motivation"
},
{
  text: "Success begins with self-belief.",
  author: "Unknown",
  category: "Motivation"
},
{
  text: "Never stop learning.",
  author: "Unknown",
  category: "Motivation"
},
{
  text: "Discipline beats motivation.",
  author: "Unknown",
  category: "Motivation"
},
{
  text: "Every expert was once a beginner.",
  author: "Helen Hayes",
  category: "Motivation"
},
{
  text: "Stay hungry. Stay foolish.",
  author: "Steve Jobs",
  category: "Motivation"
},
{
  text: "The best way to predict the future is to create it.",
  author: "Peter Drucker",
  category: "Motivation"
},
{
  text: "Success is not final; failure is not fatal.",
  author: "Winston Churchill",
  category: "Motivation"
},
{
  text: "Great things never come from comfort zones.",
  author: "Unknown",
  category: "Motivation"
},
{
  text: "Keep going. Everything you need will come to you.",
  author: "Unknown",
  category: "Motivation"
},
//Leadership Quotes Category
{
  text: "A leader is one who knows the way, goes the way, and shows the way.",
  author: "John C. Maxwell",
  category: "Leadership"
},
{
  text: "Leadership is action, not position.",
  author: "Donald McGannon",
  category: "Leadership"
},
{
  text: "The greatest leader is not necessarily the one who does the greatest things.",
  author: "Ronald Reagan",
  category: "Leadership"
},
{
  text: "Lead by example.",
  author: "Albert Schweitzer",
  category: "Leadership"
},
{
  text: "Leadership is the capacity to translate vision into reality.",
  author: "Warren Bennis",
  category: "Leadership"
},
{
  text: "Earn trust before expecting loyalty.",
  author: "Unknown",
  category: "Leadership"
},
{
  text: "A true leader creates more leaders.",
  author: "Tom Peters",
  category: "Leadership"
},
{
  text: "Leadership starts with self-discipline.",
  author: "Unknown",
  category: "Leadership"
},
{
  text: "The strength of the team is each individual member.",
  author: "Phil Jackson",
  category: "Leadership"
},
{
  text: "Good leaders inspire hope.",
  author: "Napoleon Bonaparte",
  category: "Leadership"
},
{
  text: "Great leaders serve first.",
  author: "Robert K. Greenleaf",
  category: "Leadership"
},
{
  text: "Example is not the main thing in influencing others. It is the only thing.",
  author: "Albert Schweitzer",
  category: "Leadership"
},
{
  text: "Leadership is unlocking people's potential.",
  author: "Bill Bradley",
  category: "Leadership"
},
{
  text: "Be the leader you would follow.",
  author: "Unknown",
  category: "Leadership"
},
{
  text: "Leaders make others better.",
  author: "Sheryl Sandberg",
  category: "Leadership"
},
{
  text: "Vision without action is merely a dream.",
  author: "Joel A. Barker",
  category: "Leadership"
},
{
  text: "Listen more than you speak.",
  author: "Unknown",
  category: "Leadership"
},
{
  text: "Leadership is about making others successful.",
  author: "Unknown",
  category: "Leadership"
},
{
  text: "Courage is the first quality of leadership.",
  author: "Aristotle",
  category: "Leadership"
},
{
  text: "Integrity is the foundation of leadership.",
  author: "Brian Tracy",
  category: "Leadership"
},
// Success Quotes Category
{
  text: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  author: "Winston Churchill",
  category: "Success"
},
{
  text: "Success usually comes to those who are too busy to be looking for it.",
  author: "Henry David Thoreau",
  category: "Success"
},
{
  text: "The secret of success is consistency of purpose.",
  author: "Benjamin Disraeli",
  category: "Success"
},
{
  text: "Success is the sum of small efforts repeated day after day.",
  author: "Robert Collier",
  category: "Success"
},
{
  text: "Opportunities don't happen. You create them.",
  author: "Chris Grosser",
  category: "Success"
},
{
  text: "Success begins where excuses end.",
  author: "Unknown",
  category: "Success"
},
{
  text: "Dream big. Start small. Act now.",
  author: "Robin Sharma",
  category: "Success"
},
{
  text: "Success is earned, not given.",
  author: "Unknown",
  category: "Success"
},
{
  text: "Focus on progress, not perfection.",
  author: "Unknown",
  category: "Success"
},
{
  text: "Success follows discipline.",
  author: "Unknown",
  category: "Success"
},
{
  text: "Hard work beats talent when talent doesn't work hard.",
  author: "Tim Notke",
  category: "Success"
},
{
  text: "Stay patient and trust your journey.",
  author: "Unknown",
  category: "Success"
},
{
  text: "Success starts with believing in yourself.",
  author: "Unknown",
  category: "Success"
},
{
  text: "Never stop improving yourself.",
  author: "Unknown",
  category: "Success"
},
{
  text: "Small wins build great success.",
  author: "Unknown",
  category: "Success"
},
{
  text: "Discipline is the bridge between goals and success.",
  author: "Jim Rohn",
  category: "Success"
},
{
  text: "Great things take time.",
  author: "Unknown",
  category: "Success"
},
{
  text: "Your future is created by what you do today.",
  author: "Robert Kiyosaki",
  category: "Success"
},
{
  text: "Keep moving until you're proud.",
  author: "Unknown",
  category: "Success"
},
{
  text: "Success is built one day at a time.",
  author: "Unknown",
  category: "Success"
},
//Life Quotes Category
{
  text: "Life is what happens while you are busy making other plans.",
  author: "John Lennon",
  category: "Life"
},
{
  text: "Be yourself; everyone else is already taken.",
  author: "Oscar Wilde",
  category: "Life"
},
{
  text: "The purpose of life is to live it.",
  author: "Eleanor Roosevelt",
  category: "Life"
},
{
  text: "Happiness depends upon ourselves.",
  author: "Aristotle",
  category: "Life"
},
{
  text: "Life is really simple, but we insist on making it complicated.",
  author: "Confucius",
  category: "Life"
},
{
  text: "Wherever life plants you, bloom with grace.",
  author: "Unknown",
  category: "Life"
},
{
  text: "Every moment is a fresh beginning.",
  author: "T. S. Eliot",
  category: "Life"
},
{
  text: "Live the life you have imagined.",
  author: "Henry David Thoreau",
  category: "Life"
},
{
  text: "Do what makes your soul shine.",
  author: "Unknown",
  category: "Life"
},
{
  text: "Life is short. Make it meaningful.",
  author: "Unknown",
  category: "Life"
},
{
  text: "The best is yet to come.",
  author: "Frank Sinatra",
  category: "Life"
},
{
  text: "Life rewards those who never give up.",
  author: "Unknown",
  category: "Life"
},
{
  text: "Every day is a second chance.",
  author: "Unknown",
  category: "Life"
},
{
  text: "The journey matters more than the destination.",
  author: "Unknown",
  category: "Life"
},
{
  text: "Life begins at the end of your comfort zone.",
  author: "Neale Donald Walsch",
  category: "Life"
},
{
  text: "Be grateful for every moment.",
  author: "Unknown",
  category: "Life"
},
{
  text: "Life is a beautiful struggle.",
  author: "Unknown",
  category: "Life"
},
{
  text: "Choose kindness every day.",
  author: "Unknown",
  category: "Life"
},
{
  text: "Your attitude shapes your life.",
  author: "Unknown",
  category: "Life"
},
{
  text: "Live with purpose, love without limits.",
  author: "Unknown",
  category: "Life"
},
// Study Quotes Category
{
  text: "Learning never exhausts the mind.",
  author: "Leonardo da Vinci",
  category: "Study"
},
{
  text: "Education is the passport to the future.",
  author: "Malcolm X",
  category: "Study"
},
{
  text: "The beautiful thing about learning is nobody can take it away from you.",
  author: "B.B. King",
  category: "Study"
},
{
  text: "Success is the result of preparation.",
  author: "Alexander Graham Bell",
  category: "Study"
},
{
  text: "Study while others are sleeping.",
  author: "Unknown",
  category: "Study"
},
{
  text: "Today's study is tomorrow's success.",
  author: "Unknown",
  category: "Study"
},
{
  text: "Knowledge is power.",
  author: "Francis Bacon",
  category: "Study"
},
{
  text: "Don't stop until you're proud.",
  author: "Unknown",
  category: "Study"
},
{
  text: "Small daily improvements lead to big results.",
  author: "Unknown",
  category: "Study"
},
{
  text: "Study now, shine later.",
  author: "Unknown",
  category: "Study"
},
{
  text: "The expert in anything was once a beginner.",
  author: "Helen Hayes",
  category: "Study"
},
{
  text: "Discipline creates success.",
  author: "Unknown",
  category: "Study"
},
{
  text: "Every page you read makes you stronger.",
  author: "Unknown",
  category: "Study"
},
{
  text: "Learning is a lifelong journey.",
  author: "Unknown",
  category: "Study"
},
{
  text: "Stay focused on your goals.",
  author: "Unknown",
  category: "Study"
},
{
  text: "Practice makes progress.",
  author: "Unknown",
  category: "Study"
},
{
  text: "Education is the key to opportunity.",
  author: "Gordon B. Hinckley",
  category: "Study"
},
{
  text: "Consistency beats intensity.",
  author: "Unknown",
  category: "Study"
},
{
  text: "Every hour of study is an investment in yourself.",
  author: "Unknown",
  category: "Study"
},
{
  text: "Keep learning, keep growing.",
  author: "Unknown",
  category: "Study"
},

  ];


app.get('/api/quotes', (req, res) => {
  const { category, author } = req.query;

  let filteredQuotes = quotesData;

  // Filter by Category (Case-insensitive check)
  if (category && category !== 'All' && !category.startsWith('Search:')) {
    filteredQuotes = filteredQuotes.filter(
      q => q.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by Search Query
  if (author) {
    filteredQuotes = filteredQuotes.filter(
      q => q.author.toLowerCase().includes(author.toLowerCase()) || 
           q.text.toLowerCase().includes(author.toLowerCase())
    );
  }

  res.json(filteredQuotes);
});

// Random Quote Endpoint for Hero Banner
app.get('/api/quotes/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotesData.length);
  res.json(quotesData[randomIndex]);
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log('Comprehensive Engine Running on Port ${PORT}');
});