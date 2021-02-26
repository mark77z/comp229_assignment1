/*--------------------------------------------------------------
# book.js
# Marco Mejia
# 301082190
# 25 Feb 2021

Book Model
----------------------------------------------------------------*/

let mongoose = require('mongoose');

//Create a model class
let bookModel = mongoose.Schema({
    name: String,
    author: String,
    published: String,
    description: String, 
    price: Number
},{
    collection: "books"
});

module.exports = mongoose.model('Book', bookModel);