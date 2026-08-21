import React, { useEffect, useState } from 'react'
import { Trophy } from 'lucide-react'
import api from '../api/axios'

const MEDAL = { 1: '🥇', 2: '🥈', 3: '🥉' }

export default function Leaderboard() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/analytics/leaderboard/').then(({ data }) => setRows(data)).finally(() => setLoading(false))
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="flex items-center gap-2 mb-8">
        <Trophy className="w-7 h-7 text-neon-violet" />
        <h1 className="text-3xl font-bold text-white">Global Leaderboard</h1>
      </div>

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-slate-500 text-left">
              <th className="px-5 py-3 font-medium">Rank</th>
              <th className="px-5 py-3 font-medium">User</th>
              <th className="px-5 py-3 font-medium">Solved</th>
              <th className="px-5 py-3 font-medium">Accuracy</th>
              <th className="px-5 py-3 font-medium">Streak</th>
              <th className="px-5 py-3 font-medium text-right">Points</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center py-10 text-slate-500">Loading...</td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={6} className="text-center py-10 text-slate-500">No ranked users yet — be the first!</td></tr>
            ) : rows.map((r) => (
              <tr key={r.rank} className="border-b border-white/5 hover:bg-white/[0.02] transition">
                <td className="px-5 py-3 font-mono text-slate-400">{MEDAL[r.rank] || r.rank}</td>
                <td className="px-5 py-3 text-white font-medium">{r.username}</td>
                <td className="px-5 py-3 text-slate-300">{r.solved_count}</td>
                <td className="px-5 py-3 text-slate-300">{r.accuracy}%</td>
                <td className="px-5 py-3 text-slate-300">{r.current_streak} 🔥</td>
                <td className="px-5 py-3 text-right font-mono text-neon-violet font-semibold">{r.total_points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
