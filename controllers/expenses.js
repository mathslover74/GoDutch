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

//Check Authenticated
const isAuthenticated = (req, res, next) => {
  console.log(req.session.currentUser);
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect('/');
  }
}

// expenses.get('/', isAuthenticated, (req, res) => {
//   //find all users
//   User.find({}, (err, foundUsers) => {
//     //render dashboard
//     res.render('expenses/index.ejs', {
//       // pass the found users to dashboard
//       users:foundUsers,
//     });
//   });  
// });

expenses.get('/dashboard', (req, res)=>{
  if(req.session.currentUser){
      expensesLog.find({}, (error,allExpenses )=>{
        res.render('expenses/index.ejs', {
            expenses: allExpenses
        });
    });
  } else {
      res.redirect('/sessions/new');
  }
});


///Create create route
expenses.get('/new', (req, res) => {
  // res.render('expenses/new.ejs');
  if (req.session.currentUser) {
    res.render('expenses/new.ejs');
  } else {
    res.redirect('/sessions/new');
  }
  // res.send('linked');
});

///Create route create data in mongoDB
expenses.post('/', (req, res)=>{
  expensesLog.create(req.body, (err, createItem) => {
    // res.send(req.body);
    res.redirect('/expenses');
  })
});

///Create index route

// expenses.get('/', (req, res)=>{
//   expensesLog.find({}, (error,allExpenses )=>{
//       res.render('/expenses/index.ejs', {
//           expenses: allExpenses
//       });
//   });
// });

expenses.get('/seed', (req, res)=>{
  expensesLog.create([
    {
      date: '2021-02-11',
      description: 'drinks',
      name:'friend 1',
      paidByYou: true,
      amount: 5
    }, {
      date: '2021-02-11',
      description: 'Food',
      name:'friend 2',
      paidByYou: true,
      amount: 10
    },
  ], (err, data)=>{
      res.redirect('/expenses');
  })
});

///Create Show Route

expenses.get('/:id', (req, res)=>{
  expensesLog.findById(req.params.id, (err, foundItems) => {
      res.render('expenses/show.ejs', {
          expenses:foundItems
      });
  });
  // res.render('expenses/show.ejs');
  // res.send('link');
});

///Create Delete route
expenses.delete('/:id', (req,res) => {
  // res.send('delete');
  expensesLog.findByIdAndRemove(req.params.id, (err,data) => {
    res.redirect('/expenses'); ///redirect back to index
  })
});

//Create edit route/Page

//get edit
expenses.get('/:id/edit', (req, res)=>{
  expensesLog.findById(req.params.id, (err, foundItem)=>{ //find the item
      res.render(
      'edit.ejs',
      {
        items: foundItem, //pass in found item
      });
  });
});

module.exports = expenses;