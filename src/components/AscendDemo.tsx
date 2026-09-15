import { lazy, Suspense, useState } from 'react'
const AscendCharacter = lazy(() => import('./AscendCharacter'))
import '../styles/ascend-demo.css'

const fields = [
  ['hair', 'Hair'], ['facialHair', 'Facial Hair'], ['face', 'Face'],
  ['eye', 'Eye Color'], ['hairColor', 'Hair Color'], ['skin', 'Skin Color'], ['facialColor', 'Facial color'],
] as const
type Field = typeof fields[number][0]
export function AscendDemo() {
  const [showModel, setShowModel] = useState(false)
  const [body, setBody] = useState<'m' | 'f'>('m')
  const [indices, setIndices] = useState<Partial<Record<Field, number>>>({})
  const [created, setCreated] = useState(false)
  const hairMeshes = body === 'm' ? ['01', '02', '03', '04', '09'] : ['02', '03', '04', '07']
  const hairColours = ['Br', 'Bk', 'Gr', 'Bd']
  const options: Partial<Record<Field, readonly string[]>> = { hair: hairMeshes.map(id => `Style ${id}`), hairColor: ['Brown', 'Black', 'Grey', 'Blonde'], skin: ['Skin 1', 'Skin 2', 'Skin 3', 'Skin 4', 'Skin 5'], eye: ['Brown', 'Blue', 'Green', 'Pe'], face: ['Face 1', 'Face 2', 'Face 3', 'Face 4', 'Face 5'], facialHair: body === 'f' ? [] : ['None', 'Beard 01', 'Beard 02', 'Beard 03', 'Beard 05', 'Beard 06', 'Beard 07'], facialColor: body === 'f' ? [] : ['Blonde', 'Black', 'Grey', 'Brown'] }
  function cycle(field: Field, direction: number) {
    const values = options[field] ?? []
    if (!values.length) return
    setIndices(current => ({ ...current, [field]: ((current[field] ?? 0) + direction + values.length) % values.length }))
    setCreated(false)
  }
  function value(field: Field) { return options[field]?.[indices[field] ?? 0] ?? 'Not available yet' }
  return <section className="creator" aria-labelledby="creator-title">
    <h2 id="creator-title">Character customisation</h2>
    <p className="creator-intro">Explore the appearance options extracted from Ascend’s character creator. Inspect an original character model exported from the game, alongside its character-creation controls.</p>
    <div className="creator-layout">
      <div className="creator-summary">
        <p className="creator-label">Original Ascend character · 3D preview</p>
        {showModel ? <Suspense fallback={<p role="status">Opening 3D viewer…</p>}><AscendCharacter skin={['01', '02', '03', '04', '05'][indices.skin ?? 0]} body={body} hair={hairMeshes[indices.hair ?? 0]} hairColour={hairColours[indices.hairColor ?? 0]} eye={['Br', 'Bl', 'Gn', 'Pe'][indices.eye ?? 0]} face={['01', '02', '03', '04', '05'][indices.face ?? 0]} beard={body === 'f' ? '' : ['', '01', '02', '03', '05', '06', '07'][indices.facialHair ?? 0]} beardColour={['Bd', 'Bk', 'Gr', 'Br'][indices.facialColor ?? 0]} /></Suspense> : <div className="ascend-model-start"><p>Explore the character from every angle.</p><button type="button" onClick={() => setShowModel(true)}>Load 3D character</button><p>Approximately 21 MB initial download. Other hairstyles load when selected.</p></div>}
        <p className="creator-caption">Use the arrows to change the hair, face, eyes and facial hair. Skin Color changes exposed body skin while preserving the outfit; Face selects the separately exported face appearance.</p>
        <h3>{created ? 'Your character selection' : 'Build your character'}</h3>
        <p>Human · {body === 'm' ? 'masculine' : 'feminine'}</p>
        <dl>{fields.filter(([key]) => options[key]?.length).map(([key,label]) => <div key={key}><dt>{label}</dt><dd>{value(key)}</dd></div>)}</dl>
        <p role="status">{created ? 'Selection created for this demo. The actual game continues into its level.' : 'Use the arrows to explore the options from the game.'}</p>
      </div>
      <div className="creator-panel"><h3>Customize Character</h3>
        <div className="creator-row"><button type="button" disabled aria-label="Previous race">‹</button><div><span>Race</span><strong>Human</strong></div><button type="button" disabled aria-label="Next race">›</button></div>
        <div className="creator-row"><button type="button" onClick={() => { setBody(body === 'm' ? 'f' : 'm'); setIndices({}); setCreated(false) }} aria-label="Previous body type">‹</button><div><span>Bodytype</span><strong>{body === 'm' ? 'masculine' : 'feminine'}</strong></div><button type="button" onClick={() => { setBody(body === 'm' ? 'f' : 'm'); setIndices({}); setCreated(false) }} aria-label="Next body type">›</button></div>
        {fields.map(([key,label]) => <div className="creator-row" key={key}><button type="button" aria-label={`Previous ${label}`} disabled={!options[key]?.length} onClick={() => cycle(key,-1)}>‹</button><div><span>{label}</span><strong>{value(key)}</strong></div><button type="button" aria-label={`Next ${label}`} disabled={!options[key]?.length} onClick={() => cycle(key,1)}>›</button></div>)}
        <button type="button" className="creator-create" onClick={() => setCreated(true)}>Create</button>
        <button type="button" className="creator-reset" onClick={() => { setBody('m'); setIndices({}); setCreated(false) }}>Reset demo</button>
      </div>
    </div>
    <p className="creator-caption">Panel layout referenced from the original portfolio screenshot. Available hairstyles are labelled by their exported asset numbers. The summary and reset control are portfolio additions.</p>
  </section>
}
