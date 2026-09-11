import { useState } from 'react'
import { characterOptions } from '../data/characterOptions'
import '../styles/ascend-demo.css'

const fields = [
  ['hair', 'Hair'], ['facialHair', 'Facial Hair'], ['face', 'Face'],
  ['eye', 'Eye Color'], ['hairColor', 'Hair Color'], ['skin', 'Skin Color'], ['facialColor', 'Facial color'],
] as const
type Field = typeof fields[number][0]
export function AscendDemo() {
  const [body, setBody] = useState<'m' | 'f'>('m')
  const [indices, setIndices] = useState<Partial<Record<Field, number>>>({})
  const [created, setCreated] = useState(false)
  const options = characterOptions[body] as Partial<Record<Field, readonly string[]>>
  function cycle(field: Field, direction: number) {
    const values = options[field] ?? []
    if (!values.length) return
    setIndices(current => ({ ...current, [field]: ((current[field] ?? 0) + direction + values.length) % values.length }))
    setCreated(false)
  }
  function toggleBody() { setBody(current => current === 'm' ? 'f' : 'm'); setIndices({}); setCreated(false) }
  function value(field: Field) { return options[field]?.[indices[field] ?? 0] ?? 'Not available' }
  return <section className="creator" aria-labelledby="creator-title">
    <h2 id="creator-title">Character customisation</h2>
    <p className="creator-intro">Explore the appearance options extracted from Ascend’s character creator. This first version recreates the controls; it does not yet render the game’s character models.</p>
    <div className="creator-layout">
      <div className="creator-summary">
        <p className="creator-label">Appearance summary · No 3D preview yet</p>
        <h3>{created ? 'Your character selection' : 'Build your character'}</h3>
        <p>Human · {body === 'm' ? 'masculine' : 'feminine'}</p>
        <dl>{fields.filter(([key]) => options[key]?.length).map(([key,label]) => <div key={key}><dt>{label}</dt><dd>{value(key)}</dd></div>)}</dl>
        <p role="status">{created ? 'Selection created for this demo. The actual game continues into its level.' : 'Use the arrows to explore the options from the game.'}</p>
      </div>
      <div className="creator-panel"><h3>Customize Character</h3>
        <div className="creator-row"><button type="button" disabled aria-label="Previous race">‹</button><div><span>Race</span><strong>Human</strong></div><button type="button" disabled aria-label="Next race">›</button></div>
        <div className="creator-row"><button type="button" onClick={toggleBody} aria-label="Previous body type">‹</button><div><span>Bodytype</span><strong>{body === 'm' ? 'masculine' : 'feminine'}</strong></div><button type="button" onClick={toggleBody} aria-label="Next body type">›</button></div>
        {fields.map(([key,label]) => <div className="creator-row" key={key}><button type="button" aria-label={`Previous ${label}`} disabled={!options[key]?.length} onClick={() => cycle(key,-1)}>‹</button><div><span>{label}</span><strong>{value(key)}</strong></div><button type="button" aria-label={`Next ${label}`} disabled={!options[key]?.length} onClick={() => cycle(key,1)}>›</button></div>)}
        <button type="button" className="creator-create" onClick={() => setCreated(true)}>Create</button>
        <button type="button" className="creator-reset" onClick={() => { setBody('m'); setIndices({}); setCreated(false) }}>Reset demo</button>
      </div>
    </div>
    <p className="creator-caption">Panel layout referenced from the original portfolio screenshot. Option labels come from the project’s character-creation Blueprint. The summary and reset control are portfolio additions.</p>
  </section>
}
