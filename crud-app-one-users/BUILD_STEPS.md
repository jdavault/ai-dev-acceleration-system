# CRUD App Build Steps

Following a ~3-year-old video tutorial. Some dependencies/syntax may be outdated.
Video: http://www.youtube.com/watch?v=SYv61aPSiOo

## Environment

- Node 22 / 24
- Vite (React SPA bundler)
- TypeScript (instead of video's JSX/PropTypes)
- React + React Router DOM + Bootstrap + JSON Server

## Known Compatibility Notes (2026 vs ~2023 video)

- **Vite** — video uses Vite 4.2 / @vitejs/plugin-react 3.1. Current is Vite 6+ / plugin-react 4+. The `npm create vite@latest` command and `vite.config.js` structure are the same, just newer versions. No action needed — use latest.
- **react-router-dom** — v6+ has breaking changes vs v5 (no `<Switch>`, uses `<Routes>` and `element={}` instead of `component={}`). Video may show v5 syntax.
- **json-server** — v1.0+ (released 2024) has breaking API changes vs v0.17.x. If the video uses v0.17, you may need `npm install json-server@0.17.4` to match the tutorial. v1.0+ changed CLI flags and default behavior.
- **Bootstrap** — v5 is current, should be fine. If video uses `react-bootstrap`, that's also stable.

## Steps

### 1. Scaffold the React project with Vite

- `npm create vite@latest . -- --template react-ts`(scaffolds in current directory)

### 2. Install dependencies

Video versions vs current (2026):
| Package | Video | Current |
|---------|-------|---------|
| react | 18.2.0 | 19.2.4 (already installed) |
| react-dom | 18.2.0 | 19.2.4 (already installed) |
| vite | 4.2.0 | 8.0.1 (already installed) |
| react-router-dom | 6.9.0 | use latest (v7+) |
| bootstrap | 5.2.3 | use latest (v5.3+) |
| axios | 1.3.4 | use latest |
| json-server | 0.17.3 | pin to 0.17.4 (v1.0+ has breaking changes) |

- `npm install && npm install react-router-dom bootstrap axios json-server@0.17.4 && npm install -D concurrently`

- `add "scripts": {
    "dev": "concurrently \"vite\" \"json-server --watch db.json --port 3001\"",
}`

Scripts added to `package.json`:

- `npm run dev` — runs both Vite and JSON Server in one terminal
- `npm run client` — runs Vite only (http://localhost:5173)
- `npm run server` — runs JSON Server only (http://localhost:3001)

### 4. Set up JSON Server (fake REST API)

- Create `db.json` in the app root with initial data
- Run `npm run server` (or `npm run dev` for both) to start the API
- Verify API works: `curl http://localhost:3001/<resource>`

### 5. Convert project to TypeScript

Video uses JSX with PropTypes — we're using TypeScript instead. No PropTypes needed.

**Install TypeScript:**

```bash
npm install -D typescript
```

(Note: `@types/react` and `@types/react-dom` are already installed from the Vite scaffold)

**Add `tsconfig.json`** to app root (Vite needs this):

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src"]
}
```

**Rename files** (`.jsx` -> `.tsx`, `.js` -> `.ts`):

- `src/main.jsx` -> `src/main.tsx`
- `src/App.jsx` -> `src/App.tsx`
- All new components should be `.tsx`

**Update `index.html`**: change `<script src="/src/main.jsx">` to `<script src="/src/main.tsx">`

**Rename `vite.config.js`** to `vite.config.ts` (optional but consistent)

**Create a `User` type** (replaces PropTypes from the video):

```ts
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}
```

Put this in a shared file like `src/types.ts` or define it where needed.

### 6. Set up routing

- Configure `BrowserRouter` in `main.tsx` or `App.tsx`
- Define routes for list, create, edit, detail views

### 7. Build CRUD components (as `.tsx`)

- **List/Index** — fetch and display all records
- **Create** — form to add a new record (POST)
- **Edit** — form to update an existing record (PUT)
- **Detail/Show** — view a single record
- **Delete** — remove a record (DELETE)

Wherever the video uses PropTypes, just type the props with an interface instead.

### 8. Style with Bootstrap

- Add Bootstrap CSS import
- Apply Bootstrap classes to components (tables, forms, buttons, navbar)

### 9. Connect to JSON Server API

- Use `fetch` or `axios` for HTTP calls
- Wire up each CRUD operation to the corresponding endpoint

### 10. Test the full flow

- Create, read, update, delete records end-to-end
- Verify routing works correctly
