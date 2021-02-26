let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

//create a reference to the model
let Book = require('../models/book');

module.exports.displayBookList = (req, res, next) => {
    Book.find((err, bookList) =>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList)
            res.render('book/list', {
                title: 'Books', 
                BookList: bookList,
                name: req.user? req.user.name: ''
            });
        }
    });
};

module.exports.displayAddPage = (req, res, next) => {
    res.render('book/add', {
        title: 'Add Book',
        name: req.user? req.user.name: ''
    });
};

module.exports.processAddPage = (req, res, next) => {
    let newBook = Book({
        "name" : req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Book.create(newBook, (err, Book) => {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/book-list');
        }
    });
};

module.exports.displayEditPage = (req, res, next) => {
    let id = req.params.id;
    Book.findById(id, (err, bookToEdit) => {
        if(err)
        {
            console.error(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('book/edit', {
                title: 'Edit Book', 
                book: bookToEdit,
                name: req.user? req.user.name: ''
            });
        }
    });
};

module.exports.processEditPage = (req, res, next) => {
    let id = req.params.id;

    let updatedBook = Book({
        "name" : req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price,
        "_id": id
    });

    Book.updateOne({_id: id } , updatedBook, (err) =>{
        if(err)
        {
            console.error(err);
            res.end(err); 
        }
        else
        {
            //refresh the book-list
            res.redirect('/book-list');
        }
    });
};

module.exports.performDelete = (req, res, next) => {
    let id = req.params.id;

    Book.remove({_id: id}, (err) => {
        if(err)
        {
            console.error(err);
            res.end(err); 
        }
        else
        {
            //refresh the book-list
            res.redirect('/book-list');
        }
    });
};