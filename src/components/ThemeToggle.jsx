import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'
export default function ThemeToggle() {
  const [t, setT] = useState(() => { try { return localStorage.getItem('theme') || 'dark' } catch { return 'dark' } })
  const flip = () => { const n = t === 'dark' ? 'light' : 'dark'; setT(n); document.documentElement.dataset.theme = n; try { localStorage.setItem('theme', n) } catch {} }
  if (document.documentElement.dataset.theme !== t) document.documentElement.dataset.theme = t
  return <button className="theme" onClick={flip} aria-label="Toggle theme">{t === 'dark' ? <Moon size={15} /> : <Sun size={15} />}</button>
}
