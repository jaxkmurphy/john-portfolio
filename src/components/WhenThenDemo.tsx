import { useReducer, useRef, useEffect } from 'react'
import { demoReducer, initialDemoState, activities, rewards, children } from '../data/whenThenDemo'
import '../styles/when-then-demo.css'

export function WhenThenDemo() {
  const [state, dispatch] = useReducer(demoReducer, initialDemoState)
  const heading = useRef<HTMLHeadingElement>(null)
  const previousScreen = useRef(state.screen)
  useEffect(() => {
    if (previousScreen.current !== state.screen) heading.current?.focus()
    previousScreen.current = state.screen
  }, [state.screen])
  const board = state.screen === 'child' ? state.boards[state.child] : undefined
  const activeRewards = state.screen === 'child' ? board?.rewards ?? [] : state.rewards
  const activity = activities.find(item => item.id === (state.screen === 'child' ? board?.activity : state.activity))
  const options = rewards.filter(item => activeRewards.includes(item.id))
  const selected = rewards.find(item => item.id === board?.selected)
  return <section className="when-then-demo" aria-labelledby="demo-title">
    <div className="demo-intro">
      <div><p className="demo-kicker">Interactive app demo</p><h2 id="demo-title">Try a When–Then board</h2></div>
      <p>Set up a plan as a staff member, then experience it as a child. This standalone preview uses fictional data. Orbitell is the proposed app name.</p>
    </div>
    <div className="demo-app">
      <header className="demo-toolbar"><span>Maple Classroom · Sample</span><button type="button" onClick={() => dispatch({ type: 'reset' })}>Reset demo</button></header>
      <div className="demo-body">
        <p className="demo-kicker">{state.screen === 'staff' ? '1 · Staff setup' : '2 · Child experience'}</p>
        <h3 ref={heading} tabIndex={-1}>{state.screen === 'staff' ? 'When–Then Setup' : `Here’s your plan, ${state.child}!`}</h3>
        {state.screen === 'staff' ? <>
          <p>Choose who should see the board, what happens first and the possible rewards.</p>
          <fieldset className="demo-step"><legend>1 · Who</legend>
            <p>Who should see this board?</p>
            <div className="demo-segments">{(['one', 'some', 'everyone'] as const).map(mode => <button type="button" key={mode} aria-pressed={state.target === mode} onClick={() => dispatch({ type: 'target', id: mode })}>{mode === 'one' ? 'One' : mode === 'some' ? 'Some' : 'Everyone'}</button>)}</div>
            {state.target === 'everyone' ? <p>This board will be sent to all {children.length} children.</p> : <div className="demo-segments">{children.map(child => <button type="button" key={child} aria-pressed={state.targets.includes(child)} onClick={() => dispatch({ type: 'child', id: child })}>{child}</button>)}</div>}
          </fieldset>
          <fieldset className="demo-step"><legend>2 · WHEN</legend>
            <div className="demo-options">{activities.map(item => <button type="button" key={item.id} aria-pressed={state.activity === item.id} onClick={() => dispatch({ type: 'activity', id: item.id })}><span aria-hidden="true">{item.icon}</span>{item.label}{state.activity === item.id && <small>Selected</small>}</button>)}</div>
          </fieldset>
          <fieldset className="demo-step demo-rewards"><legend>3 · THEN</legend>
            <p id="reward-limit">Select 1–3 rewards. With one option, it is selected automatically for the child.</p>
            <div className="demo-options" aria-describedby="reward-limit">{rewards.map(item => <button type="button" key={item.id} aria-pressed={state.rewards.includes(item.id)} disabled={state.rewards.length === 3 && !state.rewards.includes(item.id)} onClick={() => dispatch({ type: 'reward', id: item.id })}><span aria-hidden="true">{item.icon}</span>{item.label}{state.rewards.includes(item.id) && <small>Selected</small>}</button>)}</div>
            <p role="status">{state.rewards.length} of 3 rewards selected</p>
          </fieldset>
          <div className="demo-preview"><h4>Board preview</h4><div><p><strong>WHEN</strong><br />{activity?.label ?? 'Choose activity'}</p><span aria-hidden="true">→</span><p><strong>THEN</strong><br />{options.length === 0 ? 'Choose rewards' : options.length === 1 ? options[0].label : `${options.length} reward choices`}</p></div></div>
          <button type="button" className="demo-primary" onClick={() => dispatch({ type: 'publish' })}>Create When–Then Board</button>
          <p role="status">{state.message}</p>
        </> : !board ? <div className="demo-feedback"><h4>All caught up!</h4><p>No active When–Then board right now.</p><p>A new plan will appear here when it is ready.</p><button type="button" onClick={() => dispatch({ type: 'edit' })}>Return to staff setup</button></div> : <>
          <p>One step at a time — you’ve got this!</p>
          <div className="demo-when"><h4>WHEN</h4><span className="demo-symbol" aria-hidden="true">{activity?.icon}</span><p>{activity?.label}</p></div>
          <div className="demo-arrow" aria-hidden="true">↓</div>
          <div className="demo-then"><h4>THEN</h4><p>{selected ? 'Great choice!' : 'Choose your reward'}</p>
            <div className="demo-options">{options.map(item => <button type="button" key={item.id} aria-pressed={board?.selected === item.id} disabled={Boolean(selected)} className={selected && selected.id !== item.id ? 'demo-faded' : ''} onClick={() => dispatch({ type: 'choose', id: item.id })}><span aria-hidden="true">{item.icon}</span>{item.label}{board?.selected === item.id && <small>✓ Chosen</small>}</button>)}</div>
          </div>
          <div className={`demo-feedback ${selected ? 'demo-success' : ''}`} role="status">{selected ? <>★ Brilliant choice!<br />{selected.label}</> : 'Finish your WHEN activity, then enjoy your reward!'}</div>
          <button type="button" onClick={() => dispatch({ type: 'edit' })}>← Return to staff setup</button>
        </>}
      </div>
      <div className="demo-visitor"><strong>Explore the sample child views</strong><p>These controls are for portfolio visitors; in the app, each child opens their own profile.</p><div className="demo-segments">{children.map(child => <button type="button" key={child} aria-pressed={state.screen === 'child' && state.child === child} onClick={() => dispatch({ type: 'view', id: child })}>{child}’s view</button>)}</div></div>
    </div>
    <p className="demo-caption">Based on the app’s staff setup and child board. Each child keeps their own board and choice. Creating a new board replaces it only for the selected children. Reset clears all sample boards. Option management and account access are outside this demo.</p>
  </section>
}
