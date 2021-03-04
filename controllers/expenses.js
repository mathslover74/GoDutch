const express = require('express');
const expenses = express.Router();
const expensesLog = require('../models/expenses.js');
const User = require('../models/users.js');
const bcrypt = require('bcrypt');
const { response } = require('express');

//Check Authenticated
const isAuthenticated = (req, res, next) => {
  console.log(req.session.currentUser);
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect('/sessions/new');
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

expenses.get('/dashboard',isAuthenticated, (req, res)=>{
  // if(req.session.currentUser){
    console.log('**********************');
    console.log(req.session.currentUser);

    /// show all expenses
      // expensesLog.find({}, (error,allExpenses )=>{
      //   res.render('expenses/index.ejs', {
      //       expenses: allExpenses
      //   });
    // });

//// to filter to user created by
    User.findById(req.session.currentUser._id, (err,foundUser) => {
      expensesLog.find({createdBy: req.session.currentUser.username},(error,allExpenseBtCurrentUser) => {
        res.render('expenses/index.ejs', {
          expenses:allExpenseBtCurrentUser,
          user:foundUser
        });
      });
    });
  // } else {
  //     // res.redirect('/sessions/new');
  //     res.redirect('/');
  // }
});


///Create create route
expenses.get('/new',isAuthenticated , (req, res) => {
  // res.render('expenses/new.ejs');
  // if (req.session.currentUser) {
    User.findById(req.session.currentUser._id.name, (err,foundUserName) => {
      res.render('expenses/new.ejs', {
        user:req.session.currentUser
      }); 
    });
    
  // } else {
  //   res.redirect('/sessions/new');
  // }
  // res.send('linked');
});

///Create route create data in mongoDB
// expenses.post('/',isAuthenticated , (req, res)=>{

//   console.log('hello');
//   expensesLog.create(req.body, (err, createItem) => {
//     console.log(createItem);
//     console.log(req.body);
//     if (err) {
//       console.log(err);
//     }
//     // res.send(req.body);
//     res.redirect('/expenses/dashboard');
//   })
// });


///Create index route

// expenses.get('/', (req, res)=>{
//   expensesLog.find({}, (error,allExpenses )=>{
//       res.render('/expenses/index.ejs', {
//           expenses: allExpenses
//       });
//   });
// });

expenses.get('/seed',isAuthenticated, (req, res)=>{
  expensesLog.create([
    {
      createdBy: 'Jason',
      date: '20-01-2021',
      description: 'drinks',
      name:'friend 1',
      paidByYou: true,
      amount: 5
    }, 
    
    {
      createdBy: 'Mochi',
      date: '25-01-2021',
      description: 'Food',
      name:'friend 2',
      paidByYou: true,
      amount: 15
    },

    {
      createdBy: 'Sushi',
      date: '29-01-2021',
      description: 'Coke',
      name:'friend 2',
      paidByYou: true,
      amount: 16
    },

    {
      createdBy: 'Cherry',
      date: '4-01-2021',
      description: 'Cake',
      name:'friend 1',
      paidByYou: true,
      amount: 10
    },
  ], (err, data)=>{
      res.redirect('/expenses/dashboard');
  })
});

///Create Show Route

expenses.get('/:id' ,isAuthenticated , (req, res)=>{
  expensesLog.findById(req.params.id, (err, foundItems) => {
      res.render('expenses/show.ejs', {
          expenses:foundItems
      });
  });
  // res.render('expenses/show.ejs');
  // res.send('link');
});

///Create Delete route
expenses.delete('/:id',isAuthenticated , (req,res) => {
  // res.send('delete');
  expensesLog.findByIdAndRemove(req.params.id, (err,data) => {
    res.redirect('/expenses/dashboard'); ///redirect back to index
  })
});

//Create edit route/Page

//get edit
expenses.get('/:id/edit',isAuthenticated , (req, res)=>{
  expensesLog.findById(req.params.id, (err, foundItem)=>{ //find the item
      res.render('expenses/edit.ejs', {
        expenses: foundItem //pass in found item
      });
  }); 
});

///put edit and update route
expenses.put('/:id' ,isAuthenticated, (req, res) => {
	if (req.body.paidByYou === 'on') {
		req.body.paidByYou = true;
	} else {
		req.body.paidByYou = false;
	}
	expensesLog.findByIdAndUpdate(
		req.params.id,
		req.body,
		{ new: true },
		(err, updatedModel) => {
			res.redirect('/expenses/'+req.params.id);
		});
});

// Create route
expenses.post('/' ,isAuthenticated, (req, res) => {
  console.log('**************************')
  console.log(req.body);
	if (req.body.paidByYou === 'on') {
		//if checked, req.body.paidByYou is set to 'on'
		req.body.paidByYou = true;
	} else {
		//if not checked, req.body.paidByYou is undefined
		req.body.paidByYou = false;
	}

	expensesLog.create(req.body , (err, updatedModel) => {
    console.log('***********before*******');

		if (err) res.send(err.message);
    // console.log(err);
    console.log(updatedModel);
    console.log('******************');
		res.redirect('/expenses/dashboard');
	});
});



module.exports = expenses;