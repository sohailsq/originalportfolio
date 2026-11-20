import { Mail, ArrowUpRight } from 'lucide-react'
import { profile } from '../data/portfolioData.js'
import Reveal from './Reveal.jsx'
import Globe3D from './Globe3D.jsx'
export default function Contact() {
  const mail = `mailto:${profile.email}`
  return (
    <Reveal id="contact" className="card contact">
      <div className="ct">
        <small className="eyebrow">✦ Get in Touch</small>
        <h3>Let’s Build<br />Something Together</h3>
        <p>Have a project, opportunity, or idea? I’d love to talk!</p>
        <div className="row">
          <a className="btn solid" href={`${mail}?subject=${encodeURIComponent('Hello Sohail')}`}>Send a Message <ArrowUpRight size={14} /></a>
          <a className="btn ghost" href={mail}><Mail size={14} />{profile.email}</a>
        </div>
      </div>
      <Globe3D className="contact-globe" />
    </Reveal>
  )
}
