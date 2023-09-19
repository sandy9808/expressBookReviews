const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) { 
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});    
    }
  } 
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  let get_books=new Promise((resolve,reject)=>{
    resolve(res.send(books));
  });
  get_books.then((data)=>{
    console.log("Promise for Task 10 is resolved")
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let get_books=new Promise((resolve,reject)=>{
    let isbn=req.params.isbn;
    let book=books[isbn];
    if(book){
      resolve(res.send(book));
    }
    reject(res.send("ISBN not found"));
  })
  get_books.then(()=>{
    console.log("Promise for Task 11 is complete");
  })
  .catch(()=>{
    console.log("Promise for Task 11 is rejected");
  })
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let get_books=new Promise((resolve,reject)=>{
    let author=req.params.author;
    let book_details=Object.values(books).filter((book)=>book.author===author);
    if(book_details.length>0){
      resolve(res.send(book_details));
    }
    reject(res.send("Author not found"));
  });
  get_books.then(()=>{
    console.log("Promise for task 12 is resolved");
  })
  .catch(()=>{
    console.log("Promise for task 12 is rejected");
  })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let get_books=new Promise((resolve,reject)=>{
    let title=req.params.title;
    let book_details=Object.values(books).filter((book)=>book.title===title);
    if(book_details.length>0){
      resolve(res.send(book_details));
    }
    reject(res.send("Title not found"));
  });
  get_books.then(()=>{
    console.log("Promise for task 13 is resolved");
  })
  .catch(()=>{
    console.log("Promise for task 13 is rejected");
  })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbn=req.params.isbn;
  let book=books[isbn];
  return res.send(book.reviews);
});

module.exports.general = public_users;
