import { StrictMode, useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Grid2X2, Hammer, HousePlus, KeyRound, Layers2, Wrench } from 'lucide-react'
import { hasPublishedProjects, projects } from './data/projects.js'
import './styles.css'

const WHATSAPP = '56997424200'
const message = 'Hola David, quisiera solicitar un presupuesto.'

const services = [
  [HousePlus, 'Ampliaciones', 'Más espacio y comodidad para tu hogar.'],
  [KeyRound, 'Cerrajería', 'Instalación y reparación de cerraduras.'],
  [Wrench, 'Gasfitería', 'Reparaciones, instalaciones y soluciones en agua.'],
  [Hammer, 'Carpintería', 'Muebles a medida, puertas y terminaciones.'],
  [Grid2X2, 'Cerámicas', 'Instalación de pisos y revestimientos.'],
  [Layers2, 'Pisos flotantes', 'Instalación y reparaciones.'],
]
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActive(visible.target.id)
    }, { rootMargin: '-20% 0px -65% 0px' })
    ids.forEach((id) => document.getElementById(id) && observer.observe(document.getElementById(id)))
    return () => observer.disconnect()
  }, [ids])
  return active
}

function WhatsAppButton({ children = 'Solicitar presupuesto', icon = false }) {
  const handleClick = (event) => {
    if (!WHATSAPP) {
      event.preventDefault()
      window.dispatchEvent(new CustomEvent('whatsapp-missing'))
      return
    }
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }
  return <a className={`btn whatsapp-btn${icon ? ' whatsapp-hero-btn' : ''}`} href={WHATSAPP ? `https://wa.me/${WHATSAPP}` : '#contacto'} onClick={handleClick} target={WHATSAPP ? '_blank' : undefined} rel="noreferrer">{icon && <svg className="whatsapp-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L.05 24l6.28-1.65a11.85 11.85 0 0 0 5.73 1.46h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.23-6.17-3.45-8.43ZM12.07 21.8h-.01a9.86 9.86 0 0 1-5.03-1.37l-.36-.21-3.73.98 1-3.64-.24-.37a9.88 9.88 0 0 1-1.52-5.29c0-5.47 4.45-9.92 9.93-9.92a9.85 9.85 0 0 1 7.02 2.91 9.86 9.86 0 0 1 2.9 7.03c0 5.47-4.45 9.92-9.92 9.92Zm5.44-7.43c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.64-.93-2.25-.25-.59-.5-.51-.68-.52h-.58c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" /></svg>}{children} →</a>
}

function Header() {
  const ids = ['inicio', 'servicios', ...(hasPublishedProjects ? ['proyectos'] : []), 'sobre-mi', 'contacto']
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  return <header className="header"><div className="wrap bar">
    <a className="logo" href="#inicio" aria-label="Morales Construcción y Remodelaciones"><img src="/images/logo-v2.png" alt="Morales Construcción y Remodelaciones" /></a>
    <button className="theme" onClick={() => setDark((value) => !value)} aria-label="Cambiar tema">{dark ? '☼' : '◐'}</button>
    <button className="hamb" onClick={() => setOpen((value) => !value)} aria-label="Abrir menú">{open ? '×' : '☰'}</button>
    <nav className={open ? 'nav open' : 'nav'} aria-label="Navegación principal"><ul>{ids.map((id) => <li key={id}><a className={active === id ? 'active' : ''} href={`#${id}`} onClick={() => setOpen(false)}>{id === 'sobre-mi' ? 'Sobre mí' : id[0].toUpperCase() + id.slice(1)}</a></li>)}</ul></nav>
    <WhatsAppButton />
  </div></header>
}

function Placeholder({ name, tall = false, image }) { return <div className={`photo ${tall ? 'tall' : ''}`} role="img" aria-label={name} style={image ? { backgroundImage: `url(${image})` } : undefined}><span>{image ? 'PROYECTO REALIZADO' : 'FOTO DE PROYECTO'}</span><small>{name}</small></div> }

function Hero() { return <section className="hero" id="inicio"><div className="hero-backdrop" role="img" aria-label="Casa moderna entre árboles" /><div className="wrap hero-grid"><div className="reveal hero-content"><p className="eyebrow">Construcción y remodelaciones</p><h1><strong>30 años</strong> de experiencia construyendo soluciones para tu hogar.</h1><p className="lead">Ampliaciones, cerrajería, gasfitería, remodelaciones y más, con un trabajo de calidad y confianza.</p><div className="hero-actions"><WhatsAppButton icon>Solicitar presupuesto</WhatsAppButton></div></div></div></section> }

function Services() { return <section className="section white" id="servicios"><div className="wrap services-wrap"><SectionHeading eyebrow="Nuestros servicios" title="Soluciones para tu hogar" /><div className="service-grid">{services.map(([Icon, title, text]) => <article className="service-card" key={title}><div className="service-copy"><span className="service-icon" aria-hidden="true"><Icon /></span><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section> }

function SectionHeading({ eyebrow, title, text }) { return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{text && <p>{text}</p>}</div> }

function ProjectCard({ project, onOpen }) {
  const image = project.images[0]
  return <article className={`project-card${image ? '' : ' is-pending'}`}>
    <button className={`project-image project-${project.id}`} type="button" onClick={() => image && onOpen(project, 0)} disabled={!image} aria-label={image ? `Abrir galería de ${project.name}` : `${project.name}: fotografías pendientes`}>
      {image ? <img src={image} alt={project.name} /> : <span className="project-pending-icon" aria-hidden="true">◇</span>}
    </button>
    <div className="project-info"><p className="project-category">{project.category}</p><h3>{project.name}</h3>{project.description && <p>{project.description}</p>}</div>
  </article>
}

function ProjectLightbox({ project, index, onClose, onChange }) {
  const closeRef = useRef(null)
  const images = project?.images ?? []
  useEffect(() => {
    if (!project) return undefined
    closeRef.current?.focus()
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length)
      if (event.key === 'ArrowRight') onChange((index + 1) % images.length)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [project, index, images.length, onClose, onChange])
  if (!project || !images.length) return null
  return <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Galería de ${project.name}`} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
    <button className="lightbox-close" type="button" onClick={onClose} ref={closeRef} aria-label="Cerrar galería">×</button>
    <div className="lightbox-content"><img src={images[index]} alt={`${project.name}, fotografía ${index + 1} de ${images.length}`} /><div className="lightbox-controls"><button type="button" onClick={() => onChange((index - 1 + images.length) % images.length)} aria-label="Fotografía anterior">←</button><span>{index + 1} / {images.length}</span><button type="button" onClick={() => onChange((index + 1) % images.length)} aria-label="Fotografía siguiente">→</button></div></div>
  </div>
}

function Projects() {
  const [all, setAll] = useState(false)
  const [selected, setSelected] = useState(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const isDevelopment = import.meta.env.DEV
  const publishedProjects = projects.filter((project) => project.status === 'published' && project.images.length)
  const availableProjects = isDevelopment ? projects.filter((project) => project.status === 'demo' || project.status === 'published') : publishedProjects
  if (!availableProjects.length) return null
  const visible = all ? availableProjects : availableProjects.slice(0, 6)
  const hasMore = availableProjects.length > 6
  const openProject = (project, index) => { setSelected(project); setSelectedIndex(index) }
  return <section className="section white" id="proyectos"><div className="wrap projects-wrap"><SectionHeading eyebrow="Proyectos realizados" title="Trabajos que hablan por sí solos" /><div className="projects-grid">{visible.map((project) => <ProjectCard key={project.id} project={project} onOpen={openProject} />)}</div>{hasMore && <div className="center"><button className="btn secondary" onClick={() => setAll((value) => !value)}>{all ? 'Ver menos proyectos' : 'Ver más proyectos'}</button></div>}</div><ProjectLightbox project={selected} index={selectedIndex} onClose={() => setSelected(null)} onChange={setSelectedIndex} /></section>
}

function About() { return <section className="about white" id="sobre-mi"><div className="wrap about-layout"><div className="about-photo"><img src="/images/sobre-mi/david-morales.webp" alt="David Morales Carreño en su taller" /></div><div className="about-copy"><p className="eyebrow">Trayectoria</p><h2>30 años<span>de experiencia</span></h2><p>Soy David Morales Carreño y cuento con más de 30 años de experiencia en construcción, reparaciones y remodelaciones.</p><p>A lo largo de mi trayectoria he trabajado en proyectos de distintos tamaños, siempre buscando soluciones prácticas, bien ejecutadas y adaptadas a las necesidades de cada cliente.</p></div><div className="values">{[['◇', 'Calidad en cada detalle', 'Trabajos bien ejecutados y con buenos materiales.'], ['♧', 'Compromiso', 'Cumplimiento de tiempos y acuerdos.'], ['♙', 'Trato directo', 'Comunicación clara y atención personalizada.'], ['⌖', 'Región Metropolitana', 'Atención en toda la Región Metropolitana.']].map(([icon, title, text]) => <div key={title}><b><span aria-hidden="true">{icon}</span>{title}</b><small>{text}</small></div>)}</div></div></section> }

function Contact() { const [notice, setNotice] = useState(false); useEffect(() => { const show = () => { setNotice(true); setTimeout(() => setNotice(false), 4000) }; window.addEventListener('whatsapp-missing', show); return () => window.removeEventListener('whatsapp-missing', show) }, []); return <section className="contact" id="contacto"><div className="wrap contact-grid"><div className="contact-copy"><p className="eyebrow">Hablemos</p><h2>¿Tienes un proyecto en mente?</h2><p>Cuéntame qué necesitas y conversemos sobre cómo puedo ayudarte a hacerlo realidad.</p><WhatsAppButton icon>Solicitar presupuesto por WhatsApp</WhatsAppButton></div><div className="coverage"><span className="coverage-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></svg></span><div><h3>Región Metropolitana</h3><p>Realizo trabajos en distintas comunas.</p></div></div></div>{notice && <div className="notice" role="status">Configura el número de WhatsApp en <code>src/main.jsx</code> para activar este botón.</div>}</section> }

function Footer() { return <footer><div className="wrap footer-content"><div className="footer-top"><a className="logo" href="#inicio" aria-label="Volver al inicio — Morales Construcción y Remodelaciones"><img src="/images/logo-v2.png" alt="Morales Construcción y Remodelaciones" /></a><nav aria-label="Navegación del pie de página"><a href="#servicios">Servicios</a><a href="#proyectos">Proyectos</a><a href="#contacto">Contacto</a></nav></div><div className="footer-bottom"><p>© 2026 Morales | Construcción y Remodelaciones</p><p>Región Metropolitana, Chile</p></div></div></footer> }

function App() { return <><Header /><main><Hero /><Services /><Projects /><About /><Contact /></main><Footer /></> }

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
