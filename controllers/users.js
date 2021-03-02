const express = require('express');
const users = express.Router();
const User = require('../models/users.js');
const bcrypt = require('bcrypt');

users.get('/new', (req, res) => {
  res.render('users/new.ejs');
})

users.post('/', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (err, createdUser) => {
    if (err) {
      console.log(err);
    }
    // console.log(createdUser); will show pw
    console.log(createdUser);
    console.log(req.body);
    res.redirect('/sessions/new');
  });
});

module.exports = users