import { useEffect, useReducer, useRef, useState } from 'react'
import { books, initialLibrary, libraryReducer, searchBooks } from '../data/bookifyDemo'
import '../styles/bookify-demo.css'
type View = { screen: 'library' } | { screen: 'list'; id: string } | { screen: 'edit'; id: string | null } | { screen: 'book'; id: string; list: string }
export function BookifyDemo() {
  const [state, dispatch] = useReducer(libraryReducer, initialLibrary)
  const [view, setView] = useState<View>({ screen: 'library' })
  const [query, setQuery] = useState('')
  const [searched, setSearched] = useState('')
  const [pending, setPending] = useState<string | null>(null)
  const [target, setTarget] = useState('weekend')
  const [message, setMessage] = useState('')
  const heading = useRef<HTMLHeadingElement>(null)
  const first = useRef(true)
  useEffect(() => { if (first.current) first.current = false; else heading.current?.focus() }, [view])
  const list = 'id' in view ? state.lists.find(item => item.id === view.id) : undefined
  const book = view.screen === 'book' ? books.find(item => item.id === view.id) : undefined
  const reading = book ? state.reading[book.id] ?? { page: '', notes: '', rating: 0 } : { page: '', notes: '', rating: 0 }
  function go(next: View) { setView(next); setMessage(''); setPending(null) }
  const title = view.screen === 'library' ? 'Your booklists' : view.screen === 'edit' ? (view.id ? 'Edit booklist' : 'New booklist') : book?.title ?? list?.title ?? 'Bookify'
  return <section className="bookify-demo" aria-labelledby="bookify-demo-title">
    <h2 id="bookify-demo-title">Try Bookify</h2>
    <p className="bookify-caption">Search a sample catalogue, add books to lists and track your reading. This browser recreation follows the Android app’s main screens. Changes last until you reset, leave this page or refresh.</p>
    <div className="bookify-app"><header className="bookify-toolbar"><strong>Bookify</strong><button type="button" onClick={() => { dispatch({ type: 'reset' }); go({ screen: 'library' }); setQuery(''); setSearched(''); setTarget('weekend'); setMessage('Sample library reset.') }}>Reset demo</button></header>
      <div className="bookify-body">
        {view.screen !== 'library' && <button type="button" onClick={() => go(view.screen === 'book' ? { screen: 'list', id: view.list } : { screen: 'library' })}>← Back</button>}
        <h3 ref={heading} tabIndex={-1}>{title}</h3>
        {view.screen === 'library' && <>
          <form className="bookify-search" onSubmit={event => { event.preventDefault(); setSearched(query.trim()); setPending(null); setMessage(query.trim() ? '' : 'Enter a title, author or genre.') }}><label htmlFor="bookify-query">Search books</label><div><input id="bookify-query" value={query} onChange={event => setQuery(event.target.value)} placeholder="Try Austen, fantasy or Treasure" /><button type="submit">Search</button></div></form>
          {searched && <section aria-label="Search results"><h4>Results for “{searched}”</h4>{searchBooks(searched).length === 0 && <p>No sample matches. Try “Austen”, “fantasy” or “mystery”.</p>}{searchBooks(searched).map(item => <div className="bookify-result" key={item.id}><div><strong>{item.title}</strong><p>{item.author}</p></div><button type="button" aria-label={`Add ${item.title} to a list`} onClick={() => { setPending(item.id); setMessage('') }}>Add</button></div>)}</section>}
          {pending && <form className="bookify-picker" onSubmit={event => { event.preventDefault(); const duplicate = state.lists.find(item => item.id === target)?.books.includes(pending); dispatch({ type: 'add', list: target, book: pending }); setMessage(duplicate ? 'This book is already in that list.' : `Added to ${state.lists.find(item => item.id === target)?.title}.`); setPending(null) }}><label htmlFor="bookify-target">Add {books.find(item => item.id === pending)?.title} to:</label><select id="bookify-target" value={target} onChange={event => setTarget(event.target.value)}>{state.lists.map(item => <option value={item.id} key={item.id}>{item.title}</option>)}</select><div className="bookify-actions"><button type="submit">Add to booklist</button><button type="button" onClick={() => setPending(null)}>Cancel</button></div></form>}
          <div className="bookify-actions"><h4>Booklists</h4><button type="button" onClick={() => go({ screen: 'edit', id: null })}>+ Add booklist</button></div>
          <div className="bookify-lists">{state.lists.map(item => <button type="button" className="bookify-list" key={item.id} onClick={() => go({ screen: 'list', id: item.id })}><strong>{item.title}</strong><span>{item.description}</span><small>{item.books.length} books →</small></button>)}</div>
        </>}
        {view.screen === 'edit' && <form key={view.id ?? 'new'} className="bookify-form" onSubmit={event => { event.preventDefault(); const data = new FormData(event.currentTarget); const title = String(data.get('title') ?? '').trim(); if (!title) { setMessage('Please enter a booklist title.'); return }; const id = view.id ?? crypto.randomUUID(); dispatch({ type: 'list', id, title, description: String(data.get('description') ?? '') }); go({ screen: 'list', id }) }}><label htmlFor="bookify-title">Booklist title</label><input id="bookify-title" name="title" defaultValue={list?.title ?? ''} maxLength={80} required /><label htmlFor="bookify-description">Description</label><textarea id="bookify-description" name="description" defaultValue={list?.description ?? ''} maxLength={300} /><div className="bookify-actions"><button type="submit">{view.id ? 'Save booklist' : 'Add booklist'}</button><button type="button" onClick={() => go(view.id ? { screen: 'list', id: view.id } : { screen: 'library' })}>Cancel</button></div></form>}
        {view.screen === 'list' && list && <><p>{list.description}</p><div className="bookify-actions"><button type="button" onClick={() => go({ screen: 'edit', id: list.id })}>Edit booklist</button><button type="button" onClick={() => go({ screen: 'library' })}>Search for books</button></div>{list.books.length === 0 && <p className="bookify-empty">This list is empty. Search for a book to add your first one.</p>}{list.books.map(id => { const item = books.find(candidate => candidate.id === id)!; return <div className="bookify-result" key={id}><button type="button" className="bookify-open" onClick={() => go({ screen: 'book', id, list: list.id })}><strong>{item.title}</strong><span>{item.author}</span></button><button type="button" aria-label={`Remove ${item.title} from ${list.title}`} onClick={() => { dispatch({ type: 'remove', list: list.id, book: id }); setMessage(`${item.title} removed from this list.`) }}>Remove</button></div> })}</>}
        {view.screen === 'book' && book && <><p>{book.author}</p><p>{book.description}</p><div className="bookify-form"><fieldset><legend>Your rating</legend><div className="bookify-stars">{[1,2,3,4,5].map(rating => <button type="button" key={rating} aria-label={`Rate ${rating} out of 5`} aria-pressed={reading.rating === rating} onClick={() => dispatch({ type: 'reading', book: book.id, value: { ...reading, rating } })}>{rating <= reading.rating ? '★' : '☆'}</button>)}<button type="button" onClick={() => dispatch({ type: 'reading', book: book.id, value: { ...reading, rating: 0 } })}>Clear</button></div></fieldset><label htmlFor="bookify-page">Page number</label><input id="bookify-page" inputMode="numeric" pattern="[0-9]*" maxLength={6} value={reading.page} onChange={event => dispatch({ type: 'reading', book: book.id, value: { ...reading, page: event.target.value } })} placeholder="Enter page number" /><label htmlFor="bookify-notes">Catch up</label><textarea id="bookify-notes" maxLength={2000} value={reading.notes} onChange={event => dispatch({ type: 'reading', book: book.id, value: { ...reading, notes: event.target.value } })} placeholder="Enter your notes" /><small>Changes are kept automatically while you explore this demo.</small></div></>}
        <p role="status" className="bookify-status">{message}</p>
      </div>
    </div>
    <p className="bookify-caption">The app uses Google Books search, local JSON booklists and Android preferences for reading notes. This preview uses six sample books, with no live API connection or image uploads.</p>
  </section>
}
