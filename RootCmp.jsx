const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AboutUs } from './pages/AboutUs.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { Home } from './pages/Home.jsx'

export function App() {
  return (
    <Router>
      <section className='app'>
        <AppHeader />
        <main className='main-layout'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<AboutUs />} />
            <Route path='/book' element={<BookIndex />} />
            {/* <Route path='/' element={<Home />} /> */}
          </Routes>
        </main>
      </section>
    </Router>
  )
}
