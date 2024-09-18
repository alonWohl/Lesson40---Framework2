import { bookSevice } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookDetails } from '../cmps/BookDetails.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { AppLoader } from '../cmps/AppLoader.jsx'

const { useState, useEffect } = React

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [selectedBookId, setSelectedBookId] = useState(null)
  const [filterBy, setFilterBy] = useState(bookSevice.getDefaultFilter())

  useEffect(() => {
    loadBooks()
  }, [filterBy])

  function loadBooks() {
    bookSevice
      .query(filterBy)
      .then(setBooks)
      .catch((err) => {
        console.log('err:', err)
      })
  }

  function onRemoveBook(bookId) {
    bookSevice.remove(bookId).then(() => {
      setBooks(books.filter((book) => book.id !== bookId))
    })
  }
  function onSelectBookId(bookId) {
    setSelectedBookId(bookId)
  }

  function onSetFilterBy(filterBy) {
    setFilterBy(filterBy)
  }

  if (!books) return <AppLoader />

  return (
    <section className='book-index'>
      <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      {!selectedBookId ? (
        <BookList books={books} onRemoveBook={onRemoveBook} onSelectBookId={onSelectBookId} />
      ) : (
        <BookDetails bookId={selectedBookId} onSelectBookId={onSelectBookId} />
      )}
    </section>
  )
}
