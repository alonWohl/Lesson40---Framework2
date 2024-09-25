const { Link } = ReactRouterDOM
import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook }) {
  return (
    <ul className='book-list'>
      {books.map((book) => (
        <li key={book.id} className='book-preview'>
          <BookPreview book={book} />

          <section className='btn-group'>
            <button>
              <Link to={`/book/${book.id}`}>Details</Link>
            </button>

            <button>
              <Link to={`/book/edit/${book.id}`}>Edit Book</Link>
            </button>

            <button className='remove-btn' onClick={() => onRemoveBook(book.id)}>
              X
            </button>
          </section>
        </li>
      ))}
    </ul>
  )
}
