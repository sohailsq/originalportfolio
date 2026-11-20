import { useEffect, useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { nav, profile } from '../data/portfolioData.js'
import ThemeToggle from './ThemeToggle.jsx'
import { downloadResume } from '../utils/resume.js'
export default function Navbar({ onHire }) {
  const [active, setActive] = useState('home'); const [open, setOpen] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-40% 0px -55% 0px' })
    nav.forEach((n) => { const el = document.getElementById(n.toLowerCase()); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  useEffect(() => {
    if (!open) return
    const closeOnEscape = (event) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [open])
  return (
    <header className="nav">
      <a href="#home" className="brand" aria-label={`${profile.name} home`}>
        <img className="brand-logo" src="/brand-mark.png" alt="Sohail Shah" />
      </a>
      <nav id="primary-navigation" aria-label="Primary navigation" className={open ? 'links open' : 'links'}>
        {nav.map((n) => <a key={n} href={`#${n.toLowerCase()}`} onClick={() => setOpen(false)} className={active === n.toLowerCase() ? 'on' : ''}>{n}</a>)}
      </nav>
      <div className="navr"><ThemeToggle />
        <button className="btn hire-trigger" onClick={() => { setOpen(false); onHire() }} type="button">
          <span className="hire-availability" />
          Hire Me
        </button>
        <button className="btn solid sm" onClick={downloadResume} type="button">Resume <ArrowUpRight size={13} /></button>
        <button className="burger" onClick={() => setOpen(!open)} type="button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="primary-navigation">{open ? <X size={20} /> : <Menu size={20} />}</button>
      </div>
    </header>
  )
}
