export const activities = [
  { id: 'reading', label: 'Reading time', icon: '📖' },
  { id: 'tidy', label: 'Tidy up', icon: '🧹' },
  { id: 'work', label: 'Finish my work', icon: '✏️' },
]
export const rewards = [
  { id: 'music', label: 'Listen to music', icon: '🎵' },
  { id: 'play', label: 'Play time', icon: '🧸' },
  { id: 'outside', label: 'Outside time', icon: '🌳' },
  { id: 'break', label: 'Take a break', icon: '☕' },
]

export const children = ['Alex', 'Sam', 'Jamie']
interface Board { activity: string; rewards: string[]; selected: string | null }
interface DemoState {
  screen: 'staff' | 'child'; activity: string; rewards: string[];
  target: 'one' | 'some' | 'everyone'; targets: string[];
  boards: Record<string, Board>; child: string; message: string;
}
type DemoAction = { type: 'reset' | 'publish' | 'edit' } | { type: 'activity' | 'reward' | 'choose' | 'target' | 'child' | 'view'; id: string }
export const initialDemoState: DemoState = { screen: 'staff', activity: '', rewards: [], target: 'one', targets: [], boards: {}, child: 'Alex', message: '' }
export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'reset': return initialDemoState
    case 'edit': return { ...state, screen: 'staff' }
    case 'view': return children.includes(action.id) ? { ...state, screen: 'child', child: action.id } : state
    case 'target': return ['one', 'some', 'everyone'].includes(action.id) ? { ...state, target: action.id as DemoState['target'], targets: [], message: '' } : state
    case 'child': return children.includes(action.id) ? { ...state, targets: state.target === 'one' ? [action.id] : state.targets.includes(action.id) ? state.targets.filter(id => id !== action.id) : [...state.targets, action.id] } : state
    case 'activity': return state.screen === 'staff' && activities.some(item => item.id === action.id) ? { ...state, activity: action.id, message: '' } : state
    case 'reward': {
      if (state.screen !== 'staff' || !rewards.some(item => item.id === action.id)) return state
      const next = state.rewards.includes(action.id) ? state.rewards.filter(id => id !== action.id) : state.rewards.length < 3 ? [...state.rewards, action.id] : state.rewards
      return { ...state, rewards: next, message: '' }
    }
    case 'publish': {
      if (!state.activity) return { ...state, message: 'Choose a WHEN activity first.' }
      if (!state.rewards.length) return { ...state, message: 'Choose between 1 and 3 THEN rewards.' }
      const targets = state.target === 'everyone' ? children : state.targets
      if (!targets.length) return { ...state, message: 'Please choose at least one child.' }
      const boards = { ...state.boards }
      for (const child of targets) boards[child] = { activity: state.activity, rewards: [...state.rewards], selected: state.rewards.length === 1 ? state.rewards[0] : null }
      return { ...state, boards, activity: '', rewards: [], targets: [], message: 'When–Then board created successfully.' }
    }
    case 'choose': {
      const board = state.boards[state.child]
      if (state.screen !== 'child' || !board || board.selected || !board.rewards.includes(action.id)) return state
      return { ...state, boards: { ...state.boards, [state.child]: { ...board, selected: action.id } } }
    }
  }
}
