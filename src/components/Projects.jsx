import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { projects } from '../data/portfolioData.js'
import Reveal from './Reveal.jsx'
export default function Projects() {
  const ref = useRef(); const [i, setI] = useState(0)
  const go = (n) => { const el = ref.current, c = el.children[Math.max(0, Math.min(projects.length - 1, n))]; el.scrollTo({ left: c.offsetLeft - el.offsetLeft, behavior: 'smooth' }) }
  const onScroll = (e) => { const el = e.currentTarget; setI(Math.round(el.scrollLeft / (el.scrollWidth / projects.length))) }
  return (
    <Reveal id="projects" className="card">
      <div className="head"><div><small className="eyebrow">✦ Featured Projects</small><h3 className="title">Real-World Projects</h3>
        <p className="sub">A selection of products I’ve built, from trading platforms to 3D web experiences.</p></div>
        <a className="btn ghost sm" href="https://github.com/sohailsq?tab=repositories" target="_blank" rel="noreferrer">View All Projects <ExternalLink size={12} /></a></div>
      <div className="carousel-wrap">
        <button className="arrow l" onClick={() => go(i - 1)} aria-label="Previous"><ArrowLeft size={14} /></button>
        <div className="carousel" ref={ref} onScroll={onScroll}>
          {projects.map((p) => (
            <article className="proj" key={p.title}>
              <div className="preview"><span className="chip">{p.tag}</span><img src={p.image} alt={`${p.title} project preview`} /></div>
              <div className="pb"><h4>{p.title}<span className="project-links">
                {p.playStore && <a href={p.playStore} target="_blank" rel="noreferrer" aria-label={`Open ${p.title} on Google Play`} title="Google Play">Play Store</a>}
                <a href={p.url} target="_blank" rel="noreferrer" aria-label={`Open ${p.title}`}><ExternalLink size={14} /></a>
              </span></h4>
                <p>{p.desc}</p><div className="tags sm">{p.tech.map((t) => <span key={t}>{t}</span>)}</div></div>
            </article>
          ))}
        </div>
        <button className="arrow r" onClick={() => go(i + 1)} aria-label="Next"><ArrowRight size={14} /></button>
      </div>
      <div className="dots">{projects.map((_, k) => <i key={k} className={k === i ? 'on' : ''} onClick={() => go(k)} />)}</div>
    </Reveal>
  )
}
