import { MapPin, Globe, Compass, Sparkles } from 'lucide-react'
import { profile, aboutBadges, aboutInfo } from '../data/portfolioData.js'
import img from '../assets/about.png'
import Reveal from './Reveal.jsx'
const I = { pin: MapPin, globe: Globe, compass: Compass, spark: Sparkles }
export default function About() {
  return (
    <Reveal id="about" className="card about">
      <div className="about-img"><img src={img} alt="Sohail Shah portrait" /></div>
      <div className="about-body">
        <small className="eyebrow">✦ About Me</small>
        <h3>Engineer, Builder & Problem Solver</h3>
        <p>{profile.about}</p>
        <div className="tags">{aboutBadges.map((b) => <span key={b}>{b}</span>)}</div>
      </div>
      <ul className="info">{aboutInfo.map(([i, t]) => { const Ic = I[i]; return <li key={t}><Ic size={15} />{t}</li> })}</ul>
    </Reveal>
  )
}
