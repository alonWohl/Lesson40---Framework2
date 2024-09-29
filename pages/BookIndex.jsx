import { bookSevice } from '../services/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { AppLoader } from '../cmps/AppLoader.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { BookAdd } from '../cmps/BookAdd.jsx'
import { getTruthyValues } from '../services/util.service.js'

const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function BookIndex() {
  const [books, setBooks] = useState(null)
  const [searchPrms, setSearchPrms] = useSearchParams()
  const [filterBy, setFilterBy] = useState(bookSevice.getFilterFromSearchParams(searchPrms))

  useEffect(() => {
    loadBooks()
    setSearchPrms(getTruthyValues(filterBy))
  }, [filterBy])

  function loadBooks() {
    bookSevice
      .query(filterBy)
      .then(setBooks)
      .catch((err) => {
        showErrorMsg(`Loading Book Has failed`)
        console.log('err:', err)
      })
  }

  function onRemoveBook(bookId) {
    bookSevice.remove(bookId).then(() => {
      showSuccessMsg('Book Has Removed')
      setBooks(books.filter((book) => book.id !== bookId))
    })
  }

  function onSetFilterBy(filterBy) {
    setFilterBy(filterBy)
  }

  if (!books) return <AppLoader />

  return (
    <section className='book-index'>
      <React.Fragment>
        <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        <button className='add-book-btn'>
          <Link to='/book/edit'>Add Book</Link>
        </button>
        <BookList books={books} onRemoveBook={onRemoveBook} />
      </React.Fragment>
    </section>
  )
}
