import { motion, useReducedMotion } from 'framer-motion'
import { floating } from '../data/portfolioData.js'
const spots = [[62, 4], [78, 22], [4, 40], [86, 52], [72, 70], [10, 14]]
export default function FloatingTechIcons() {
  const off = useReducedMotion()
  return floating.map((I, i) => (
    <motion.div key={i} className="float-ic" style={{ left: `${spots[i][0]}%`, top: `${spots[i][1]}%` }}
      animate={off ? {} : { y: [0, -10, 0] }} transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}><I size={26} /></motion.div>
  ))
}
