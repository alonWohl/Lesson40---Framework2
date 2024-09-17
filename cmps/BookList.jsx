import { BookPreview } from './BookPreview.jsx'

export function BookList({ books }) {
  return (
    <ul className='book-list'>
      {books.map((book) => (
        <li key={book.id}>
          <BookPreview book={book} />

          <section>
            <button>X</button>
            <button>Details</button>
          </section>
        </li>
      ))}
    </ul>
  )
}
