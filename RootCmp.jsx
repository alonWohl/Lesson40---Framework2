const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM

import { AboutUs } from './pages/AboutUs.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import { BookIndex } from './pages/BookIndex.jsx'
import { Home } from './pages/Home.jsx'
import { BookDetails } from './pages/BookDetails.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { BookEdit } from './pages/BookEdit.jsx'
import { Dashboard } from './pages/Dashboard.jsx'

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
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/book/:bookId' element={<BookDetails />} />
            <Route path='/book/edit' element={<BookEdit />} />
            <Route path='/book/edit/:bookId' element={<BookEdit />} />
          </Routes>
        </main>
        <UserMsg />
      </section>
    </Router>
  )
}
