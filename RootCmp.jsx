const { useState } = React

import { AboutUs } from './pages/AboutUs.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { Home } from './pages/Home.jsx'

export function App() {
  const [page, setPage] = useState('books')

  function onSetPage(page) {
    setPage(page)
  }
  return (
    <section className='app'>
      <AppHeader onSetPage={onSetPage} />
      <main className='container'>
        {page === 'home' && <Home />}
        {page === 'about' && <AboutUs />}
        {page === 'books' && <BookIndex />}
      </main>
    </section>
  )
}
