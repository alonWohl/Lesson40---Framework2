import { BookAdd } from '../cmps/BookAdd.jsx'
import { bookSevice } from '../services/book.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'

const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

export function BookEdit() {
  const [bookToEdit, setBookToEdit] = useState(bookSevice.getEmptyBook())
  const [isFormVisible, setIsFormVisible] = useState(true)
  const { bookId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (bookId) loadBook()
  }, [])

  function loadBook() {
    bookSevice
      .get(bookId)
      .then(setBookToEdit)
      .catch((err) => {
        showErrorMsg('Problem getting book')
        console.log('Problem getting book', err)
        navigate('/book')
      })
  }

  function handleChange({ target }) {
    const field = target.name

    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break
    }
    setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
  }

  function onSaveBook(ev) {
    ev.preventDefault()
    bookSevice
      .save(bookToEdit)
      .then(() => showSuccessMsg('Book Added Successfully'))
      .catch((err) => {
        console.log('err:', err)
        showErrorMsg('Couldnt Add Book')
      })
      .finally(() => {
        navigate('/book')
      })
  }

  function handleChangeListPrice({ target }) {
    const field = target.name.split('.')[1]

    let value = target.value

    switch (target.type) {
      case 'number':
      case 'range':
        value = +value
        break

      case 'checkbox':
        value = target.checked
        break
    }
    setBookToEdit((prevBook) => ({ ...prevBook, listPrice: { ...prevBook.listPrice, [field]: value } }))
  }

  function toggleView() {
    setIsFormVisible((prevIsFormVisible) => !prevIsFormVisible)
  }

  const { title, subtitle, authors, publishedDate, description, pageCount, listPrice } = bookToEdit
  const formHeader = bookToEdit.id ? 'Edit' : 'Add'

  return (
    <section className='book-edit'>
      <h2>{formHeader} Book</h2>

      {!bookToEdit.id && <button onClick={toggleView}> {isFormVisible ? 'Search in Google Books' : 'Add Manually'}</button>}
      {isFormVisible || bookToEdit.id ? (
        <form className='book-edit-form' onSubmit={onSaveBook}>
          <label htmlFor='title'>title: </label>
          <input onChange={handleChange} type='text' name='title' id='title' value={title} />

          <label htmlFor='subtitle'>subtitle: </label>
          <input onChange={handleChange} type='text' name='subtitle' id='subtitle' value={subtitle} />

          <label htmlFor='pageCount'>pages: </label>
          <input onChange={handleChange} type='number' name='pageCount' id='pageCount' value={pageCount} />

          <label htmlFor='amount'>price: </label>
          <input onChange={handleChangeListPrice} type='number' name='listPrice.amount' id='amount' value={listPrice.amount} />

          <label htmlFor='authors'>authors: </label>
          <input onChange={handleChange} type='text' name='authors' id='authors' value={authors} />

          <label htmlFor='publishedDate'>published at: </label>
          <input type='number' onChange={handleChange} value={publishedDate} />

          <label htmlFor='description'>description: </label>
          <textarea onChange={handleChange} type='text' name='description' id='description' value={description} />

          <button>save</button>
        </form>
      ) : (
        <BookAdd />
      )}
    </section>
  )
}
