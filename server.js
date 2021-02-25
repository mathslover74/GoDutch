const express = require('express');
const methodOverride = require('method-override');
// const mongoURI = process.env.DB_URI || 'mongodb://localhost:27017/';
const mongoose = require('mongoose');
require('dotenv').config();

// Configuration
const PORT = process.env.PORT|| 8080;
const mongoURI = process.env.MONGODB_URI;


const app = express();

// Middleware
// allows us to use put and delete methods
app.use(methodOverride('_method'));
// parses info from our input fields into an object
app.use(express.urlencoded({ extended: false }));
//allow to access to public
app.use(express.static('public'));

// Database
mongoose.connect(mongoURI, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

// Routes
app.get('/', (req, res) => {
  res.send('index route');
})


// Listen
app.listen(PORT, () => console.log('auth happening on port', PORT))