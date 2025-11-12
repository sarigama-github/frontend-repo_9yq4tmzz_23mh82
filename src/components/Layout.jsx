import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Rocket, Sparkles, Home, LayoutDashboard, Lightbulb, FileBarChart, Info, Mail } from 'lucide-react'

const NavLink = ({ to, children }) => {
  const { pathname } = useLocation()
  const active = pathname === to
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${active ? 'text-white bg-white/10' : 'text-white/80 hover:text-white'}`}
    >
      {children}
    </Link>
  )
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_10%_-10%,#1d4ed8_10%,transparent),radial-gradient(1000px_400px_at_90%_-20%,#9333ea_10%,transparent)] bg-slate-950 text-slate-100">
      <header className="sticky top-0 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 bg-slate-900/80 border-b border-white/10 z-50">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-tr from-blue-500 to-fuchsia-500">
              <Rocket className="w-5 h-5" />
            </div>
            <span className="font-semibold tracking-tight">StartupMate</span>
          </Link>
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/validate">Validate Idea</NavLink>
            <NavLink to="/score">Score Deck</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </nav>
          <Link to="/validate" className="md:inline-flex hidden items-center gap-2 bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white px-4 py-2 rounded-md text-sm font-semibold shadow hover:shadow-lg transition-shadow">
            <Sparkles className="w-4 h-4" /> Try AI
          </Link>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-10">{children}</main>
      <footer className="border-t border-white/10 text-center text-sm text-white/60 py-8">
        © {new Date().getFullYear()} StartupMate — Built with responsibility and care.
      </footer>
    </div>
  )
}
