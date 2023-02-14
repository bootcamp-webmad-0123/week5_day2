# week5_day2
Promise.all(), roles, owned content

````javascript
router.get('/editar/:book_id', (req, res, next) => {

  const { book_id } = req.params

  const promises = [
    Book.findById(book_id),
    Author.find()
  ]

  Promise
    .all(promises)
    .then(results => {

      const book = results[0]
      const authors = results[1]

      res.render('books/edit-book-form', { book, authors })
    })
    .catch(err => next(err))
})
````
