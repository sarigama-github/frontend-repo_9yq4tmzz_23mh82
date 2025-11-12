import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileUp, Loader2 } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function ProgressBar({ value }) {
  return (
    <div className="h-2 bg-white/10 rounded">
      <div className="h-2 bg-gradient-to-r from-blue-500 to-fuchsia-500 rounded" style={{ width: `${value}%` }} />
    </div>
  )
}

export default function PitchDeck() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!file) return
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const form = new FormData()
      form.append('file', file)
      const res = await fetch(`${API_BASE}/api/score-deck`, { method: 'POST', body: form })
      if (!res.ok) throw new Error((await res.json()).detail || 'Failed')
      const data = await res.json()
      setResult(data.scorecard)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-3xl font-bold">Pitch Deck Scorer</h1>
        <p className="text-white/70 mt-2">Upload a PDF, PPTX, or DOCX and get an instant, detailed scorecard.</p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <label className="flex items-center gap-3 p-4 rounded-lg bg-black/40 border border-white/10 cursor-pointer">
            <FileUp className="w-5 h-5" />
            <input type="file" accept=".pdf,.pptx,.docx" className="hidden" onChange={(e)=>setFile(e.target.files?.[0])} />
            {file ? file.name : 'Choose a file to upload'}
          </label>
          <button disabled={loading || !file} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white px-5 py-3 rounded-lg font-semibold disabled:opacity-60">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />} Analyze Deck
          </button>
        </form>
        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
      </div>

      <div className="space-y-4">
        {!result && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">Your scorecard will appear here.</div>
        )}
        {result && (
          <div className="space-y-4">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Overall Readiness</h3>
                  <p className="text-sm text-white/70">{result.filename}</p>
                </div>
                <div className="text-3xl font-extrabold bg-gradient-to-r from-blue-300 to-fuchsia-300 text-transparent bg-clip-text">{result.overall_score}</div>
              </div>
              <div className="mt-4 space-y-3">
                {Object.entries(result.category_scores || {}).map(([k,v]) => (
                  <div key={k}>
                    <div className="flex justify-between text-sm"><span>{k}</span><span>{v}</span></div>
                    <ProgressBar value={v} />
                  </div>
                ))}
              </div>
            </div>

            {result.suggestions?.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-semibold">Suggestions</h3>
                <ul className="list-disc pl-6 text-sm text-white/80 mt-2">
                  {result.suggestions.map((s,i)=> <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
