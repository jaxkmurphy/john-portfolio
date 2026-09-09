# John's developer portfolio

A beginner-friendly React + TypeScript + Vite project. This is the first homepage milestone, not the finished portfolio.

## 1. Check your tools

In VS Code, choose Terminal > New Terminal:

```powershell
node --version
npm --version
git --version
```

The original machine defaults were Node 18.15.0, npm 9.5.0 and Git 2.49.0. Current Vite requires Node 20.19+ or 22.12+. Install Node 24 LTS from https://nodejs.org/en/download, then close and reopen VS Code and check again. npm comes with Node. This project was set up using an existing bundled Node 24.19.0; the system Node installation has not been upgraded.

Node runs development tools; npm installs packages; Git records changes. Visitors do not need Node to view the built website.

## 2. Create the starter (already completed)

The equivalent command on a compatible Node installation is:

```powershell
npm create vite@latest john-portfolio -- --template react-ts
cd john-portfolio
npm install
```

Do not run this again inside this existing project. The react-ts template supplies React, TypeScript and Vite configuration. package.json lists dependencies and commands; package-lock.json records exact installed versions. Commit both. node_modules contains downloaded packages and stays out of Git.

## 3. Understand the folders (already created)

```text
public/                 Files copied unchanged, such as your future CV
src/
  components/           Reusable UI: ProjectCard.tsx
  data/                 Project descriptions: projects.ts
  pages/                Page layouts: HomePage.tsx
  styles/               Shared styling: global.css
  App.tsx               Selects the page to render
  main.tsx              Mounts React into index.html
  index.css             Imports the shared stylesheet
```

A component is a function that returns part of the interface. ProjectCard receives a project through props (inputs). HomePage uses map to render one card per data entry. The Project type checks that those inputs have the expected structure. App currently renders HomePage directly; routing can be introduced when we build case-study pages.

## 4. Git (initialized before homepage work)

This directory has its own repository on the main branch. No GitHub repository or remote has been created. No commit has been made on your behalf.

```powershell
git status
git add .
git commit -m "Set up portfolio and first homepage"
```

Run the commit when you have reviewed the files. If Git requests your identity, configure your own name and email before retrying. .gitignore excludes node_modules and dist. Never commit secrets or private student/classroom data.

## 5. Run and edit the homepage

Open this john-portfolio folder in VS Code using File > Open Folder. After upgrading Node, run:

```powershell
npm run dev
```

Open the local address printed in the terminal. Keep that terminal running while editing; Ctrl+C stops it. Edit a description in src/data/projects.ts and save to see the update. Then try changing spacing in src/styles/global.css.

The first homepage includes an introduction, OneSpace as the first project, Ascend, Bookify and an About section. It deliberately has no made-up contact details, CV download or empty case-study links.

```powershell
npm run build
npm run lint
```

Build checks TypeScript and creates the publishable dist folder. Lint checks for code problems. npm run preview serves the production build locally after building.

## 6. Next lessons

Review the introduction and project descriptions. Add a Skills section, verified Experience content, contact links and a real CV. Then build the OneSpace case study, followed by Ascend and Bookify. Use redacted screenshots with permission.

## 7. GitHub Pages later

Keep the default Vite configuration during local development. When the GitHub repository name is known, configure Vite's base path for the deployment URL: / for a username.github.io repository or custom domain, and /repository-name/ for a project site. Before adding case-study navigation, decide how direct page loads will work on static hosting; hash routing is a straightforward option.

Later we will add a GitHub Actions workflow to install from the lockfile with npm ci, build, and deploy dist. Deployment and a workflow are intentionally deferred to a later lesson.

References: https://vite.dev/guide/ and https://vite.dev/guide/static-deploy.html#github-pages
