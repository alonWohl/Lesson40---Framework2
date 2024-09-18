export function BookPreview({ book }) {
  return (
    <article>
      <img src={book.thumbnail} alt='book-image' />
      <h2>{book.title}</h2>
      <h4>{`Price: ${book.listPrice.amount} ${book.listPrice.currencyCode} `}</h4>
    </article>
  )
}
