export function ReviewsList({ reviews, onRemoveReview }) {
  if (!reviews || reviews.length === 0) return <p>No reviews yet.</p>

  return (
    <ul className='reviews-list'>
      {reviews.map((review) => (
        <li key={review.id} className='review-item'>
          <h4>{review.fullname}</h4>
          <p>Rating: {'⭐️'.repeat(review.rating)}</p>
          <p>Read At: {new Date(review.readAt).toLocaleDateString()}</p>
          <button className='remove-btn' onClick={() => onRemoveReview(review.id)}>
            x
          </button>
        </li>
      ))}
    </ul>
  )
}
