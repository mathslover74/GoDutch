const express = require('express');
const expenses = express.Router();
const expensesLog = require('../models/expenses.js');
const User = require('../models/users.js');
const bcrypt = require('bcrypt');
const { response } = require('express');

// expenses.get('/', (req, res) => {
//   res.render('index.ejs', {
//     currentUser: req.session.currentUser
//   });
// });

expenses.get('/', (req, res)=>{
  if(req.session.currentUser){
      res.render('expenses/index.ejs');
  } else {
      res.redirect('/sessions/new');
  }
});


///Create create route
expenses.get('/new', (req, res) => {
  res.render('expenses/new.ejs');
  // res.send('linked');
});

///Create route create data in mongoDB
expenses.post('/', (req, res)=>{
  expensesLog.create(req.body, (err, createItem) => {
    // res.send(createItem)
    res.redirect('/expenses');
  })
});

///Create index route

expenses.get('/', (req, res)=>{
  expensesLog.find({}, (error,allExpenses )=>{
      res.render('/expenses/index.ejs', {
          expenses: allExpenses
      });
  });
  res.render('expenses/index.ejs');
});

expenses.get('/seed', (req, res)=>{
  expensesLog.create([
    {
      date: '2021-02-11',
      description: 'drinks',
      name:'friend 1',
      paidByYou: true,
      price: 5
    }, {
      date: '2021-02-11',
      description: 'Food',
      name:'friend 2',
      paidByYou: true,
      price: 10
    },
  ], (err, data)=>{
      res.redirect('/expenses');
  })
});

///Create Show Route

expenses.get('/:id', (req, res)=>{
  // items.findById(req.params.id, (err, foundItems) => {
  //     res.render('show.ejs', {
  //         items:foundItems
  //     });
  // });
  res.render('expensess/show.ejs');
  // res.send('link');
});




module.exports = expenses;