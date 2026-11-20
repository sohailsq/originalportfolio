import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
const N = 1800
function Globe({ still }) {
  const g = useRef(); const ring = useRef()
  const pos = useMemo(() => { const a = new Float32Array(N * 3); for (let i = 0; i < N; i++) { const y = 1 - (2 * (i + 0.5)) / N, r = Math.sqrt(1 - y * y), t = i * 2.399963; a.set([Math.cos(t) * r, y, Math.sin(t) * r], i * 3) } return a }, [])
  useFrame((_, d) => { if (!still) { g.current.rotation.y += d * 0.15; ring.current.rotation.z += d * 0.1 } })
  return (<>
    <group ref={g}><points><bufferGeometry><bufferAttribute attach="attributes-position" count={N} array={pos} itemSize={3} /></bufferGeometry><pointsMaterial color="#C9A86A" size={0.022} sizeAttenuation transparent opacity={0.9} /></points></group>
    <mesh ref={ring} rotation={[1.2, 0.3, 0]}><torusGeometry args={[1.45, 0.006, 8, 160]} /><meshBasicMaterial color="#DFC98A" /></mesh>
  </>)
}
const hasGL = () => { try { return !!document.createElement('canvas').getContext('webgl') } catch { return false } }
export default function Globe3D({ className = '' }) {
  const still = useReducedMotion()
  if (!hasGL()) return <div className={`globe-fallback ${className}`} />
  return <div className={`globe ${className}`}><Canvas camera={{ position: [0, 0, 3.6], fov: 45 }} dpr={[1, 1.5]} gl={{ alpha: true }}><Globe still={still} /></Canvas></div>
}
