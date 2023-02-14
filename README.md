# week5_day2
>Promise.all()
>
> Roles
>
> Owned content

## Promise.all()

Permite gestionar varias promesas paralelas, argumentadas en forma de array, y retornando un array con tantas posiciones como resoluciones a las promesas haya:

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

Versión optimizada a través de la destructuración de arrays:

````javascript
router.get('/editar/:book_id', (req, res, next) => {

  const { book_id } = req.params

  const promises = [
    Book.findById(book_id),
    Author.find()
  ]

  Promise
    .all(promises)
    .then(([book, authors]) => res.render('books/edit-book-form', { book, authors }))
    .catch(err => next(err))
})
````

