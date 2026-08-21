import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { CheckCircle2, XCircle, Lightbulb, NotebookPen, ArrowLeft } from 'lucide-react'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

const OPTION_KEYS = ['A', 'B', 'C', 'D']

export default function ProblemDetail() {
  const { id } = useParams()
  const { user } = useAuth()
  const [question, setQuestion] = useState(null)
  const [selected, setSelected] = useState(null)
  const [result, setResult] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [scratchpad, setScratchpad] = useState('')
  const [showHint, setShowHint] = useState(false)

  useEffect(() => {
    api.get(`/problems/${id}/`).then(({ data }) => setQuestion(data))
    setSelected(null)
    setResult(null)
    setShowHint(false)
  }, [id])

  const handleSubmit = async () => {
    if (!selected || !user) return
    setSubmitting(true)
    try {
      const { data } = await api.post('/submissions/submit/', {
        question_id: Number(id),
        selected_option: selected,
      })
      setResult(data)
    } finally {
      setSubmitting(false)
    }
  }

  if (!question) return <div className="text-center py-24 text-slate-500">Loading question...</div>

  const options = {
    A: question.option_a, B: question.option_b, C: question.option_c, D: question.option_d,
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <Link to="/problems" className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-cyber-cyan transition mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Problems
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT PANEL */}
        <div className="card p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-mono px-2 py-0.5 rounded border border-cyber-cyan/20 text-cyber-cyan bg-cyber-cyan/5">
              {question.topic_display}
            </span>
            <span className="text-xs font-mono px-2 py-0.5 rounded border border-neon-violet/30 text-neon-violet bg-neon-violet/5">
              {question.difficulty}
            </span>
            <span className="text-xs text-slate-500">{question.points} pts</span>
          </div>
          <h1 className="text-xl font-bold text-white mb-4">{question.title}</h1>
          <p className="text-slate-300 leading-relaxed whitespace-pre-line mb-4">{question.question_text}</p>
          {question.given_values && (
            <div className="bg-obsidian border border-white/10 rounded-lg p-3 font-mono text-sm text-cyber-cyan mb-4">
              {question.given_values}
            </div>
          )}

          <div className="space-y-3 mt-6">
            {OPTION_KEYS.map((key) => {
              const isSelected = selected === key
              const isCorrectAnswer = result && key === result.correct_option
              const isWrongSelected = result && isSelected && !result.is_correct
              return (
                <button
                  key={key}
                  disabled={!!result}
                  onClick={() => setSelected(key)}
                  className={`w-full text-left px-4 py-3 rounded-xl border transition flex items-center gap-3
                    ${isCorrectAnswer ? 'border-green-400/50 bg-green-400/10' : ''}
                    ${isWrongSelected ? 'border-red-400/50 bg-red-400/10' : ''}
                    ${!result && isSelected ? 'border-neon-violet bg-neon-violet/10' : ''}
                    ${!result && !isSelected ? 'border-white/10 hover:border-neon-violet/40' : ''}
                  `}
                >
                  <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 text-sm font-mono text-slate-300 shrink-0">
                    {key}
                  </span>
                  <span className="text-slate-200 text-sm">{options[key]}</span>
                  {isCorrectAnswer && <CheckCircle2 className="w-5 h-5 text-green-400 ml-auto shrink-0" />}
                  {isWrongSelected && <XCircle className="w-5 h-5 text-red-400 ml-auto shrink-0" />}
                </button>
              )
            })}
          </div>

          {!user ? (
            <p className="text-sm text-slate-500 mt-5">
              <Link to="/login" className="text-cyber-cyan hover:underline">Log in</Link> to submit answers and track progress.
            </p>
          ) : !result ? (
            <button
              onClick={handleSubmit}
              disabled={!selected || submitting}
              className="btn-primary w-full mt-6"
            >
              {submitting ? 'Checking...' : 'Submit Answer'}
            </button>
          ) : (
            <div className={`mt-6 rounded-xl p-4 border ${result.is_correct ? 'border-green-400/30 bg-green-400/5' : 'border-red-400/30 bg-red-400/5'}`}>
              <p className={`font-semibold ${result.is_correct ? 'text-green-400' : 'text-red-400'}`}>
                {result.is_correct ? `Correct! +${result.points_awarded} points` : `Not quite — correct answer is ${result.correct_option}`}
              </p>
            </div>
          )}
        </div>

        {/* RIGHT PANEL */}
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-3 text-white font-semibold">
              <Lightbulb className="w-4.5 h-4.5 text-cyber-cyan" /> Formula Hint
            </div>
            {question.formula_hint ? (
              <div className="bg-obsidian border border-white/10 rounded-lg p-3 font-mono text-sm text-neon-violet">
                {question.formula_hint}
              </div>
            ) : (
              <button onClick={() => setShowHint(!showHint)} className="text-sm text-cyber-cyan hover:underline">
                {showHint ? 'Hide hint' : 'Reveal hint'}
              </button>
            )}
          </div>

          {result && (
            <div className="card p-6">
              <h3 className="text-white font-semibold mb-3">Step-by-Step Solution</h3>
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{result.explanation}</p>
            </div>
          )}

          <div className="card p-6">
            <div className="flex items-center gap-2 mb-3 text-white font-semibold">
              <NotebookPen className="w-4.5 h-4.5 text-cyber-cyan" /> Scratchpad
            </div>
            <textarea
              value={scratchpad}
              onChange={(e) => setScratchpad(e.target.value)}
              placeholder="Work through the problem here — not submitted, just for you."
              rows={8}
              className="input-field resize-none font-mono text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
