import { NavLink, Outlet } from 'react-router-dom'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <p className="app-brand">agriQ Operator</p>
        <nav className="app-nav" aria-label="Main">
          <NavLink to="/" end>
            Sites
          </NavLink>
          <NavLink to="/alerts">Alerts</NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  )
}
