import React, { useEffect, useState } from 'react'
import { Award, TrendingUp, Lightbulb, FileBarChart } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function Badge({ label }) {
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10">
      <Award className="w-3 h-3 text-amber-300" /> {label}
    </span>
  )
}

export default function Dashboard() {
  const [data, setData] = useState({ ideas: [], decks: [] })

  useEffect(() => {
    fetch(`${API_BASE}/api/reports`).then(r=>r.json()).then(setData).catch(()=>{})
  }, [])

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Your Analyses</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-300" />
            <h2 className="font-semibold">Ideas</h2>
          </div>
          <div className="mt-4 space-y-3">
            {data.ideas.length === 0 && <p className="text-white/60 text-sm">No idea analyses yet.</p>}
            {data.ideas.map((it, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-black/30 border border-white/10">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/80 line-clamp-2 max-w-xl">{it.idea}</p>
                  {typeof it.score_overall === 'number' && (
                    <span className="text-lg font-bold">{it.score_overall}</span>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge label="Analyzed" />
                  <Badge label="Insights Ready" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6">
          <div className="flex items-center gap-2">
            <FileBarChart className="w-5 h-5 text-blue-300" />
            <h2 className="font-semibold">Pitch Decks</h2>
          </div>
          <div className="mt-4 space-y-3">
            {data.decks.length === 0 && <p className="text-white/60 text-sm">No deck analyses yet.</p>}
            {data.decks.map((it, idx) => (
              <div key={idx} className="p-4 rounded-lg bg-black/30 border border-white/10">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-white/80">{it.filename}</p>
                  {typeof it.overall_score === 'number' && (
                    <span className="text-lg font-bold">{it.overall_score}</span>
                  )}
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge label="Scored" />
                  <Badge label="Recommendations" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
