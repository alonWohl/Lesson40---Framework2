import { Chart } from '../cmps/Chart.jsx'
import { bookSevice } from '../services/book.service.js'

const { useEffect, useState } = React

export function Dashboard() {
  const [books, setBooks] = useState([])
  const [categoriesStats, setCategoriesStats] = useState([])

  useEffect(() => {
    bookSevice.query().then(setBooks)
    bookSevice.getCategoriesStats().then(setCategoriesStats)
  })

  return (
    <section className='dashboard'>
      <h1>Dashboard</h1>
      <h2>Statistics for {books.length} Cars</h2>
      <h4>By Categories</h4>
      <Chart data={categoriesStats} />
    </section>
  )
}
