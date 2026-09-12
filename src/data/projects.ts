export const projects = [
  { id: 'onespace', title: 'OneSpace', category: 'Education support platform', description: 'An iPad-first platform for special-class school settings, with separate admin, staff and child experiences. Classroom tools bring schedules, visual supports and handovers together.', technologies: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Cloud Functions'] },
  { id: 'ascend', title: 'Ascend', category: 'Third-person action adventure RPG', description: 'My final year project exploring combat, player mechanics and level design through a third-person action adventure game.', technologies: ['Unreal Engine 5', 'C++', 'Blueprints', 'Maya 2024'] },
  { id: 'bookify', title: 'Bookify', category: 'Mobile book management app', description: 'An Android application for searching books and managing a personal collection, with Google Books search, personal booklists and reading notes.', technologies: ['Kotlin', 'Android', 'Google Books API', 'Local JSON storage'] },
]

export type Project = (typeof projects)[number]
