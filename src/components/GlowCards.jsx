import { profile } from '../data/portfolioData.js'
import Reveal from './Reveal.jsx'

const glowHues = { GitHub: 45, LinkedIn: 215, X: 0 }

export default function GlowCards() {
  const socials = profile.socials.filter((social) => social.url)

  const updateGlow = (event) => {
    const cards = event.currentTarget.querySelectorAll('.glow-card')
    cards.forEach((card) => {
      const bounds = card.getBoundingClientRect()
      card.style.setProperty('--mouse-x', `${event.clientX - bounds.left}px`)
      card.style.setProperty('--mouse-y', `${event.clientY - bounds.top}px`)
    })
  }

  return (
    <Reveal id="connect" className="glow-section">
      <div className="glow-heading">
        <small className="eyebrow">✦ Find Me Online</small>
        <h3>Let’s Connect</h3>
        <p>Follow my work and connect with me across these platforms.</p>
      </div>
      <div className="glow-cards" onPointerMove={updateGlow}>
        {socials.map(({ label, url, Icon }) => (
          <a
            className="glow-card"
            href={url}
            key={label}
            target="_blank"
            rel="noreferrer"
            style={{ '--glow-hue': glowHues[label] ?? 43 }}
          >
            <span className="glow-card-content">
              <Icon className="glow-icon" aria-hidden="true" />
              <span className="glow-name">{label}</span>
              <span className="glow-action">Visit profile <span aria-hidden="true">↗</span></span>
            </span>
          </a>
        ))}
      </div>
    </Reveal>
  )
}
