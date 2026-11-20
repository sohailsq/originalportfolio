import { motion } from 'framer-motion'
import { ArrowUpRight, Download } from 'lucide-react'
import { profile } from '../data/portfolioData.js'
import heroImg from '../assets/hero.png'
import Globe3D from './Globe3D.jsx'
import FloatingTechIcons from './FloatingTechIcons.jsx'
import { downloadResume } from '../utils/resume.js'
export default function Hero({ onViewProjects }) {
  return (
    <section id="home" className="hero">
      <motion.div className="hero-text" initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
        <span className="badge"><i className="dot" />Available for Opportunities</span>
        <h1>Hi, I’m<br /><span>Sohail</span> <em>Shah</em></h1>
        <h2>{profile.role}</h2>
        <p>{profile.bio}</p>
        <div className="row">
          <button className="btn solid" onClick={onViewProjects} type="button">View Projects <ArrowUpRight size={15} /></button>
          <button className="btn ghost" onClick={downloadResume} type="button">Download Resume <Download size={15} /></button>
        </div>
        <div className="socials">{profile.socials.filter((s) => s.url).map(({ label, url, Icon }) => <a key={label} href={url} target="_blank" rel="noreferrer" aria-label={label}><Icon size={19} /></a>)}</div>
      </motion.div>
      <motion.div className="hero-art" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.15 }}>
        <Globe3D className="hero-globe" />
        <img src={heroImg} alt="Sohail Shah in his developer workspace" />
        <FloatingTechIcons />
      </motion.div>
    </section>
  )
}
