const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();
const cors = require('cors'); // 👈 add this
const favoriteRoutes = require('./routes/favorites');

const app = express();
const PORT = 5000;

const authRoutes = require('./routes/auth');

// ✅ Enable CORS
app.use(cors({
  origin: 'http://localhost:3000', // React app URL
  credentials: true
}));

// ✅ Connect to MongoDB
connectDB();

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});
app.use('/api', authRoutes);

app.use('/api/favorites', favoriteRoutes); // Add the favorites routes


// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
