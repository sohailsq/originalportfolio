import { jsPDF } from 'jspdf'

export function downloadResume() {
  const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' })
  const pageWidth = 210
  const gold = [201, 168, 106]
  const ink = [24, 26, 29]
  const muted = [105, 108, 112]

  doc.setFillColor(...ink)
  doc.rect(0, 0, pageWidth, 49, 'F')
  doc.setFillColor(...gold)
  doc.rect(0, 49, pageWidth, 2, 'F')

  doc.setTextColor(247, 244, 236)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(25)
  doc.text('SOHAIL SHAH', 14, 21)
  doc.setFontSize(10)
  doc.setTextColor(...gold)
  doc.text('SOFTWARE ENGINEER  |  FULL-STACK DEVELOPER', 14, 29)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.setTextColor(200, 200, 196)
  doc.text('Hyderabad, India  |  mohammadsohailshahquadri14@gmail.com', 14, 37)
  doc.text('github.com/sohailsq  |  linkedin.com/in/sohail-shah-0570b1250', 14, 43)

  const leftX = 14
  const leftWidth = 55
  const rightX = 76
  const rightWidth = 120

  doc.setTextColor(...ink)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('PROFILE', leftX, 62)
  doc.setDrawColor(...gold)
  doc.setLineWidth(0.7)
  doc.line(leftX, 65, leftX + leftWidth, 65)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8.5)
  doc.setTextColor(...muted)
  const profileLines = doc.splitTextToSize(
    'Software engineer focused on scalable web, mobile and cloud-native applications. Experienced in building polished products and reliable CI/CD deployments.',
    leftWidth,
  )
  doc.text(profileLines, leftX, 71)

  doc.setTextColor(...ink)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('CORE SKILLS', leftX, 96)
  doc.setDrawColor(...gold)
  doc.line(leftX, 99, leftX + leftWidth, 99)

  const skills = [
    ['Frontend', 'React, Next.js, Vite, Tailwind'],
    ['Backend', 'Node.js, Express, REST APIs'],
    ['Mobile', 'React Native, Expo, Flutter'],
    ['Cloud / DevOps', 'AWS, Docker, Jenkins, GitHub Actions'],
    ['Database', 'MongoDB, MySQL'],
    ['3D / UI', 'Three.js, WebGL, UI/UX'],
  ]
  let skillY = 105
  skills.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.5)
    doc.setTextColor(...ink)
    doc.text(label, leftX, skillY)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(...muted)
    doc.text(doc.splitTextToSize(value, leftWidth), leftX, skillY + 4)
    skillY += 14
  })

  doc.setTextColor(...ink)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('EXPERIENCE', rightX, 62)
  doc.setDrawColor(...gold)
  doc.line(rightX, 65, rightX + rightWidth, 65)

  const experience = [
    ['Veedly', 'Software Developer', 'May 2025 - Present',
      'Develop and maintain web and mobile applications using Next.js, JavaScript, TypeScript and Flutter.'],
    ['Nafa Barter', 'Frontend Developer', 'May 2025 - Apr 2026',
      'Built interactive frontend experiences for the JetFyx trading platform using modern JavaScript practices.'],
    ['Bitstek Consultancy', 'Software Engineer Intern', 'Sep 2024 - Apr 2025',
      'Contributed to real-world web development and CRM and Howzdat mobile application work.'],
  ]

  let expY = 72
  experience.forEach(([company, role, date, detail]) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(...ink)
    doc.text(company, rightX, expY)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.5)
    doc.setTextColor(...muted)
    doc.text(date, rightX + rightWidth, expY, { align: 'right' })
    doc.setTextColor(...gold)
    doc.setFontSize(8.5)
    doc.text(role, rightX, expY + 5)
    doc.setTextColor(...muted)
    doc.setFontSize(8)
    doc.text(doc.splitTextToSize(detail, rightWidth), rightX, expY + 10)
    expY += 27
  })

  doc.setTextColor(...ink)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('SELECTED PROJECTS', rightX, 153)
  doc.setDrawColor(...gold)
  doc.line(rightX, 156, rightX + rightWidth, 156)

  const projectY = 163
  const projects = [
    ['Veedly', 'Live event discovery and planning platform for venues and celebrations.', 'veedly.in'],
    ['JetFyx', 'Real-time forex trading platform with web, mobile and AWS architecture.', 'trade.jetfyx.com'],
    ['Criclify', 'Neon 3D cricket management and tournament platform.', 'cricketappthreejs-hbuonthf.vercel.app'],
    ['MSSQ', 'Animated 3D Qur’anic reflection experience.', 'mssq.vercel.app'],
    ['NexaDeutsch', 'German A1 learning platform with lessons and dashboards.', 'nexa-deutsch.vercel.app'],
  ]
  let py = projectY
  projects.forEach(([name, detail, link]) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8.7)
    doc.setTextColor(...ink)
    doc.text(name, rightX, py)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(7.8)
    doc.setTextColor(...muted)
    doc.text(doc.splitTextToSize(detail, rightWidth - 5), rightX, py + 4)
    doc.setTextColor(...gold)
    doc.text(link, rightX, py + 9)
    py += 17
  })

  doc.setFillColor(...gold)
  doc.rect(14, 277, 182, 0.6, 'F')
  doc.setTextColor(...muted)
  doc.setFontSize(7)
  doc.text('SOHAIL SHAH  |  PROFESSIONAL RESUME', 14, 283)
  doc.text('Page 1 of 1', 196, 283, { align: 'right' })

  doc.save('Sohail-Shah-Resume.pdf')
}
