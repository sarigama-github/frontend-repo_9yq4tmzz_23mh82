import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import IdeaValidation from './pages/IdeaValidation'
import PitchDeck from './pages/PitchDeck'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Contact from './pages/Contact'
import Layout from './components/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/validate" element={<IdeaValidation />} />
        <Route path="/score" element={<PitchDeck />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Layout>
  )
}

export default App
