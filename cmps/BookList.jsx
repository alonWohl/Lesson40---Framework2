const { Link } = ReactRouterDOM
import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook }) {
  return (
    <ul className='book-list'>
      {books.map((book) => (
        <li key={book.id} className='book-item'>
          <BookPreview book={book}>
            <button className='edit-btn'>
              <Link to={`/book/edit/${book.id}`}>
                <i className='fa-solid fa-pencil'></i>
              </Link>
            </button>

            <div className='btn-group'>
              <button>
                <Link to={`/book/${book.id}`}>
                  <i className='fa-solid fa-circle-info'></i>
                </Link>
              </button>

              <button className='remove-btn' onClick={() => onRemoveBook(book.id)}>
                <i className='fa-solid fa-trash'></i>
              </button>
            </div>
          </BookPreview>
        </li>
      ))}
    </ul>
  )
}
