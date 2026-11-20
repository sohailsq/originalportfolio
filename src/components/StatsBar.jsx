import { User, LayoutGrid, Cloud, Smartphone } from 'lucide-react'
import { stats } from '../data/portfolioData.js'
import Reveal from './Reveal.jsx'
const I = { user: User, grid: LayoutGrid, cloud: Cloud, phone: Smartphone }
export default function StatsBar() {
  return <Reveal className="card stats">{stats.map((s) => { const Ic = I[s.icon]; return <div key={s.big} className="stat"><Ic size={26} /><div><b>{s.big}</b><small>{s.small}</small></div></div> })}</Reveal>
}
