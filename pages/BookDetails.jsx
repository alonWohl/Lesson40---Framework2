const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { bookSevice } from '../services/book.service.js'
import { getCurrencySymbol } from '../services/util.service.js'
import { AppLoader } from '../cmps/AppLoader.jsx'
import { LongTxt } from '../cmps/LongTxt.jsx'
import { AddReview } from '../cmps/AddReview.jsx'
import { showErrorMsg } from '../services/event-bus.service.js'
import { ReviewsList } from '../cmps/ReviewsList.jsx'

export function BookDetails() {
  const [book, setBook] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadBook()
    console.log(params)
  }, [params.bookId])

  function loadBook() {
    bookSevice
      .get(params.bookId)
      .then((book) => {
        setBook(book)
      })
      .catch((err) => {
        showErrorMsg('Had issues loading book details')
        console.error('Had issues loading book details', err)
      })
  }

  function getPageCountText(count) {
    if (count >= 500) return ' - Serious Reading'
    if (count >= 200) return ' - Descent Reading'
    if (count <= 100) return ' - Light Reading'
  }

  function getBookAgeLabel(year) {
    const currYear = new Date().getFullYear()

    if (currYear - year >= 10) return ' Vintage'
    return ' New'
  }

  function getPriceClassName(price) {
    if (price > 150) return 'red'
    if (price < 20) return 'green'
  }

  function onBack() {
    navigate('/book')
  }

  function onSubmitReview(newReview) {
    bookSevice
      .addReview(book.id, newReview)
      .then(() => {
        setBook((prevBook) => ({
          ...prevBook,
          reviews: prevBook.reviews ? [...prevBook.reviews, newReview] : [newReview]
        }))
        showSuccessMsg('Review added successfully!')
      })
      .catch((err) => {
        showErrorMsg('Failed to add review')
        console.error('Failed to add review', err)
      })
  }

  function onRemoveReview(reviewId) {
    bookSevice
      .removeReview(book.id, reviewId)
      .then(() => {
        setBook((prevBook) => ({
          ...prevBook,
          reviews: prevBook.reviews.filter((review) => review.id !== reviewId)
        }))
        showSuccessMsg('Review removed successfully!')
      })
      .catch((err) => {
        showErrorMsg('Failed to remove review')
        console.error('Failed to remove review', err)
      })
  }
  if (!book) return <AppLoader />

  const { thumbnail, title, subtitle, pageCount, listPrice, authors, publishedDate, description, reviews } = book
  return (
    <section className='book-details'>
      <img src={thumbnail} alt='Book Thumbnail' />
      <div className='details-title'>
        <h2>
          <span>Title: </span>
          {title}
        </h2>

        <h3>
          <span>Subtitle: </span>
          {subtitle}
        </h3>
      </div>

      <div>
        <span>Pages: </span>
        {pageCount} {getPageCountText(book.pageCount)}
      </div>

      <div className={getPriceClassName(book.listPrice.amount)}>
        <span>Price: </span>
        {listPrice.amount} {getCurrencySymbol(book.listPrice.currencyCode)}
        {listPrice.isOnSale && <span className='sale'> SALE!</span>}
      </div>

      <div className='authors'>
        <span>By: </span>
        {authors}
      </div>

      <div className='publish'>
        <span>Published: </span> {publishedDate} ({getBookAgeLabel(publishedDate)})
      </div>

      <div className='description'>
        <span>Description: </span>
        <LongTxt text={description} />
      </div>

      <button onClick={onBack}>Back</button>

      <section className='reviews-container'>
        <span>Add Review: </span>
        <AddReview onSubmitReview={onSubmitReview} />
        Reviews:
        <ReviewsList reviews={reviews} onRemoveReview={onRemoveReview} />
      </section>

      <section className='flex justify-between'>
        <button>
          <Link to={`/book/${book.prevbookId}`}>Prev book</Link>
        </button>
        <button>
          <Link to={`/book/${book.nextbookId}`}>Next book</Link>
        </button>
      </section>
    </section>
  )
}
