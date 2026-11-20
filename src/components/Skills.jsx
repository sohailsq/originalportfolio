import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { skills, skillFilters } from '../data/portfolioData.js'
import Reveal from './Reveal.jsx'
export default function Skills() {
  const [f, setF] = useState('All')
  const list = skills.filter((s) => f === 'All' || s[1] === f)
  return (
    <Reveal id="skills" className="card">
      <small className="eyebrow">✦ My Toolbox</small>
      <h3 className="title">Skills & Technologies</h3>
      <p className="sub">Technologies I use to build, deploy, and scale real-world applications.</p>
      <div className="filters">{skillFilters.map((k) => <button key={k} className={f === k ? 'on' : ''} onClick={() => setF(k)}>{k}</button>)}</div>
      <motion.div layout className="skill-grid">
        <AnimatePresence mode="popLayout">
          {list.map(([n, , Ic]) => (
            <motion.div layout key={n} className="skill" initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.85 }} whileHover={{ y: -4 }}>
              <Ic size={30} /><span>{n}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Reveal>
  )
}
