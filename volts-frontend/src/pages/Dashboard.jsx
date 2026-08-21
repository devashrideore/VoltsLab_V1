import React, { useEffect, useState } from 'react'
import { Flame, Target, Trophy, CheckCircle2 } from 'lucide-react'
import api from '../api/axios'
import ProgressBar from '../components/ProgressBar'

const STAT_CARDS = [
  { key: 'solved_count', label: 'Total Solved', icon: CheckCircle2, color: 'text-green-400' },
  { key: 'current_streak', label: 'Daily Streak', icon: Flame, color: 'text-orange-400', suffix: ' 🔥' },
  { key: 'accuracy', label: 'Accuracy', icon: Target, color: 'text-cyber-cyan', suffix: '%' },
  { key: 'global_rank', label: 'Global Rank', icon: Trophy, color: 'text-neon-violet', prefix: '#' },
]

export default function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get('/analytics/dashboard/').then(({ data }) => setStats(data))
  }, [])

  if (!stats) return <div className="text-center py-24 text-slate-500">Loading dashboard...</div>

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-8">Your Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {STAT_CARDS.map(({ key, label, icon: Icon, color, suffix = '', prefix = '' }) => (
          <div key={key} className="card p-5">
            <Icon className={`w-5 h-5 mb-3 ${color}`} />
            <div className="text-2xl font-bold text-white">{prefix}{stats[key]}{suffix}</div>
            <div className="text-sm text-slate-500 mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-semibold text-white mb-6">Subject Mastery</h2>
        {stats.subject_mastery.map((m) => (
          <ProgressBar
            key={m.topic}
            label={m.topic_display}
            percent={m.percent}
            solved={m.solved}
            total={m.total}
          />
        ))}
      </div>
    </div>
  )
}
