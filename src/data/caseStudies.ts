interface CaseStudy {
  context: string
  role: string
  sections: { title: string; text: string }[]
}

export const caseStudies: Record<string, CaseStudy> = {
  orbitell: {
    context: 'In development · Preparing for a local school pilot',
    role: 'Project creator and developer · Application development, account architecture and classroom tools',
    sections: [
      { title: 'Why I started', text: 'My mother has worked as a Special Needs Assistant for more than twenty years. Hearing about the difficulties she faced at work gave me a personal connection to the challenges of supporting a classroom. After graduating, I decided to use my time and development skills to build something that could help. That became Orbitell, an iPad-first education support platform for special-class settings.' },
      { title: 'Supporting the classroom', text: 'The platform brings visual supports for children and coordination tools for staff into one application. Tools include schedules, First-Then supports, visual timers, word learning, Zones of Regulation and body check. Incident logging and handover features support the staff experience. The aim is to make these tools available within a shared school and classroom structure; their usefulness in practice will be tested during the planned pilot.' },
      { title: 'The biggest technical change', text: 'One of the most demanding stages was moving away from the original single-account login approach. I changed the project to separate administrator accounts from classroom logins. This required a substantial overhaul of the existing application to support the new account structure, rather than simply changing the sign-in screen.' },
      { title: 'How the structure works now', text: 'The application provides separate admin, staff and child experiences, organised around schools and classrooms. Administrator accounts and classroom logins serve different purposes within that structure. Reworking the project around this separation was a significant part of its development and shaped how users access the classroom tools.' },
      { title: 'Technical approach', text: 'I am building the interface with Flutter and Dart. Firebase Authentication handles sign-in, Firestore stores application data, and Cloud Functions support backend functionality. The classroom tools sit within the wider school and account structure.' },
      { title: 'Current stage and next steps', text: 'The application is still in development. I am working through naming and trademark considerations and beginning the process of setting up a business. A pilot involving multiple local schools is being planned, with testing still to come. The next step is to learn from use in those schools before making claims about the platform’s impact. Orbitell remains the working name; the final name has not yet been decided.' },
    ],
  },
  ascend: {
    context: 'Completed final year project · Creative Computing',
    role: 'Game development · Gameplay systems, character creation, enemy AI and level design',
    sections: [
      { title: 'Learning Unreal by building a game', text: 'Ascend was my final year project and a challenge to learn Unreal Engine through building a complete playable experience. Before starting, my experience was limited to experimenting in the editor. I had not worked with Blueprints. I built the game’s systems from scratch as I learned how to bring character creation, combat, progression and enemy behaviour together.' },
      { title: 'The completed experience', text: 'Players create a character with a range of appearance options, then progress through one large level. They can choose from several weapons and skills, fight enemies, level up and increase their stats. The level ends with a boss encounter that players must overcome to complete it.' },
      { title: 'Character creation', text: 'The character creator was one of the most challenging parts of the project. Building it gave me an appreciation for the amount of work behind a feature that can seem straightforward from a player’s perspective. The interactive preview on this page shows a selection of the character’s modular parts and appearance options, recreated for the browser from the Unreal project’s exported assets.' },
      { title: 'Enemy AI', text: 'Enemy AI was the other major challenge, covering both how enemies spawn and how they behave during play. Developing those systems formed a substantial part of learning how to make the level function as a game, with enemies for the player to encounter and fight throughout their progression.' },
      { title: 'Tools and development', text: 'I developed Ascend in Unreal Engine 5, using Blueprints to build gameplay behaviour. The project also involved Maya 2024 and GitHub for version control. Bringing the systems together into a level with a beginning, progression and a boss encounter was the central outcome of the project.' },
    ],
  },
  bookify: {
    context: 'Completed college assignment · Android application',
    role: 'Kotlin Android development and Google Books API integration',
    sections: [
      { title: 'A book library inspired by Spotify', text: 'Bookify began as a college assignment and an idea I was personally interested in exploring: a book version of Spotify. The starting point was to let people organise books into booklists, similar to organising music into playlists. A list could focus on a particular genre or any other type of book the user wanted to collect.' },
      { title: 'Learning to work with an API', text: 'The biggest challenge was understanding what APIs are and how to use them in an application. Integrating the Google Books API became the main learning experience of the project: connecting book search to an external source of information and making the results useful within the app’s booklist workflow.' },
      { title: 'The completed workflow', text: 'I completed the features I set out to build. Users can create booklists for different genres or types of books, search for books and add them to their chosen lists. This brought the original playlist-inspired idea into a working Android application.' },
      { title: 'Technical approach', text: 'Bookify was built with Kotlin and Android development tools. Google Books provides the search data, while booklists are stored locally in JSON files. Reading details, including page numbers, ratings and Catch up notes, are saved using Android preferences. The portfolio demo recreates the core workflow with a sample catalogue.' },
    ],
  },
}
