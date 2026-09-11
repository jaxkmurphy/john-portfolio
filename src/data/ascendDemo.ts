// Names are drawn from Ascend's local Unreal assets. This is a UI recreation,
// not an implementation of Unreal combat rules or verified class restrictions.
export const disciplines = [
  { id: 'one-hand', name: 'One-handed', family: 'Warrior', abilities: ['Quick Strike', 'Parry', 'Shield Slam', 'Downward Slash', 'Forceful Strike', 'Heavy Strike', 'Dodge and Strike', '360 Slash', 'Sweep', 'Warcry'] },
  { id: 'two-hand', name: 'Two-handed', family: 'Warrior', abilities: ['Cyclone', 'Jumping Slash', 'Ram', 'Roar', 'Running Stab', 'Spinning Slash', 'Spinning Up Slash', 'Spinning Wide Slash', 'Stab', 'Upwards Stab'] },
  { id: 'bow', name: 'Bow', family: 'Rogue', abilities: ['Backflip', 'Headshot', 'Jumping Shot', 'Knock Back', 'Skewer', 'Sky Shot', 'Snipe', 'Spinning Bow Strike', 'Spinning Kick', 'Stun', 'Volley'] },
  { id: 'dual', name: 'Dual weapons', family: 'Rogue', abilities: ['Bisect', 'Cross Slash', 'Deflecting Stab', 'Dodging Attack', 'Double Slash', 'Double Stab', 'Downward Cross Slash', 'Mid Slice', 'Spinning Slash', 'Throw Weapon'] },
]
export interface LoadoutState { discipline: number; selected: string | null; slots: (string | null)[]; message: string }
export const initialLoadout: LoadoutState = { discipline: 0, selected: null, slots: Array(10).fill(null), message: 'Choose an ability to inspect it.' }
type Action = { type: 'reset' } | { type: 'discipline' | 'slot' | 'clear'; index: number } | { type: 'select'; name: string }
export function loadoutReducer(state: LoadoutState, action: Action): LoadoutState {
  switch (action.type) {
    case 'reset': return initialLoadout
    case 'discipline': return disciplines[action.index] ? { ...initialLoadout, discipline: action.index, slots: Array(10).fill(null), message: 'New discipline selected. Build a fresh loadout.' } : state
    case 'select': return disciplines[state.discipline].abilities.includes(action.name) ? { ...state, selected: action.name, message: `${action.name} selected. Choose a hotbar slot to equip it.` } : state
    case 'clear': return action.index >= 0 && action.index < 10 ? { ...state, slots: state.slots.map((value, index) => index === action.index ? null : value), message: `Slot ${action.index + 1} cleared.` } : state
    case 'slot': {
      if (!state.selected || action.index < 0 || action.index >= 10) return state
      const slots = state.slots.map((value, index) => index === action.index ? state.selected : value === state.selected ? null : value)
      return { ...state, slots, message: `${state.selected} equipped in slot ${action.index + 1}.` }
    }
  }
}
