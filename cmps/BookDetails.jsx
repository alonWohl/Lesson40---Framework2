import { bookSevice } from '../services/book.service.js'

const { useState, useEffect } = React

export function BookDetails({ bookId, onSelectBookId }) {
  const [book, setBook] = useState(null)
  useEffect(() => {
    bookSevice.get(bookId).then((book) => setBook(book))
  }, [])

  if (!book) return <div>loading...</div>
  return (
    <section className='book-details'>
      <img src={book.thumbnail} alt='book-image' />
      <h2>{book.title}</h2>
      <h3>{book.subtitle}</h3>
      <p>By :{book.authors}</p>
      <p> Published at:{book.publishedDate}</p>
      <p>{book.description}</p>
      <button onClick={() => onSelectBookId(null)}>Back</button>
    </section>
  )
}
