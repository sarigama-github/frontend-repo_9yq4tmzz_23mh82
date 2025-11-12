import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Brain, BarChart3, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="space-y-20">
      <section className="text-center pt-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-200 to-fuchsia-200 bg-clip-text text-transparent"
        >
          Validate. Improve. Launch Smarter.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-4 text-white/70 max-w-2xl mx-auto"
        >
          StartupMate uses Gemini AI to deliver deep insights on your startup idea and pitch deck — from market and audience to risks and next steps.
        </motion.p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link to="/validate" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-fuchsia-600 text-white px-5 py-3 rounded-lg font-semibold shadow hover:shadow-lg transition">
            Validate an idea <ArrowRight className="w-4 h-4" />
          </Link>
          <Link to="/score" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold border border-white/20 hover:bg-white/5 transition">
            Score a pitch deck
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        {[{icon: Brain, title: 'How it works', text: 'We analyze your input with Gemini AI and return a structured, actionable report.'},{icon: BarChart3, title: 'Why choose us', text: 'Clear, founder-friendly insights with a premium, futuristic interface.'},{icon: CheckCircle2, title: 'Outcomes', text: 'Know your readiness, gaps, and next steps to move faster with confidence.'}].map((item, i) => (
          <motion.div key={i} initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{ once: true }} transition={{ duration: 0.5, delay: i*0.1 }} className="rounded-xl border border-white/10 bg-white/5 p-6">
            <item.icon className="w-6 h-6 text-fuchsia-300" />
            <h3 className="mt-3 font-semibold">{item.title}</h3>
            <p className="text-sm text-white/70 mt-1">{item.text}</p>
          </motion.div>
        ))}
      </section>

      <section className="rounded-2xl p-8 bg-gradient-to-br from-blue-600/20 to-fuchsia-600/20 border border-white/10">
        <h2 className="text-xl font-semibold">Built for founders at any stage</h2>
        <p className="text-white/70 max-w-3xl mt-2">From a napkin idea to a polished deck, StartupMate gives you a guided, gamified path to clarity. Smooth animations keep the flow immersive and delightful.</p>
      </section>
    </div>
  )
}
