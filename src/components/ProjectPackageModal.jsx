import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Check, Clock3, X } from 'lucide-react'
import './ProjectPackageModal.css'

function PackageSection({ title, children, index }) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.section
      className="package-detail-section"
      initial={reducedMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.3, delay: reducedMotion ? 0 : index * 0.06 }}
      aria-label={title}
    >
      <h3>{title}</h3>
      {children}
    </motion.section>
  )
}

function DetailList({ items }) {
  return (
    <ul className="package-detail-list">
      {items.map((item) => {
        const title = typeof item === 'string' ? item : item.title
        const description = typeof item === 'string' ? null : item.description

        return (
          <li key={title}>
            <Check size={15} aria-hidden="true" />
            <span><strong>{title}</strong>{description && <span>{description}</span>}</span>
          </li>
        )
      })}
    </ul>
  )
}

export default function ProjectPackageModal({ packageData, onClose, onChoose }) {
  const dialogRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (!packageData) return undefined

    const previousFocus = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const frame = window.requestAnimationFrame(() => {
      dialogRef.current?.querySelector('[data-package-close]')?.focus()
    })
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        event.stopPropagation()
        onClose()
        return
      }

      if (event.key !== 'Tab' || !dialogRef.current) return
      const focusable = [...dialogRef.current.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )].filter((element) => element.getClientRects().length > 0)
      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        event.stopPropagation()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        event.stopPropagation()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown, true)
    return () => {
      window.cancelAnimationFrame(frame)
      document.removeEventListener('keydown', handleKeyDown, true)
      document.body.style.overflow = previousOverflow
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [packageData, onClose])

  const Icon = packageData?.Icon

  return createPortal(
    <AnimatePresence>
      {packageData && (
        <motion.div
          className="package-detail-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.22 }}
          onMouseDown={(event) => event.target === event.currentTarget && onClose()}
        >
          <motion.div
            ref={dialogRef}
            className={`package-detail-dialog package-detail-${packageData.id}`}
            role="dialog"
            aria-modal="true"
            aria-labelledby="package-detail-title"
            initial={reducedMotion ? false : { opacity: 0, y: 22, scale: 0.975 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 14, scale: 0.985 }}
            transition={{ duration: reducedMotion ? 0 : 0.26, ease: 'easeOut' }}
          >
            <header className="package-detail-header">
              <div className="package-detail-heading">
                <span className="package-detail-icon" aria-hidden="true"><Icon size={20} /></span>
                <div>
                  <span className="package-detail-category">{packageData.category}</span>
                  <h2 id="package-detail-title">{packageData.title} Package</h2>
                </div>
              </div>
              <button
                className="package-detail-close"
                type="button"
                onClick={onClose}
                aria-label="Close package details"
                data-package-close
              >
                <X size={19} />
              </button>
            </header>

            <div className="package-detail-scroll">
              <div className="package-detail-intro">
                <p>{packageData.introduction}</p>
                <span><Clock3 size={15} />Typical delivery: {packageData.duration}</span>
              </div>

              <PackageSection title="Package overview" index={0}>
                <p className="package-detail-copy">{packageData.detailedDescription}</p>
                <div className="package-detail-audience">
                  <span>Ideal for</span>
                  <p>{packageData.audience}</p>
                </div>
                <h4>Key benefits</h4>
                <DetailList items={packageData.benefits} />
              </PackageSection>

              <PackageSection title="What’s included" index={1}>
                <DetailList items={packageData.included} />
                <h4>Deliverables</h4>
                <DetailList items={packageData.deliverables} />
                <h4>Tools & technologies</h4>
                <div className="package-detail-tags">
                  {packageData.tools.map((tool) => <span key={tool}>{tool}</span>)}
                </div>
              </PackageSection>

              <PackageSection title="Pricing & timeline" index={2}>
                <div className="package-detail-price">
                  <span>Estimated project budget</span>
                  <strong>{packageData.budget}</strong>
                  <small>{packageData.pricingModel}</small>
                </div>
                <div className="package-detail-audience">
                  <span>Additional charges</span>
                  <p>{packageData.additionalCharges}</p>
                </div>
              </PackageSection>

              <PackageSection title="Why choose this package?" index={3}>
                <p className="package-detail-copy">{packageData.whyChoose}</p>
              </PackageSection>
            </div>

            <footer className="package-detail-footer">
              <p>Final scope, pricing, and delivery dates are confirmed together.</p>
              <button className="package-detail-cta" type="button" onClick={() => onChoose(packageData)}>
                Choose {packageData.title}<ArrowRight size={16} />
              </button>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
