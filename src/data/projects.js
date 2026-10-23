// Catálogo de proyectos. Los demo se muestran solo durante el desarrollo local.
// Publicar un proyecto requiere status: 'published' y al menos una imagen real verificada.
export const projects = [
  {
    id: 'isla-cocina',
    name: 'Mueble de cocina y barra a medida',
    category: 'Carpintería',
    description: 'Diseño y fabricación de mueble de cocina a medida, con barra integrada, espacios de almacenamiento, repisas decorativas y terminaciones en tonos madera. Una solución que combina funcionalidad, organización y calidez para el hogar.',
    images: [
      '/images/proyectos/isla-cocina/portada.webp',
      '/images/proyectos/isla-cocina/detalle-01.webp',
      '/images/proyectos/isla-cocina/detalle-02.webp',
      '/images/proyectos/isla-cocina/detalle-03.webp',
    ],
    status: 'published',
  },
  {
    id: 'demo-bano',
    name: 'Baño residencial renovado',
    category: 'Remodelación',
    description: 'Referencia visual temporal para la galería.',
    images: ['/images/proyectos/demo-bano/01.png'],
    status: 'demo',
  },
  {
    id: 'demo-ampliacion',
    name: 'Ampliación de vivienda',
    category: 'Ampliaciones',
    description: 'Referencia visual temporal para la galería.',
    images: ['/images/proyectos/demo-ampliacion/01.png'],
    status: 'demo',
  },
  {
    id: 'demo-cocina',
    name: 'Cocina de líneas cálidas',
    category: 'Remodelación',
    description: 'Referencia visual temporal para la galería.',
    images: ['/images/proyectos/demo-cocina/01.png'],
    status: 'demo',
  },
  {
    id: 'demo-carpinteria',
    name: 'Mobiliario de madera a medida',
    category: 'Carpintería',
    description: 'Referencia visual temporal para la galería.',
    images: ['/images/proyectos/demo-carpinteria/01.png'],
    status: 'demo',
  },
  {
    id: 'demo-interior',
    name: 'Interior residencial renovado',
    category: 'Remodelación',
    description: 'Referencia visual temporal para la galería.',
    images: ['/images/proyectos/demo-interior/01.png'],
    status: 'demo',
  },
  {
    id: 'demo-pisos',
    name: 'Instalación de pisos',
    category: 'Pisos flotantes',
    description: 'Referencia visual temporal para la galería.',
    images: ['/images/proyectos/demo-pisos/01.png'],
    status: 'demo',
  },
]

export const hasPublishedProjects = projects.some((project) => project.status === 'published' && project.images.length > 0)
