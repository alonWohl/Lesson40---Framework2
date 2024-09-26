import { bookSevice } from '../services/book.service.js'
import { utilService } from '../services/util.service.js'
import { SearchBooksList } from './SearchBooksList.jsx'

const { useState, useRef } = React
const { useNavigate } = ReactRouter

export function BookAdd() {
  const [booksList, setBookList] = useState()
  const handleSearchDebounce = useRef(utilService.debounce(handlSearch, 2000))
  const navigate = useNavigate()

  function handlSearch({ target }) {
    bookSevice.getGoogleBooks(target.value).then((books) => {
      setBookList(books)
      console.log(books)
    })
  }

  function onSave(book) {
    bookSevice.addGoogleBook(book)
    navigate('/book')
  }

  return (
    <div className='book-search'>
      <div className='add-book-title'>
        <span className='bold-txt'>Google Search: </span>
        <input onChange={handleSearchDebounce.current} type='text' name='title' placeholder='Insert book name' />
        <button>Reset</button>
      </div>
      {booksList && <SearchBooksList booksList={booksList} onSave={onSave} />}{' '}
    </div>
  )
}
