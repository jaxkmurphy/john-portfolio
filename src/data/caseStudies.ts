interface CaseStudy {
  context: string
  role: string
  sections: { title: string; text: string }[]
}

export const caseStudies: Record<string, CaseStudy> = {
  onespace: {
    context: 'In development · 2026–present',
    role: 'Application development, classroom tools and Firebase integration',
    sections: [
      { title: 'The problem', text: 'Special-class settings need visual supports for children alongside tools that help staff coordinate classroom routines and share information. OneSpace brings these needs into an iPad-first education support platform.' },
      { title: 'Separate experiences, shared classroom context', text: 'The platform provides separate admin, staff and child experiences, with secure classroom access and a school-to-classroom structure. A modular classroom-based data architecture organizes the application around those settings.' },
      { title: 'Classroom tools', text: 'Tools include schedules, Zones of Regulation, First-Then supports, visual timers, word learning and body check. Incident logging and staff handover features support the staff experience.' },
      { title: 'Technical approach', text: 'Flutter and Dart provide the application interface. Firebase Authentication handles sign-in, Firestore stores application data, and Cloud Functions support backend functionality.' },
    ],
  },
  ascend: {
    context: 'Final year project · Creative Computing',
    role: 'Game development, gameplay systems, level design and asset creation',
    sections: [
      { title: 'Project overview', text: 'Ascend is a third-person action-adventure RPG created as my final year project. The work brought gameplay programming and visual design together in Unreal Engine 5.' },
      { title: 'Gameplay and exploration', text: 'Development covered gameplay systems, combat, exploration, level design and player mechanics, with a focus on engaging and responsive combat and exploration.' },
      { title: 'Tools and production', text: 'The project used Unreal Engine 5, C++ and Blueprints. I created and animated assets in Maya 2024 and used GitHub for version control.' },
    ],
  },
  bookify: {
    context: 'Android application',
    role: 'Mobile application development and API integration',
    sections: [
      { title: 'Project overview', text: 'Bookify is an Android application for organizing personal book collections, inspired by the library experience of Spotify.' },
      { title: 'Managing a collection', text: 'Users can add, update, delete and search books and booklists. Google Books API integration supports book discovery, while Firebase provides cloud-based storage and persistence.' },
      { title: 'Technical approach', text: 'The application was built in Kotlin with Android development tools and Gradle, and tested using an Android emulator.' },
    ],
  },
}
