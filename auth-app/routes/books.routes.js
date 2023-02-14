const express = require('express');
const router = express.Router();
const Book = require('./../models/Books.model')

const { isLoggedIn, checkRole } = require('../middlewares/route-guard')

router.get('/listado', (req, res) => {

  Book
    .find()
    .then(books => {
      res.render('books/list', {
        books: books,
        isAdmin: req.session.currentUser?.role === 'ADMIN',       // ROLES: contenido renderizado por rol
        isEditor: req.session.currentUser?.role === 'EDITOR',
      })
    })
    .catch(err => console.log(err))
})


router.get('/mis-libros', isLoggedIn, (req, res) => {

  Book
    .find({ owner: req.session.currentUser._id })             // CONTENIDO PROPIETARIO: filtrar por dueño/a
    .then(books => res.render('books/list', { books }))
    .catch(err => console.log(err))
})


// Create form render
router.get('/crear', isLoggedIn, (req, res) => {
  res.render('books/new-book-form')
})


// Create form handling
router.post('/crear', isLoggedIn, (req, res, next) => {

  const { title, description, author, rating } = req.body
  const { _id } = req.session.currentUser                   // CONTENIDO PROPIETARIO: almacenar ID en creación

  Book
    .create({ title, description, author, rating, owner: _id })
    .then(book => res.redirect(`/libros/${book._id}`))
    .catch(err => next(err))
})


// Render book details
router.get('/:book_id', (req, res) => {

  const { book_id } = req.params

  Book
    .findById(book_id)
    .then(book => res.render('books/details', book))
    .catch(err => console.log(err))
})



// Edit form render
router.get('/editar/:book_id', isLoggedIn, checkRole('ADMIN', 'EDITOR'), (req, res) => {    // ROLES: acceso por rol

  const { book_id } = req.params

  Book
    .findById(book_id)
    .then(book => res.render('books/edit-book-form', book))
    .catch(err => console.log(err))
})


// Edit form handler
router.post('/editar', isLoggedIn, checkRole('ADMIN', 'EDITOR'), (req, res) => {         // ROLES: acceso por rol

  const { title, description, author, rating, book_id } = req.body

  Book
    .findByIdAndUpdate(book_id, { title, description, author, rating })
    .then(book => res.redirect(`/libros/${book._id}`))
    .catch(err => console.log(err))
})



// Delete book
router.post('/eliminar/:book_id', isLoggedIn, checkRole('ADMIN'), (req, res) => {          // ROLES: acceso por rol

  const { book_id } = req.params

  Book
    .findByIdAndDelete(book_id)
    .then(() => res.redirect('/libros/listado'))
    .catch(err => console.log(err))
})


module.exports = router