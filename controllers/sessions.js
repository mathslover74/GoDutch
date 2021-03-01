const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs');
});

sessions.post('/', (req, res) => {
  User.findOne({ username: req.body.username}, (err, foundUser) => {
  // if db error handle the db error
    if(err) {
      console.log(err);
      res.render('sessions/invalid.ejs');
      // if user not found, handle the error
    } else if (!foundUser) {
      res.render('sessions/invalid.ejs');
    }else {
      if(bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.redirect('/');
        // if passwords don't match, handle the error
      } else {
        res.render('sessions/invalid.ejs');
      }
    }
  });
});

sessions.delete('/', (req, res)=>{
  req.session.destroy(() => {
      res.redirect('/');
  });
});

module.exports = sessions;