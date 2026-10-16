import { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const WHATSAPP = '' // Configura aquí: 56912345678
const message = 'Hola David, quisiera solicitar un presupuesto.'

const services = [
  ['⌂', 'Ampliaciones', 'Más espacio y comodidad para tu hogar.'],
  ['▣', 'Cerrajería', 'Instalación y reparación de cerraduras.'],
  ['⌁', 'Gasfitería', 'Reparaciones, instalaciones y soluciones en agua.'],
  ['⌑', 'Carpintería', 'Muebles a medida, puertas y terminaciones.'],
  ['◇', 'Cerámicas', 'Instalación de pisos y revestimientos.'],
  ['▤', 'Pisos flotantes', 'Instalación y reparaciones.'],
]
const projects = Array.from({ length: 10 }, (_, i) => `Proyecto ${i + 1}`)

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

function WhatsAppButton({ children = 'Solicitar presupuesto' }) {
  const handleClick = (event) => {
    if (!WHATSAPP) {
      event.preventDefault()
      window.dispatchEvent(new CustomEvent('whatsapp-missing'))
      return
    }
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }
  return <a className="btn whatsapp-btn" href={WHATSAPP ? `https://wa.me/${WHATSAPP}` : '#contacto'} onClick={handleClick} target={WHATSAPP ? '_blank' : undefined} rel="noreferrer">◔ {children} →</a>
}

function Header() {
  const ids = ['inicio', 'servicios', 'proyectos', 'sobre-mi', 'contacto']
  const active = useActiveSection(ids)
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(false)
  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light' }, [dark])
  return <header className="header"><div className="wrap bar">
    <a className="logo" href="#inicio" aria-label="Morales Construcción y Remodelaciones"><b>M</b><span>MORALES<small>CONSTRUCCIÓN Y REMODELACIONES</small></span></a>
    <button className="theme" onClick={() => setDark((value) => !value)} aria-label="Cambiar tema">{dark ? '☼' : '◐'}</button>
    <button className="hamb" onClick={() => setOpen((value) => !value)} aria-label="Abrir menú">{open ? '×' : '☰'}</button>
    <nav className={open ? 'nav open' : 'nav'} aria-label="Navegación principal"><ul>{ids.map((id) => <li key={id}><a className={active === id ? 'active' : ''} href={`#${id}`} onClick={() => setOpen(false)}>{id === 'sobre-mi' ? 'Sobre mí' : id[0].toUpperCase() + id.slice(1)}</a></li>)}</ul></nav>
    <WhatsAppButton />
  </div></header>
}

function Placeholder({ name, tall = false, image }) { return <div className={`photo ${tall ? 'tall' : ''}`} role="img" aria-label={name} style={image ? { backgroundImage: `url(${image})` } : undefined}><span>{image ? 'PROYECTO REALIZADO' : 'FOTO DE PROYECTO'}</span><small>{name}</small></div> }

function Hero() { return <section className="hero" id="inicio"><div className="hero-backdrop" /><div className="wrap hero-grid"><div className="reveal"><p className="eyebrow">Construcción y remodelaciones</p><h1><strong>30 años</strong> de experiencia construyendo soluciones para tu hogar.</h1><p className="lead">Ampliaciones, cerrajería, gasfitería, remodelaciones y más, con un trabajo de calidad y confianza.</p><div className="trust"><span>◈<b>Experiencia<br />y compromiso</b></span><span>⌂<b>Soluciones<br />a medida</b></span><span>♧<b>Atención<br />personalizada</b></span></div><WhatsAppButton>Solicitar presupuesto por WhatsApp</WhatsAppButton></div><Placeholder name="Casa con ampliación" tall image="/images/hero-home.png" /></div></section> }

function Services() { return <section className="section white" id="servicios"><div className="wrap"><SectionHeading eyebrow="Nuestros servicios" title="Soluciones para tu hogar" text="Realizamos trabajos de construcción, reparación y remodelación, con especial enfoque en ampliaciones, cerrajería y gasfitería." /><div className="service-grid">{services.map(([icon, title, text], index) => <article className="service-card" key={title}><Placeholder name={title} image={index === 0 ? '/images/hero-home.png' : index === 2 ? '/images/bathroom-remodel.png' : index === 3 ? '/images/kitchen-cabinet.png' : undefined} /><div className="service-copy"><i>{icon}</i><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section> }

function SectionHeading({ eyebrow, title, text }) { return <div className="section-heading"><div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>{text && <p>{text}</p>}</div> }

function Projects() { const [all, setAll] = useState(false); const visible = all ? projects : projects.slice(0, 5); return <section className="section white" id="proyectos"><div className="wrap"><SectionHeading eyebrow="Proyectos realizados" title="Trabajos que hablan por sí solos" /><div className="gallery">{visible.map((project, index) => <Placeholder key={project} name={project} image={index % 3 === 0 ? '/images/hero-home.png' : index % 3 === 1 ? '/images/kitchen-cabinet.png' : '/images/bathroom-remodel.png'} />)}</div><div className="center"><button className="btn secondary" onClick={() => setAll((value) => !value)}>{all ? 'Ver menos proyectos' : 'Ver más proyectos de ejemplo'}</button></div></div></section> }

function About() { return <section className="about white" id="sobre-mi"><div className="wrap about-grid"><div className="about-copy"><p className="eyebrow">Trayectoria</p><h2>30 años<span>de experiencia</span></h2><p>Soy David Morales Carreño y cuento con más de 30 años de experiencia realizando trabajos de construcción, reparación y remodelación.</p><p>Mi objetivo es entregar soluciones prácticas, bien ejecutadas y adaptadas a las necesidades de cada cliente.</p><WhatsAppButton>Conversemos por WhatsApp</WhatsAppButton></div><Placeholder name="Proyecto realizado" tall image="/images/kitchen-cabinet.png" /><div className="values">{[['◇', 'Calidad en cada detalle', 'Trabajos bien ejecutados y con buenos materiales.'], ['♧', 'Compromiso', 'Cumplimiento de tiempos y acuerdos.'], ['♙', 'Trato directo', 'Comunicación clara y atención personalizada.'], ['⌖', 'Región Metropolitana', 'Atención en toda la Región Metropolitana.']].map(([icon, title, text]) => <div key={title}><b>{icon} {title}</b><small>{text}</small></div>)}</div></div></section> }

function Contact() { const [notice, setNotice] = useState(false); useEffect(() => { const show = () => { setNotice(true); setTimeout(() => setNotice(false), 4000) }; window.addEventListener('whatsapp-missing', show); return () => window.removeEventListener('whatsapp-missing', show) }, []); return <section className="contact" id="contacto"><div className="wrap contact-grid"><div><p className="eyebrow">Hablemos</p><h2>¿Tienes un proyecto en mente?</h2><p>Cuéntanos lo que necesitas y te ayudaremos a encontrar la mejor solución para tu hogar.</p><WhatsAppButton>Solicitar presupuesto por WhatsApp</WhatsAppButton></div><div className="coverage"><span>⌖</span><h3>Región Metropolitana</h3><p>Atención en distintas comunas.</p></div></div>{notice && <div className="notice" role="status">Configura el número de WhatsApp en <code>src/main.jsx</code> para activar este botón.</div>}</section> }

function Footer() { return <footer><div className="wrap footer-content"><a className="logo" href="#inicio"><b>M</b><span>MORALES<small>CONSTRUCCIÓN Y REMODELACIONES</small></span></a><p>© {new Date().getFullYear()} Morales. Construcción y remodelaciones.</p><nav><a href="#servicios">Servicios</a><a href="#proyectos">Proyectos</a><a href="#contacto">Contacto</a></nav></div></footer> }

function App() { return <><Header /><main><Hero /><Services /><Projects /><About /><Contact /></main><Footer /></> }

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
