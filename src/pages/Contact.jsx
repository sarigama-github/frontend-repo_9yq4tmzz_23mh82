import React, { useState } from 'react'
import { Loader2 } from 'lucide-react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || ''

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')
    try {
      const res = await fetch(`${API_BASE}/api/contact`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('Failed')
      setStatus('Thanks! We will get back to you shortly.')
      setForm({ name: '', email: '', message: '' })
    } catch (e) {
      setStatus('Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="text-white/70 mt-2">Reach out for support, feedback, or collaboration.</p>
      <form onSubmit={submit} className="mt-6 space-y-3 max-w-xl">
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Name" className="w-full p-3 rounded-lg bg-black/40 border border-white/10" />
        <input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="Email" className="w-full p-3 rounded-lg bg-black/40 border border-white/10" />
        <textarea value={form.message} onChange={e=>setForm({...form, message:e.target.value})} placeholder="Message" className="w-full h-36 p-3 rounded-lg bg-black/40 border border-white/10" />
        <button disabled={loading} className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white px-5 py-3 rounded-lg font-semibold disabled:opacity-60">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />} Send
        </button>
      </form>
      <div className="mt-4 text-sm text-white/70">{status}</div>
      <div className="mt-8 text-sm text-white/60">Follow us on X/Twitter, LinkedIn, and join our founder community on Discord.</div>
    </div>
  )
}
