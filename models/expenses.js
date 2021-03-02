// const { static } = require('express')
const { text } = require('express');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const expensesSchema = new Schema({
  // date: { type:Date, required: true},
  // createdBy: {type: Schema.Types.ObjectId, ref:'username'},
  createdBy: {type: String},
  date: { type: String, required: true},
  description:  { type: String, required: true },
  name:  { type: String, required: true },
  // paidByYou:  { type: Boolean },
  paidByYou: Boolean,
  amount:  { type: Number, min: 0.1}
})

const expenses = mongoose.model('expenses', expensesSchema)

module.exports = expenses;

// <!-- <% for (let i = 0; i < expenses.length; i++) { %>
//   <tr>
//     <td><%= expenses[i].date %></td>
//     <td><a href="index/<%=i%>"><%= expenses[i].desciption %></a></td>
//     <td><%= expenses[i].paidByYou %></td>
//     <td><%= expenses[i].amount %></td>
//   </tr>
 
// <% } %> -->
