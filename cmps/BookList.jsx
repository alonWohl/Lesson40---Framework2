import { BookPreview } from './BookPreview.jsx'

export function BookList({ books, onRemoveBook, onSelectBookId }) {
  return (
    <ul className='book-list'>
      {books.map((book) => (
        <li key={book.id} className='book-preview'>
          <BookPreview book={book} />

          <section className='btn-group'>
            <button onClick={() => onSelectBookId(book.id)}>Details</button>
            <button className='remove-btn' onClick={() => onRemoveBook(book.id)}>
              X
            </button>
          </section>
        </li>
      ))}
    </ul>
  )
}
