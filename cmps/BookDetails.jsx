import { bookSevice } from '../services/book.service.js'
import { getCurrencySymbol } from '../services/util.service.js'
import { AppLoader } from './AppLoader.jsx'

const { useState, useEffect } = React

export function BookDetails({ bookId, onSelectBookId }) {
  const [book, setBook] = useState(null)

  useEffect(() => {
    loadBook()
  }, [])

  function loadBook() {
    bookSevice
      .get(bookId)
      .then((book) => {
        setBook(book)
      })
      .catch((err) => {
        console.error('Had issues loading book details', err)
      })
  }

  function pageCountText(count) {
    if (count >= 500) return '- Serious Reading'
    if (count >= 200) return '- Descent Reading'
    if (count <= 100) return '- Light Reading'
  }

  function isNew(year) {
    const currYear = new Date().getFullYear()

    if (currYear - year >= 10) return ' Vintage'
    return ' New'
  }

  function priceClassName(price) {
    if (price > 150) return 'red'
    if (price < 20) return 'green'
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
      <p className={priceClassName(book.listPrice.amount)}>
        <span>Price: </span>
        {book.listPrice.amount}
        {getCurrencySymbol(book.listPrice.currencyCode)}
        {book.listPrice.isOnSale && <span className='sale'> SALE !</span>}
      </p>
      <p>
        <span>By: </span> {book.authors}
      </p>
      <p>
        <span>Published at: </span>
        {book.publishedDate} {isNew(book.publishedDate)}
      </p>
      <p>
        <span>Desc: </span>
        {book.description}
      </p>
      <button onClick={() => onSelectBookId(null)}>Back</button>
    </section>
  )
}
