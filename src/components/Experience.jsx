import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { experience } from '../data/portfolioData.js'
import Reveal from './Reveal.jsx'
export default function Experience() {
  return (
    <Reveal id="experience" className="card">
      <div className="head"><div><small className="eyebrow">✦ My Journey</small><h3 className="title">Work Experience</h3></div>
        <a className="btn ghost sm" href="https://www.linkedin.com/in/sohail-shah-0570b1250/" target="_blank" rel="noreferrer">View Full Timeline <ExternalLink size={12} /></a></div>
      <ol className="timeline">
        {experience.map((e, k) => (
          <motion.li key={e.company} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: k * 0.12 }}>
            <i className="node" /><div className="tl-card"><span className="mono">{e.company[0]}</span>
              <div><div className="tl-top"><b>{e.company}</b><small>{e.when}</small></div><em>{e.role}</em><p>{e.desc}</p></div></div>
          </motion.li>
        ))}
      </ol>
    </Reveal>
  )
}
