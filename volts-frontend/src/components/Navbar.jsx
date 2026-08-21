import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Zap, LayoutDashboard, Trophy, Code2, LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-obsidian/80 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Zap className="w-6 h-6 text-cyber-cyan group-hover:drop-shadow-[0_0_8px_#00F5FF] transition" />
          <span className="text-xl font-bold text-white">
            Volts<span className="text-neon-violet">Lab</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <Link to="/problems" className="flex items-center gap-1.5 hover:text-cyber-cyan transition">
            <Code2 className="w-4 h-4" /> Problems
          </Link>
          {user && (
            <Link to="/dashboard" className="flex items-center gap-1.5 hover:text-cyber-cyan transition">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </Link>
          )}
          <Link to="/leaderboard" className="flex items-center gap-1.5 hover:text-cyber-cyan transition">
            <Trophy className="w-4 h-4" /> Leaderboard
          </Link>
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <span className="hidden sm:block text-sm text-slate-400">
                Hi, <span className="text-neon-violet font-semibold">{user.username}</span>
              </span>
              <button
                onClick={() => { logout(); navigate('/') }}
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-red-400 transition"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary !py-1.5 !px-4 text-sm">Log In</Link>
              <Link to="/signup" className="btn-primary !py-1.5 !px-4 text-sm">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
