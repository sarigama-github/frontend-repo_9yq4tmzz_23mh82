import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Loader2 } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

function CollapsibleCard({ title, children }) {
  const [open, setOpen] = useState(true)
  return (
    <div className="border border-white/10 rounded-lg overflow-hidden bg-white/5">
      <button onClick={() => setOpen(!open)} className="w-full flex justify-between items-center px-4 py-3">
        <span className="font-semibold">{title}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-4 pb-4 text-sm text-white/80">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function IdeaValidation() {
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setResult(null)
    try {
      const res = await fetch(`${API_BASE}/api/validate-idea`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea })
      })
      if (!res.ok) throw new Error((await res.json()).detail || 'Failed')
      const data = await res.json()
      setResult(data.analysis)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div>
        <h1 className="text-3xl font-bold">Idea Validation</h1>
        <p className="text-white/70 mt-2">Paste your startup idea below and get a structured, consulting-style analysis.</p>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <textarea value={idea} onChange={(e)=>setIdea(e.target.value)} placeholder="Describe your startup idea in detail..." className="w-full h-56 p-4 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <button disabled={loading} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white px-5 py-3 rounded-lg font-semibold disabled:opacity-60">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />} Analyze with AI
          </button>
        </form>
        {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
      </div>

      <div className="space-y-3">
        {!result && (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-white/70">Your analysis will appear here.</div>
        )}
        {result && (
          <div className="space-y-3">
            <CollapsibleCard title="Summary">{result.summary}</CollapsibleCard>
            <CollapsibleCard title="Market">{result.market}</CollapsibleCard>
            <CollapsibleCard title="Target Audience">{result.target_audience}</CollapsibleCard>
            <CollapsibleCard title="Competitors">
              <ul className="list-disc pl-6">
                {result.competitors?.map((c,i)=> <li key={i}>{c}</li>)}
              </ul>
            </CollapsibleCard>
            <CollapsibleCard title="Risks">
              <ul className="list-disc pl-6">
                {result.risks?.map((c,i)=> <li key={i}>{c}</li>)}
              </ul>
            </CollapsibleCard>
            <CollapsibleCard title="Next Steps">
              <ul className="list-disc pl-6">
                {result.next_steps?.map((c,i)=> <li key={i}>{c}</li>)}
              </ul>
            </CollapsibleCard>
          </div>
        )}
      </div>
    </div>
  )
}
