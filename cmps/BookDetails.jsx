import { bookSevice } from '../services/book.service.js'
import { AppLoader } from './AppLoader.jsx'

const { useState, useEffect } = React

export function BookDetails({ bookId, onSelectBookId }) {
  const [book, setBook] = useState(null)
  useEffect(() => {
    bookSevice.get(bookId).then((book) => setBook(book))
  }, [])

  function pageCountText(count) {
    if (count >= 500) return '- Serious Reading'
    if (count >= 200) return '- Descent Reading'
    if (count <= 100) return '- Light Reading'
  }

  if (!book) return <AppLoader />
  return (
    <section className='book-details'>
      <img src={book.thumbnail} alt='book-image' />
      <h2>
        <span>Tilte:</span> {book.title}
      </h2>
      <h3>
        <span>Subtitle :</span>
        {book.subtitle}
      </h3>
      <p>
        <span>Pages: </span>
        {book.pageCount} {pageCountText(book.pageCount)}
      </p>
      <p>
        <span>By: </span> {book.authors}
      </p>
      <p>
        <span>Published at: </span>
        {book.publishedDate}
      </p>
      <p>
        <span>Desc: </span>
        {book.description}
      </p>
      <button onClick={() => onSelectBookId(null)}>Back</button>
    </section>
  )
}
