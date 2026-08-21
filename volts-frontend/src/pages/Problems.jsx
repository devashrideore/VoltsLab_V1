import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, Filter } from 'lucide-react'
import api from '../api/axios'

const TOPICS = [
  ['BASIC_ELECTRICAL', 'Basic Electrical'],
  ['CIRCUIT_THEORY', 'Circuit Theory'],
  ['ELECTRONICS_VLSI', 'Electronics and VLSI'],
  ['ELECTRICAL_MACHINES', 'Electrical Machines'],
  ['POWER_ELECTRONICS', 'Power Electronics'],
  ['RENEWABLE_ENERGY', 'Renewable Energy'],
  ['CONTROL_SYSTEMS', 'Control Systems'],
  ['EMBEDDED_IOT', 'Embedded and IoT'],
]

const TYPES = [['THEORY', 'Theory MCQ'], ['NUMERICAL', 'Numerical MCQ']]
const DIFFICULTIES = [['EASY', 'Easy'], ['MEDIUM', 'Medium'], ['HARD', 'Hard']]

const DIFF_COLOR = {
  EASY: 'text-green-400 bg-green-400/10 border-green-400/20',
  MEDIUM: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  HARD: 'text-red-400 bg-red-400/10 border-red-400/20',
}

export default function Problems() {
  const [questions, setQuestions] = useState([])
  const [loading, setLoading] = useState(true)
  const [topic, setTopic] = useState('')
  const [type, setType] = useState('')
  const [difficulty, setDifficulty] = useState('')

  useEffect(() => {
    setLoading(true)
    const params = {}
    if (topic) params.topic = topic
    if (type) params.problem_type = type
    if (difficulty) params.difficulty = difficulty
    api.get('/problems/', { params })
      .then(({ data }) => setQuestions(data.results ?? data))
      .finally(() => setLoading(false))
  }, [topic, type, difficulty])

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Practice Problems</h1>
      <p className="text-slate-400 mb-8">Filter by topic, question type, or difficulty.</p>

      <div className="card p-5 mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-3">
          <Filter className="w-4 h-4" /> Filters
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select className="input-field" value={topic} onChange={(e) => setTopic(e.target.value)}>
            <option value="">All Topics</option>
            {TOPICS.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <select className="input-field" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All Types</option>
            {TYPES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
          <select className="input-field" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">All Difficulties</option>
            {DIFFICULTIES.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-16 text-slate-500">Loading problems...</div>
      ) : questions.length === 0 ? (
        <div className="text-center py-16 text-slate-500">No problems match these filters.</div>
      ) : (
        <div className="space-y-3">
          {questions.map((q) => (
            <Link
              key={q.id}
              to={`/problems/${q.id}`}
              className="card p-5 flex items-center justify-between hover:border-neon-violet/40 hover:shadow-glow transition group"
            >
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="text-xs font-mono px-2 py-0.5 rounded border border-cyber-cyan/20 text-cyber-cyan bg-cyber-cyan/5">
                    {q.topic_display}
                  </span>
                  <span className={`text-xs font-mono px-2 py-0.5 rounded border ${DIFF_COLOR[q.difficulty]}`}>
                    {q.difficulty}
                  </span>
                  <span className="text-xs text-slate-500">{q.problem_type === 'THEORY' ? 'Theory MCQ' : 'Numerical MCQ'}</span>
                </div>
                <h3 className="text-white font-medium group-hover:text-neon-violet transition">{q.title}</h3>
              </div>
              <div className="flex items-center gap-3 text-slate-500">
                <span className="text-sm font-mono">{q.points} pts</span>
                <ChevronRight className="w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
