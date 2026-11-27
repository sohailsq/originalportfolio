import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, CalendarDays, Check, Clock3, Send, X } from 'lucide-react'
import { profile } from '../data/portfolioData.js'
import { freelanceSettings } from '../data/freelanceConfig.js'
import workingPortrait from '../assets/Focused Developer Coding with Laptop Stickers.png'
import ProjectPackageModal from './ProjectPackageModal.jsx'
import './FreelanceModal.css'

export default function FreelanceModal({ open, onClose }) {
  const [selectedService, setSelectedService] = useState(freelanceSettings.services[0].id)
  const [selectedPackage, setSelectedPackage] = useState('')
  const [activePackage, setActivePackage] = useState(null)
  const [inquiryOpen, setInquiryOpen] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', budget: '', timeline: '', description: '' })
  const dialogRef = useRef(null)
  const firstFieldRef = useRef(null)
  const inquiryRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const service = freelanceSettings.services.find((item) => item.id === selectedService)
  const selectedPackageData = freelanceSettings.packages.find((item) => item.id === selectedPackage)
  const transition = reducedMotion ? { duration: 0 } : { duration: 0.28, ease: 'easeOut' }

  useEffect(() => {
    if (!open) return undefined

    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const frame = window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector('[data-modal-close]')?.focus()
    })

    const handleKeyDown = (event) => {
      if (document.querySelector('.package-detail-dialog')) return

      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = [...dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
      )].filter((element) => element.getClientRects().length > 0)
      if (focusable.length === 0) return

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

  useEffect(() => {
    if (open) return
    setSelectedService(freelanceSettings.services[0].id)
    setSelectedPackage('')
    setActivePackage(null)
    setInquiryOpen(false)
    setForm({ name: '', email: '', budget: '', timeline: '', description: '' })
  }, [open])

  useEffect(() => {
    if (!inquiryOpen || !open) return undefined
    const frame = window.requestAnimationFrame(() => {
      inquiryRef.current?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'center' })
      firstFieldRef.current?.focus({ preventScroll: true })
    })
    return () => window.cancelAnimationFrame(frame)
  }, [inquiryOpen, open, reducedMotion])

  const openInquiry = () => setInquiryOpen(true)
  const closePackageDetails = useCallback(() => setActivePackage(null), [])

  const selectPackage = (item) => {
    setActivePackage(null)
    setSelectedPackage(item.id)
    setForm((current) => ({
      ...current,
      budget: item.budget,
      timeline: item.duration,
      description: `I'm interested in the ${item.title} package for a ${service.shortTitle} project.\n\nProject goals:\n`,
    }))
    openInquiry()
  }

  const selectService = (item) => {
    setSelectedService(item.id)
    setForm((current) => ({
      ...current,
      description: current.description
        ? current.description.replace(/for a .+? project\./, `for a ${item.shortTitle} project.`)
        : current.description,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const subject = `Freelance inquiry: ${selectedPackageData?.title ?? 'Custom project'} — ${service.title}`
    const message = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Service: ${service.title}`,
      `Package: ${selectedPackageData?.title ?? 'Custom requirements'}`,
      `Budget: ${form.budget}`,
      `Expected timeline: ${form.timeline}`,
      '',
      'Project description:',
      form.description,
    ].join('\n')
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="freelance-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
          onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
          <motion.div
            ref={dialogRef}
            className="freelance-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="freelance-title"
            aria-describedby="freelance-description"
            initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.985 }}
            transition={transition}
          >
            <button className="freelance-close" type="button" onClick={onClose} aria-label="Close dialog" data-modal-close>
              <X size={19} />
            </button>

            <div className="freelance-content">
              <header className="freelance-header">
                <span className="freelance-availability"><i />Available for Freelance Projects</span>
                <div className="freelance-title-row">
                  <div className="freelance-handshake" aria-hidden="true">✦</div>
                  <div>
                    <h2 id="freelance-title">Let’s Work Together</h2>
                    <p id="freelance-description">
                      I’m available for freelance projects and can help you build, deploy, and scale your ideas — from modern websites and mobile applications to DevOps and cloud deployments.
                    </p>
                  </div>
                  <span className="freelance-signature">Sohail Shah</span>
                </div>
              </header>

              <section className="freelance-section" aria-labelledby="freelance-services-title">
                <div className="freelance-section-heading">
                  <h3 id="freelance-services-title">Services</h3>
                  <span>Select an area to explore</span>
                </div>
                <div className="freelance-services" role="group" aria-label="Freelance services">
                  {freelanceSettings.services.map(({ id, title, Icon }) => (
                    <button
                      className={`freelance-service ${selectedService === id ? 'selected' : ''}`}
                      key={id}
                      type="button"
                      aria-pressed={selectedService === id}
                      onClick={() => selectService(freelanceSettings.services.find((item) => item.id === id))}
                    >
                      <Icon size={15} />
                      <span>{title}</span>
                    </button>
                  ))}
                </div>
                <motion.div
                  className="freelance-service-detail"
                  key={selectedService}
                  initial={reducedMotion ? false : { opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: reducedMotion ? 0 : 0.2 }}
                  aria-live="polite"
                >
                  <strong>{service.technologies}</strong>
                  <span>{service.description}</span>
                </motion.div>
              </section>

              <section className="freelance-section process-section" aria-labelledby="freelance-process-title">
                <div className="freelance-section-heading">
                  <h3 id="freelance-process-title">My Working Process</h3>
                </div>
                <ol className="freelance-process">
                  {freelanceSettings.process.map(({ title, description, Icon }, index) => (
                    <li className="process-step" key={title} style={{ '--step-index': index }}>
                      <span className="process-icon"><Icon size={16} /></span>
                      <strong>{title}</strong>
                      <span>{description}</span>
                    </li>
                  ))}
                </ol>
              </section>

              <section className="freelance-section packages-section" aria-labelledby="freelance-packages-title">
                <div className="freelance-section-heading package-heading">
                  <h3 id="freelance-packages-title">Project Packages</h3>
                  <button className="custom-inquiry-link" type="button" onClick={() => {
                    setSelectedPackage('')
                    setForm((current) => ({ ...current, budget: '', timeline: '', description: '' }))
                    openInquiry()
                  }}>
                    Custom requirements? Let’s discuss <ArrowRight size={13} />
                  </button>
                </div>
                <div className="freelance-packages">
                  {freelanceSettings.packages.map((item) => {
                    const Icon = item.Icon
                    return (
                      <button
                        className={`freelance-package package-${item.id} ${item.recommended ? 'recommended' : ''} ${selectedPackage === item.id ? 'chosen' : ''}`}
                        key={item.id}
                        type="button"
                        aria-haspopup="dialog"
                        aria-label={`View ${item.title} package details`}
                        onClick={() => setActivePackage(item)}
                      >
                        {item.recommended && <span className="recommended-label">Recommended</span>}
                        <span className="package-title"><Icon size={16} />{item.title}</span>
                        <span className="package-description">{item.description}</span>
                        <span className="package-meta"><Clock3 size={13} />{item.duration}</span>
                        <span className="package-budget">{item.budget}</span>
                      </button>
                    )
                  })}
                </div>
                <p className="pricing-note">Illustrative EUR estimates only. Final scope, pricing and timeline are agreed after discussion.</p>
              </section>

              <section className="freelance-benefits" aria-label="Client benefits">
                {freelanceSettings.benefits.map(({ title, Icon }) => (
                  <span className="benefit-chip" key={title}><Icon size={13} />{title}</span>
                ))}
              </section>

              <div className="freelance-actions">
                <button className="freelance-primary" type="button" onClick={openInquiry}>
                  <Send size={15} />Start a Project<ArrowRight size={15} />
                </button>
                {freelanceSettings.bookingUrl ? (
                  <a className="freelance-secondary" href={freelanceSettings.bookingUrl} target="_blank" rel="noreferrer">
                    <CalendarDays size={15} />Book a Free Call
                  </a>
                ) : (
                  <button className="freelance-secondary" type="button" disabled title="Add your booking URL in freelanceSettings.bookingUrl">
                    <CalendarDays size={15} />Book a Free Call
                  </button>
                )}
              </div>
              <p className="reply-time"><i />Typically reply within 24 hours</p>

              <AnimatePresence initial={false}>
                {inquiryOpen && (
                  <motion.section
                    ref={inquiryRef}
                    className="inquiry-panel"
                    aria-labelledby="inquiry-title"
                    initial={reducedMotion ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: reducedMotion ? 0 : 0.25 }}
                  >
                    <div className="inquiry-heading">
                      <div><h3 id="inquiry-title">Tell me about your project</h3><p>Your email app will open with the inquiry ready to send.</p></div>
                      <button type="button" className="inquiry-close" aria-label="Close inquiry form" onClick={() => setInquiryOpen(false)}><X size={16} /></button>
                    </div>
                    {selectedPackageData && (
                      <div className="selected-package-note"><Check size={14} />{selectedPackageData.title} selected · {selectedPackageData.budget} · {selectedPackageData.duration}</div>
                    )}
                    <form className="inquiry-form" onSubmit={handleSubmit}>
                      <label>Name<input ref={firstFieldRef} autoComplete="name" required value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
                      <label>Email<input type="email" autoComplete="email" required value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
                      <label>Project type
                        <select value={selectedService} onChange={(event) => selectService(freelanceSettings.services.find((item) => item.id === event.target.value))}>
                          {freelanceSettings.services.map((item) => <option value={item.id} key={item.id}>{item.title}</option>)}
                        </select>
                      </label>
                      <label>Budget<input required value={form.budget} onChange={(event) => setForm({ ...form, budget: event.target.value })} placeholder="e.g. ₹30,000–₹60,000" /></label>
                      <label>Expected timeline<input required value={form.timeline} onChange={(event) => setForm({ ...form, timeline: event.target.value })} placeholder="e.g. 2–3 weeks" /></label>
                      <label className="inquiry-description">Project description<textarea required rows="4" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} placeholder="What are you looking to build?" /></label>
                      <button className="freelance-primary inquiry-submit" type="submit"><Send size={15} />Continue with Email</button>
                    </form>
                  </motion.section>
                )}
              </AnimatePresence>
            </div>

            <aside className="freelance-visual" aria-label="Sohail working on a laptop">
              <img src={workingPortrait} alt="Sohail Shah working on a laptop in his developer workspace" />
              <div className="visual-light visual-light-gold" />
              <div className="visual-light visual-light-purple" />
              <div className="visual-caption">
                <span className="visual-caption-mark"><Check size={13} /></span>
                <span><strong>Thoughtful work. Built to last.</strong><small>From first idea to live deployment.</small></span>
              </div>
            </aside>
            <ProjectPackageModal
              packageData={activePackage}
              onClose={closePackageDetails}
              onChoose={selectPackage}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
