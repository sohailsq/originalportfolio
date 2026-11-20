import { Fragment } from 'react'
import { ArrowRight } from 'lucide-react'
import { pipeline } from '../data/portfolioData.js'
import Reveal from './Reveal.jsx'
export default function DevOpsPipeline() {
  return (
    <Reveal id="devops" className="card">
      <small className="eyebrow">✦ Deployment & DevOps</small>
      <h3 className="title">Production Deployment Pipeline</h3>
      <p className="sub">From code to production – an automated, containerized, and scalable workflow.</p>
      <div className="pipe">
        {pipeline.map(({ name, sub, Icon, tip }, k) => (
          <Fragment key={name}>
            <div className="step" title={tip} tabIndex={0}><Icon size={28} /><b>{name}</b><small>{sub}</small><span className="tip">{tip}</span></div>
            {k < pipeline.length - 1 && <ArrowRight className="pa" size={16} />}
          </Fragment>
        ))}
      </div>
    </Reveal>
  )
}
