const { useState } = React

export function AddReview({ onSubmitReview }) {
  const [review, setReview] = useState({
    fullname: '',
    rating: 1,
    readAt: ''
  })

  function handleChange({ target }) {
    const { name, value } = target
    setReview((prevReview) => ({ ...prevReview, [name]: value }))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    if (!review.fullname || !review.readAt) {
      alert('All fields are required')
      return
    }

    onSubmitReview(review)

    setReview({
      fullname: '',
      rating: 1,
      readAt: ''
    })
  }

  return (
    <form className='add-review' onSubmit={onSubmit}>
      <label htmlFor='fullname'>Full Name:</label>
      <input type='text' id='fullname' name='fullname' value={review.fullname} onChange={handleChange} />

      <label htmlFor='rating'>Rating:</label>
      <select id='rating' name='rating' value={review.rating} onChange={handleChange}>
        {[1, 2, 3, 4, 5].map((rate) => (
          <option key={rate} value={rate}>
            {rate}
          </option>
        ))}
      </select>

      <label htmlFor='readAt'>Read At:</label>
      <input type='date' id='readAt' name='readAt' value={review.readAt} onChange={handleChange} />

      <button type='submit'>Submit Review</button>
    </form>
  )
}
