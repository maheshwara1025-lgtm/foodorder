# TableMate — Restaurant Reservation App (React + Vite + Tailwind CSS)

This project combines the four restaurant reservation experiments:
1. React Hooks and reusable components
2. Custom Hooks and Context API
3. React Router dynamic and nested routing
4. Authentication, protected routes, validation and error handling

## Requirements
- Node.js 18+ recommended
- VS Code

## Run
1. Extract this ZIP.
2. Open the `RestaurantReservationApp_Tailwind` folder in VS Code.
3. Open Terminal → New Terminal.
4. Run:
   ```bash
   npm install
   npm run dev
   ```
5. Open the local URL Vite prints, usually `http://localhost:5173`.

## Installed dependencies
Runtime:
- react
- react-dom
- react-router-dom

Development:
- vite
- @vitejs/plugin-react
- tailwindcss
- postcss
- autoprefixer

Tailwind CSS is configured using `tailwind.config.js`, `postcss.config.js`, and the `@tailwind` directives in `src/styles.css`. Existing component CSS is retained so the complete responsive design stays consistent while Tailwind utility classes are available for further changes.

## Demo login
Email: `student@example.com`
Password: `Table123`

Demo only: authentication and reservations use localStorage. Do not use this as production authentication.

## Routes
- `/`
- `/restaurants`
- `/restaurant/101` (also 102, 103, 104)
- `/tables`
- `/reservation`
- `/reservation/date-time`
- `/reservation/table`
- `/reservation/details`
- `/reservation/summary`
- `/checkout`
- `/login`
- `/reservations`
"# foodorder" 
"# foodorder" 
"# foodorder" 
