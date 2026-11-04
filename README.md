# GitHub User Search (TypeScript)

A small website to search for information about GitHub profiles. Type a username and see the avatar, name, bio, followers, and public repo count.

**Live demo:** [_(link)_](https://user-search-ts-smoky.vercel.app/)
**Original JavaScript version:**[ _(link)_](https://arikachi.github.io/user_search/)

## Features

- Search any GitHub user by username
- Loading state while the request is in progress
- Clear error messages for "user not found", rate limit reached, and network problems
- Search history (last 5 users) saved in `localStorage`, newest first, no duplicates
- Click a history item to search that user again
- User data is rendered with `textContent` (no `innerHTML`), so API data can't inject HTML

## Tech

- TypeScript
- Vite
- HTML, CSS
- [GitHub REST API](https://docs.github.com/en/rest/users/users): `https://api.github.com/users/{username}`
- `localStorage` for history

## Run locally

Requires [Node.js](https://nodejs.org) (LTS).

```
git clone https://github.com/arikachi/user_search_ts.git
cd user_search_ts
npm install
npm run dev
```

To create and preview a production build:

```
npm run build
npm run preview
```

Note: GitHub's unauthenticated API allows about 60 requests per hour per IP address. If you hit the limit, the app shows a message and you can try again later.

## Project structure

```
user_search_ts/
├── index.html        # page content
├── package.json
├── tsconfig.json
├── screenshots/
│   └── screenshot.png
└── src/
    ├── main.ts       # app flow, event handling, connects the other modules
    ├── api.ts        # fetching data from the GitHub API, GitHubUser type
    ├── ui.ts         # DOM rendering (user card, status messages, history list)
    ├── storage.ts    # reading and writing search history in localStorage
    └── style.css     # styling
```

## What I learned

- Migrating a JavaScript project to TypeScript step by step
- Typing API responses with an `interface`, including nullable fields (`string | null`)
- Typing DOM elements and handling `null` from lookups
- Narrowing `unknown` errors in `catch` with `instanceof Error`
- `async`/`await` and `fetch`, including handling HTTP errors (`fetch` does not reject on 404/403)
- Event delegation for the history list
- Storing structured data in `localStorage` with `JSON.stringify` / `JSON.parse`
- Setting up and building a project with Vite

## Next steps

- Rebuild the UI with React
- Add a Node.js backend that proxies and caches the GitHub API