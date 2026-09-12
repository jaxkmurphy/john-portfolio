export const books = [
  { id: 'pride', title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'Romance', description: 'Elizabeth Bennet navigates family expectations, first impressions and love.' },
  { id: 'emma', title: 'Emma', author: 'Jane Austen', genre: 'Romance', description: 'A young matchmaker discovers the limits of her own judgement.' },
  { id: 'alice', title: 'Alice’s Adventures in Wonderland', author: 'Lewis Carroll', genre: 'Fantasy', description: 'Alice follows a rabbit into a world of curious encounters.' },
  { id: 'oz', title: 'The Wonderful Wizard of Oz', author: 'L. Frank Baum', genre: 'Fantasy', description: 'Dorothy and her companions journey towards the Emerald City.' },
  { id: 'treasure', title: 'Treasure Island', author: 'Robert Louis Stevenson', genre: 'Adventure', description: 'A treasure map leads Jim Hawkins into a pirate adventure.' },
  { id: 'holmes', title: 'The Adventures of Sherlock Holmes', author: 'Arthur Conan Doyle', genre: 'Mystery', description: 'Holmes and Watson investigate a collection of mysteries.' },
]
export interface BookList { id: string; title: string; description: string; books: string[] }
export interface Reading { page: string; notes: string; rating: number }
export interface Library { lists: BookList[]; reading: Record<string, Reading> }
export const initialLibrary: Library = { lists: [{ id: 'weekend', title: 'Weekend reading', description: 'Stories to return to.', books: ['treasure'] }, { id: 'romance', title: 'Romance', description: 'Classic stories and characters.', books: ['pride'] }], reading: {} }
type Action = { type: 'reset' } | { type: 'list'; id: string; title: string; description: string } | { type: 'add' | 'remove'; list: string; book: string } | { type: 'reading'; book: string; value: Reading }
export function libraryReducer(state: Library, action: Action): Library {
  switch (action.type) {
    case 'reset': return initialLibrary
    case 'list': {
      if (!action.title.trim()) return state
      const details = { title: action.title.trim(), description: action.description.trim() }
      return { ...state, lists: state.lists.some(list => list.id === action.id) ? state.lists.map(list => list.id === action.id ? { ...list, ...details } : list) : [...state.lists, { id: action.id, ...details, books: [] }] }
    }
    case 'add': return books.some(book => book.id === action.book) ? { ...state, lists: state.lists.map(list => list.id === action.list && !list.books.includes(action.book) ? { ...list, books: [...list.books, action.book] } : list) } : state
    case 'remove': return { ...state, lists: state.lists.map(list => list.id === action.list ? { ...list, books: list.books.filter(book => book !== action.book) } : list) }
    case 'reading': return books.some(book => book.id === action.book) && /^\d{0,6}$/.test(action.value.page) && action.value.rating >= 0 && action.value.rating <= 5 ? { ...state, reading: { ...state.reading, [action.book]: action.value } } : state
  }
}
export function searchBooks(query: string) {
  const term = query.trim().toLowerCase()
  return term ? books.filter(book => `${book.title} ${book.author} ${book.genre}`.toLowerCase().includes(term)) : []
}
