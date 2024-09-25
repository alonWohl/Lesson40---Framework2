import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'booksDb'
_createBooks()

export const bookSevice = {
  query,
  get,
  remove,
  save,
  getDefaultFilter,
  getEmptyBook,
  addReview,
  removeReview
}

function query(filterBy = {}) {
  return storageService.query(BOOK_KEY).then((books) => {
    if (filterBy.txt) {
      const regex = new RegExp(filterBy.txt, 'i')
      books = books.filter((book) => regex.test(book.title))
    }
    if (filterBy.minPrice) {
      books = books.filter((book) => book.listPrice.amount >= filterBy.minPrice)
    }
    return books
  })
}

function get(bookId) {
  return storageService.get(BOOK_KEY, bookId).then(_setNextPrevbookId)
}

function remove(bookId) {
  return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
  if (book.id) {
    return storageService.put(BOOK_KEY, book)
  } else {
    return storageService.post(BOOK_KEY, book)
  }
}
function getEmptyBook(
  title = '',
  subtitle = '',
  authors = '',
  publishedDate = '',
  description = '',
  pageCount = '',
  categories = '',
  language = '',
  thumbnail = 'https://via.placeholder.com/300x400',
  listPrice = { amount: '', currencyCode: 'EUR', isOnSale: Math.random() > 0.7 }
) {
  return { title, subtitle, authors, publishedDate, description, pageCount, categories, language, listPrice, thumbnail }
}

function getDefaultFilter() {
  return { txt: '', minPrice: '' }
}

function _createBooks() {
  let books = utilService.loadFromStorage(BOOK_KEY)
  if (!books || !books.length) {
    const ctgs = ['Love', 'Fiction', 'Poetry', 'Computers', 'Religion']
    const books = []
    for (let i = 0; i < 20; i++) {
      const book = {
        id: utilService.makeId(),
        title: utilService.makeLorem(2),
        subtitle: utilService.makeLorem(4),
        authors: [utilService.makeLorem(1)],
        publishedDate: utilService.getRandomIntInclusive(1950, 2024),
        description: utilService.makeLorem(20),
        pageCount: utilService.getRandomIntInclusive(20, 600),
        categories: [ctgs[utilService.getRandomIntInclusive(0, ctgs.length - 1)]],
        thumbnail: `/assets/img/${i + 1}.jpg`,
        language: 'en',
        listPrice: {
          amount: utilService.getRandomIntInclusive(80, 500),
          currencyCode: 'EUR',
          isOnSale: Math.random() > 0.7
        },
        reviews: []
      }
      books.push(book)
    }
    utilService.saveToStorage(BOOK_KEY, books)
  }
}

function addReview(bookId, review) {
  review.id = utilService.makeId()
  return get(bookId)
    .then((book) => {
      book.reviews.push(review)
      return save(book)
    })
    .catch((err) => {
      console.error('Cannot add review to book', err)
    })
}

function removeReview(bookId, reviewId) {
  return get(bookId)
    .then((book) => {
      const reviewIdx = book.reviews.findIndex((review) => review.id === reviewId)
      book.reviews.splice(reviewIdx, 1)
      save(book)
      return book
    })
    .catch((err) => {
      console.error('Cannot remove review from book', err)
    })
}

function _setNextPrevbookId(book) {
  return query().then((books) => {
    const bookIdx = books.findIndex((currbook) => currbook.id === book.id)
    const nextbook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
    const prevbook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
    book.nextbookId = nextbook.id
    book.prevbookId = prevbook.id
    return book
  })
}
