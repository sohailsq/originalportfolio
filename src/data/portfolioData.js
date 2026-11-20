import { FaReact, FaNodeJs, FaDocker, FaLinux, FaGitAlt, FaGithub, FaAws, FaJenkins, FaJs, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { SiNextdotjs, SiExpress, SiMongodb, SiTerraform, SiVite, SiThreedotjs, SiTailwindcss, SiTypescript, SiMysql, SiNginx, SiExpo, SiWebgl, SiGithubactions, SiKubernetes } from 'react-icons/si'
import { Code2 } from 'lucide-react'
import veedlyImage from '../assets/Veedly_ Dream Events, Beautifully Planned.png'
import criclifyImage from '../assets/Criclify Neon Cricket Platform.png'
import mssqImage from '../assets/MSSQ_ A Qur’anic Reflection Experience.png'
import nexadeutschImage from '../assets/NexaDeutsch German Learning Platform.png'
import jetfyxImage from '../assets/JetFyx Modern Forex Trading Platform.png'

export const profile = {
  name: 'Sohail Shah', email: 'mohammadsohailshahquadri@gmail.com',
  resume: '/resume.pdf',
  role: 'Software Engineer & Full-Stack Developer',
  bio: 'I build scalable web, mobile, and cloud-native applications with a focus on great user experience, performance, and reliable deployments.',
  about: 'A software engineer from Hyderabad, India, passionate about building impactful products, automating deployments, and exploring the intersection of technology, design, and creativity (Code × Art).',
  // Empty URLs are hidden automatically — add Instagram / YouTube when you have them.
  socials: [
    { label: 'GitHub', url: 'https://github.com/sohailsq', Icon: FaGithub },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sohail-shah-0570b1250/', Icon: FaLinkedin },
    { label: 'X', url: 'https://x.com/msohailsq', Icon: FaXTwitter },
    { label: 'Instagram', url: '', Icon: FaInstagram },
    { label: 'YouTube', url: '', Icon: FaYoutube },
  ],
}
export const nav = ['Home', 'About', 'Skills', 'Projects', 'Experience', 'DevOps', 'Contact']
export const stats = [
  { big: '2+ Years', small: 'Experience', icon: 'user' }, { big: '10+', small: 'Projects', icon: 'grid' },
  { big: 'DevOps', small: 'CI/CD · AWS · Docker', icon: 'cloud' }, { big: 'Full-Stack', small: 'Web · Mobile · Cloud', icon: 'phone' },
]
export const aboutBadges = ['Full-Stack', 'DevOps', 'Mobile (React Native)', 'Cloud (AWS)', 'Three.js', 'UI/UX']
export const aboutInfo = [['pin', 'Based in Hyderabad, India'], ['globe', 'Open to Remote / Relocation'], ['compass', 'Interested in Europe & UAE'], ['spark', 'Currently seeking new opportunities']]
export const skillFilters = ['All', 'Frontend', 'Backend', 'Mobile', 'DevOps & Cloud', 'Databases', 'Tools', '3D Development']
export const skills = [
  ['React.js', 'Frontend', FaReact], ['Next.js', 'Frontend', SiNextdotjs], ['Vite', 'Frontend', SiVite], ['Tailwind CSS', 'Frontend', SiTailwindcss],
  ['Node.js', 'Backend', FaNodeJs], ['Express.js', 'Backend', SiExpress], ['REST APIs', 'Backend', Code2],
  ['React Native', 'Mobile', FaReact], ['Expo', 'Mobile', SiExpo],
  ['MongoDB', 'Databases', SiMongodb], ['MySQL', 'Databases', SiMysql],
  ['AWS', 'DevOps & Cloud', FaAws], ['Docker', 'DevOps & Cloud', FaDocker], ['Jenkins', 'DevOps & Cloud', FaJenkins], ['GitHub Actions', 'DevOps & Cloud', SiGithubactions],
  ['Terraform', 'DevOps & Cloud', SiTerraform], ['Linux', 'DevOps & Cloud', FaLinux], ['Nginx', 'DevOps & Cloud', SiNginx],
  ['Three.js', '3D Development', SiThreedotjs], ['WebGL', '3D Development', SiWebgl],
  ['JavaScript', 'Tools', FaJs], ['TypeScript', 'Tools', SiTypescript], ['Git', 'Tools', FaGitAlt], ['GitHub', 'Tools', FaGithub],
]
export const projects = [
  { tag: 'Event Platform', title: 'Veedly', url: 'https://veedly.in', desc: 'Live event discovery and planning platform for venues, photographers, caterers and celebrations.', tech: ['Next.js', 'TypeScript', 'Flutter'], image: veedlyImage, playStore: 'https://play.google.com/store/search?q=Veedly&c=apps' },
  { tag: 'Trading Platform', title: 'JetFyx', url: 'https://trade.jetfyx.com/', desc: 'Real-time forex trading platform with web and mobile applications, WebSockets and AWS.', tech: ['React Native', 'React.js', 'AWS'], image: jetfyxImage },
  { tag: 'Cricket Platform', title: 'Criclify', url: 'https://cricketappthreejs-hbuonthf.vercel.app/', desc: 'Neon 3D cricket management platform for matches, clubs, tournaments and live scoring.', tech: ['React.js', 'Three.js', 'WebGL'], image: criclifyImage },
  { tag: 'Qur’anic Experience', title: 'MSSQ', url: 'https://mssq.vercel.app/', desc: 'Animated 3D Qur’anic reflection experience with elegant typography and immersive interactions.', tech: ['React', 'Three.js', 'WebGL'], image: mssqImage },
  { tag: 'EdTech', title: 'NexaDeutsch', url: 'https://nexa-deutsch.vercel.app/', desc: 'German learning platform for A1 with lessons, quizzes and teacher dashboard.', tech: ['React.js', 'Node.js', 'MongoDB'], image: nexadeutschImage },
]
export const experience = [
  { company: 'Veedly', role: 'Software Developer', when: 'May 2025 – Present', desc: 'Develop and maintain web and mobile applications using Next.js, JavaScript, TypeScript and Flutter.' },
  { company: 'Nafa Barter', role: 'Frontend Developer', when: 'May 2025 – Apr 2026', desc: 'Built interactive frontend experiences for the JetFyx trading platform using modern JavaScript practices.' },
  { company: 'Bitstek Consultancy', role: 'Software Engineer Intern', when: 'Sep 2024 – Apr 2025', desc: 'Contributed to real-world web development and CRM and Howzdat mobile application.' },
]
export const pipeline = [
  { name: 'GitHub', sub: 'Code Push', Icon: FaGithub, tip: 'Push to main triggers the workflow.' },
  { name: 'GitHub Actions', sub: 'CI/CD', Icon: SiGithubactions, tip: 'Install, lint, test and build on every push.' },
  { name: 'Docker', sub: 'Build & Push Docker Image', Icon: FaDocker, tip: 'App is containerized and the image is pushed to a registry.' },
  { name: 'AWS EC2', sub: 'Deploy Application', Icon: FaAws, tip: 'The new container is pulled and started on EC2.' },
  { name: 'Nginx', sub: 'Reverse Proxy', Icon: SiNginx, tip: 'Routes traffic to the app and terminates TLS.' },
  { name: 'MongoDB Atlas', sub: 'Database', Icon: SiMongodb, tip: 'Managed cloud database behind the API.' },
]
export const floating = [FaAws, SiKubernetes, FaDocker, SiTerraform, FaReact, Code2]
