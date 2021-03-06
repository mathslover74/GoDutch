const express = require('express');
const methodOverride = require('method-override');
// const mongoURI = process.env.DB_URI || 'mongodb://localhost:27017/';
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
const app = express();
const userController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js');
const expensesController = require('./controllers/expenses.js');



// Configuration
const PORT = process.env.PORT|| 8080;
// const mongoURI = process.env.DB_URI || 'mongodb://localhost:27017/godutch'
// const mongoURI = 'mongodb://localhost:27017/godutch'
const mongoURI = process.env.DB_URI;

// Middleware
// allows us to use put and delete methods
app.use(methodOverride('_method'));
// parses info from our input fields into an object
app.use(express.urlencoded({ extended: true }));
//allow to access to public
// app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));


app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}))

//Check Authenticated
const isAuthenticated = (req, res, next) => {
  console.log(req.session.currentUser);
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect('/');
  }
}

// Database
mongoose.connect(mongoURI, { useNewUrlParser: true })
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

///controller
//users after login
app.use('/users', userController);
///login 
app.use('/sessions', sessionsController);
///app
app.use('/expenses', expensesController);




// Routes for index
app.get('/', (req, res) => {
  res.render('index.ejs', {
    currentUser: req.session.currentUser
  });
});

app.get ('/expenses', isAuthenticated, (req,res)=> {
  res.render('expenses/index.ejs');
})

// app.get('/app', (req, res)=>{
//   if(req.session.currentUser){
//       res.render('app/index.ejs')
//   } else {
//       res.redirect('/sessions/new');
//   }
// })

// Listen
app.listen(PORT, () => console.log('auth happening on port', PORT))