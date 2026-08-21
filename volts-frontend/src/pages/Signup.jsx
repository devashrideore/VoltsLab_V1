import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Zap } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register(username, email, password)
      navigate('/dashboard')
    } catch (err) {
      const data = err.response?.data
      setError(data?.username?.[0] || data?.password?.[0] || data?.email?.[0] || 'Registration failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="card w-full max-w-md p-8">
        <div className="flex items-center gap-2 justify-center mb-6">
          <Zap className="w-6 h-6 text-cyber-cyan" />
          <span className="text-xl font-bold text-white">Join Volts<span className="text-neon-violet">Lab</span></span>
        </div>
        {error && <div className="mb-4 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Username</label>
            <input className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Email</label>
            <input type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="text-sm text-slate-400 mb-1 block">Password</label>
            <input type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <p className="text-sm text-slate-500 text-center mt-6">
          Already have an account? <Link to="/login" className="text-cyber-cyan hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}
