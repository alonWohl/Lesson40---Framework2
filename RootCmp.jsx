const { useState } = React

import { AboutUs } from './cmps/AboutUs.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { BookIndex } from './cmps/BookIndex.jsx'
import { Home } from './cmps/Home.jsx'

export function App() {
  const [page, setPage] = useState('books')

  function onSetPage(page) {
    setPage(page)
  }
  return (
    <section className='app'>
      <AppHeader onSetPage={onSetPage} />
      <main class='container'>
        {page === 'home' && <Home />}
        {page === 'about' && <AboutUs />}
        {page === 'books' && <BookIndex />}
      </main>
    </section>
  )
}
