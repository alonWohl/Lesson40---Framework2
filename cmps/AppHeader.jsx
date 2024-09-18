export function AppHeader({ onSetPage }) {
  return (
    <header className='app-header'>
      <h1>Miss Book</h1>
      <nav className='main-nav'>
        <a onClick={() => onSetPage('home')} href='#'>
          Home
        </a>
        <a onClick={() => onSetPage('books')} href='#'>
          Books
        </a>
        <a onClick={() => onSetPage('about')} href='#'>
          About
        </a>
      </nav>
    </header>
  )
}
