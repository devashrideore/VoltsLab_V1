import React from 'react'
import { Link } from 'react-router-dom'
import { Zap, BookOpen, Target, BarChart3, TrendingUp, ArrowRight } from 'lucide-react'

const FEATURES = [
  { icon: BookOpen, title: 'Learn', desc: 'Concise formula hints and step-by-step derivations for every EEE concept.' },
  { icon: Target, title: 'Practice', desc: '8 core topics, Theory & Numerical MCQs, three difficulty tiers.' },
  { icon: BarChart3, title: 'Analyze', desc: 'Subject mastery breakdown so you know exactly where to focus.' },
  { icon: TrendingUp, title: 'Improve', desc: 'Streaks, accuracy tracking, and a global leaderboard to stay sharp.' },
]

export default function Home() {
  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-violet/30 bg-neon-violet/5 text-cyber-cyan text-xs font-mono mb-6">
            <Zap className="w-3.5 h-3.5" /> 8 TOPICS · THEORY + NUMERICAL MCQs
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
            Volts Lab: Master <span className="bg-gradient-to-r from-neon-violet to-cyber-cyan bg-clip-text text-transparent">Electrical Engineering</span> Through Practice
          </h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
            A LeetCode-style practice ground built for EEE students and engineers — circuits,
            machines, power electronics, control systems and more, one MCQ at a time.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/problems" className="btn-primary flex items-center justify-center gap-2 text-base">
              Start Practicing <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/problems" className="btn-secondary flex items-center justify-center gap-2 text-base">
              Explore Topics
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card p-6 hover:border-neon-violet/40 hover:shadow-glow transition">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-deep-purple to-neon-violet flex items-center justify-center mb-4">
                <Icon className="w-5.5 h-5.5 text-white" />
              </div>
              <h3 className="text-white font-semibold mb-1.5">{title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
