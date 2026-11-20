import { motion, useReducedMotion } from 'framer-motion'
export default function Reveal({ id, className = '', children, delay = 0 }) {
  const off = useReducedMotion()
  return (
    <motion.section id={id} className={className} initial={off ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-60px' }} transition={{ duration: 0.6, delay }}>
      {children}
    </motion.section>
  )
}
