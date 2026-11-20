import { useCallback, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import StatsBar from './components/StatsBar.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import DevOpsPipeline from './components/DevOpsPipeline.jsx'
import Contact from './components/Contact.jsx'
import GlowCards from './components/GlowCards.jsx'
import FreelanceModal from './components/FreelanceModal.jsx'
import ProjectsModal from './components/ProjectsModal.jsx'
export default function App() {
  const [hireOpen, setHireOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)
  const closeHireModal = useCallback(() => setHireOpen(false), [])
  const closeProjectsModal = useCallback(() => setProjectsOpen(false), [])

  return (
    <>
      <div className="page">
        <div className="col left"><Navbar onHire={() => setHireOpen(true)} /><Hero onViewProjects={() => setProjectsOpen(true)} /><StatsBar /><About /><Skills /></div>
        <div className="col right"><Projects /><Experience /><DevOpsPipeline /><Contact /><GlowCards /></div>
      </div>
      <FreelanceModal open={hireOpen} onClose={closeHireModal} />
      <ProjectsModal open={projectsOpen} onClose={closeProjectsModal} />
    </>
  )
}
