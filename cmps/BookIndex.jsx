import { bookSevice } from '../services/book.service.js'
import { BookList } from './BookList.jsx'

const { useState, useEffect } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)

  useEffect(() => {
    loadBooks()
  }, [])

  function loadBooks() {
    bookSevice
      .query()
      .then(setBooks)
      .catch((err) => {
        console.log('err:', err)
      })
  }

  if (!books) return <div className='loading'>loading...</div>

  return (
    <section className='book-index'>
      <BookList books={books} />
    </section>
  )
}
