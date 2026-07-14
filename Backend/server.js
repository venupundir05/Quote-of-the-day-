
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000; 

app.use(cors());
app.use(express.json());

let quotes = [
  { text: "Arise, awake, and stop not till the goal is reached.", author: "Swami Vivekananda" },
  { text: "Dream is not that which you see while sleeping it is something that does not let you sleep.", author: "APJ Abdul Kalam" },
  { text: "You must be the change you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "Give me blood and I will give you freedom!", author: "Subhas Chandra Bose" },
  { text: "Swaraj is my birthright and I shall have it!", author: "Bal Gangadhar Tilak" },
  { text: "In a gentle way, you can shake the world.", author: "Mahatma Gandhi" },
  { text: "If you want to shine like a sun, first burn like a sun.", author: "APJ Abdul Kalam" },
  { text: "Truth triumphs alone, not untruth.", author: "Madan Mohan Malaviya" },
  { text: "Faith is the bird that feels the light when the dawn is still dark.", author: "Rabindranath Tagore" },
  { text: "Every pain gives a lesson and every lesson changes a person.", author: "APJ Abdul Kalam" },
  { text: "The true measure of any society can be found in how it treats its most vulnerable members.", author: "Mahatma Gandhi" },
  { text: "They may kill me, but they cannot kill my ideas.", author: "Bhagat Singh" },
  { text: "Cultivation of mind should be the ultimate aim of human existence.", author: "B. R. Ambedkar" },
  { text: "Be less judge-mental and more respectful.", author: "Swami Vivekananda" },
  { text: "You cannot believe in God until you believe in yourself.", author: "Swami Vivekananda" },
  { text: "Freedom of mind is the real freedom.", author: "B. R. Ambedkar" },
  { text: "We are what our thoughts have made us; so take care about what you think.", author: "Swami Vivekananda" },
  { text: "Don't take rest after your first victory because if you fail in second, more lips are waiting to say that your first victory was just luck.", author: "APJ Abdul Kalam" },
  { text: "The power of concentration is the only key to the treasure-house of knowledge.", author: "Swami Vivekananda" },
  { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein" },
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
  { text: "What we think, we become.", author: "Buddha" }
 
];
quotes = quotes.map((quote, index) => ({ ...quote, id: index + 1 }));
app.get('/api/quotes', (req, res) => {
  const {author} = req.query;

  if (author) {
    const filteredQuotes = quotes.filter(quote => quote.author.toLowerCase().includes(author.toLowerCase()));
    return res.json(filteredQuotes);
  }
  res.json(quotes);
});

app.get('/api/quotes/random', (req, res) => {
  if (quotes.length === 0) {
    return res.status(404).json({ message: "No quotes available." });
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  res.json(quotes[randomIndex]);
});

app.post('/api/quotes', (req, res) => {
  const { text, author } = req.body;
  if (!text || !author) {
    return res.status(400).json({ message: "Both text and author are required." });
  }

  const newQuote = {
    id: quotes.length + 1,
    text: text,
    author: author
  };

  quotes.push(newQuote);
  res.status(201).json({message: "Quote added successfully!", quote: newQuote});
});

app.listen(PORT, () => {
  console.log(`Moderate Backend Server running on http://localhost:${PORT}`);
});