import React from 'react'

export default function ProgressBar({ label, percent, solved, total }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-slate-300">{label}</span>
        <span className="text-slate-500">{solved}/{total} · {percent}%</span>
      </div>
      <div className="w-full h-2.5 rounded-full bg-white/5 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-deep-purple to-cyber-cyan transition-all duration-700"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
