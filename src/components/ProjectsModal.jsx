import { useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ExternalLink, Github, X } from 'lucide-react'
import { projects, profile } from '../data/portfolioData.js'
import './ProjectsModal.css'

export default function ProjectsModal({ open, onClose }) {
  const dialogRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!open) return undefined

    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const frame = window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector('[data-projects-close]')?.focus()
    })

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = [...dialogRef.current.querySelectorAll('a[href], button:not([disabled])')]
        .filter((element) => element.getClientRects().length > 0)
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
      previousFocus?.focus?.()
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="projects-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.22 }}
          onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
          <motion.section
            ref={dialogRef}
            className="projects-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="projects-modal-title"
            initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.99 }}
            transition={{ duration: reducedMotion ? 0 : 0.24, ease: 'easeOut' }}
          >
            <header className="projects-modal-header">
              <div>
                <small className="eyebrow">✦ Selected Work</small>
                <h2 id="projects-modal-title">Projects I’ve Built</h2>
                <p>A selection of live products and interactive experiences.</p>
              </div>
              <a className="projects-github-link" href="https://github.com/sohailsq?tab=repositories" target="_blank" rel="noreferrer">
                <Github size={16} />GitHub Repositories<ArrowUpRight size={14} />
              </a>
              <button className="projects-modal-close" type="button" onClick={onClose} aria-label="Close projects" data-projects-close>
                <X size={19} />
              </button>
            </header>
            <div className="projects-modal-grid">
              {projects.map((project) => (
                <article className="projects-modal-card" key={project.title}>
                  <a className="projects-modal-image" href={project.url} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title}`}>
                    <img src={project.image} alt={`${project.title} project preview`} />
                    <span>{project.tag}</span>
                  </a>
                  <div className="projects-modal-card-content">
                    <h3>{project.title}</h3>
                    <p>{project.desc}</p>
                    <div className="projects-modal-tech">{project.tech.map((item) => <span key={item}>{item}</span>)}</div>
                    <div className="projects-modal-links">
                      <a href={project.url} target="_blank" rel="noreferrer">View Project<ExternalLink size={13} /></a>
                      {project.playStore && <a href={project.playStore} target="_blank" rel="noreferrer">Play Store<ArrowUpRight size={13} /></a>}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <footer className="projects-modal-footer">
              <span>Have an idea in mind?</span>
              <a href={`mailto:${profile.email}?subject=${encodeURIComponent('Project inquiry')}`}>Let’s build it together<ArrowUpRight size={13} /></a>
            </footer>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
