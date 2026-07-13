
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000; 

app.use(cors());
app.use(express.json());

const quotes = [
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
  { text: "A person who never made a mistake never tried anything new.", author: "Albert Einstein" } // Aap yahan koi bhi Indian figure ka quote dal sakte hain
];

app.get('/api/quotes', (req, res) => {
  res.json(quotes);
});

app.get('/api/quotes/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  
  
  res.json(randomQuote);
});

app.listen(PORT, () => {
  console.log(`Backend Server running on http://localhost:${PORT}`);
});