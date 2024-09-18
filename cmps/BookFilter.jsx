const { useState, useEffect } = React

export function BookFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

  useEffect(() => {
    onSetFilterBy(filterByToEdit)
  }, [filterByToEdit])

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
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    onSetFilterBy(filterByToEdit)
  }

  const { txt, minPrice } = filterByToEdit

  return (
    <fieldset className='book-filter'>
      <legend>Fltering</legend>
      <form className='form-filter' onSubmit={onSubmit}>
        <label htmlFor='txt'>Book Name: </label>
        <input value={txt} onChange={handleChange} type='text' id='txt' name='txt' />
        <label htmlFor='minPrice'>Price : </label>
        <input min='0' value={minPrice || ''} onChange={handleChange} type='number' id='minPrice' name='minPrice' />
        <button>Submit</button>
      </form>
    </fieldset>
  )
}
