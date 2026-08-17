export const languages = {
  es: 'ES',
  en: 'EN'
} as const

export type Lang = keyof typeof languages

export const defaultLang: Lang = 'es'

export const ui = {
  es: {
    'site.title': 'Omar Mancilla | Desarrollador Full Stack',
    'site.description':
      'Portafolio de Omar Mancilla, desarrollador Full Stack en México. Conoce su experiencia, proyectos y tecnologías para desarrollo web y móvil.',
    'nav.home': 'Inicio',
    'nav.experience': 'Experiencia',
    'nav.projects': 'Proyectos',
    'nav.stack': 'Tecnologías',
    'nav.language': 'Cambiar idioma',
    'nav.settings': 'Ajustes',
    'controls.language': 'Idioma',
    'controls.theme': 'Tema',
    'theme.toggle': 'Cambiar tema',
    'hero.badge': 'Disponible para trabajar',
    'hero.role': 'Desarrollador Full Stack',
    'hero.greeting': 'Hey, soy',
    'hero.experience': '2 años de experiencia en desarrollo web. ',
    'hero.student': 'Ingeniero en Desarrollo y Gestión de Software.',
    'hero.country': ' De México 🇲🇽.',
    'hero.focus': 'Enfocado en desarrollar soluciones digitales innovadoras que mejoren la experiencia de usuario.',
    'hero.contact': 'Contacto',
    'hero.goToExperience': 'Ir a experiencia',
    'contact.email': 'contacto@omancilla.dev',
    'section.experience': 'Experiencia',
    'section.projects': 'Proyectos',
    'section.stack': 'Tecnologías',
    'experience.more': 'Más Información',
    'projects.viewSite': 'Ver sitio',
    'projects.code': 'Código',
    'projects.screenshotAlt': 'Captura de',
    'stack.frontend': 'Frontend y móvil',
    'stack.backend': 'Backend y desarrollo',
    'stack.database': 'Datos y servicios',
    'stack.tools': 'Cloud y herramientas',
    'footer.role': 'Desarrollador Full Stack',
    'footer.rights': '© 2026 Casi todos los derechos reservados.'
  },
  en: {
    'site.title': 'Omar Mancilla | Full Stack Developer',
    'site.description':
      'Portfolio of Omar Mancilla, a Full Stack Developer from Mexico. Explore his experience, projects, and web and mobile development stack.',
    'nav.home': 'Home',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.stack': 'Stack',
    'nav.language': 'Change language',
    'nav.settings': 'Settings',
    'controls.language': 'Language',
    'controls.theme': 'Theme',
    'theme.toggle': 'Toggle theme',
    'hero.badge': 'Open to work',
    'hero.role': 'Full Stack Developer',
    'hero.greeting': "Hey, I'm",
    'hero.experience': '2 years of experience in web development. ',
    'hero.student': 'Software Development and Management Engineer.',
    'hero.country': ' From Mexico 🇲🇽.',
    'hero.focus': 'Focused on building innovative digital solutions that improve the user experience.',
    'hero.contact': 'Contact',
    'hero.goToExperience': 'Go to experience',
    'contact.email': 'contact@omancilla.dev',
    'section.experience': 'Experience',
    'section.projects': 'Projects',
    'section.stack': 'Stack',
    'experience.more': 'More Information',
    'projects.viewSite': 'View site',
    'projects.code': 'Code',
    'projects.screenshotAlt': 'Screenshot of',
    'stack.frontend': 'Frontend & mobile',
    'stack.backend': 'Backend & development',
    'stack.database': 'Data & services',
    'stack.tools': 'Cloud & tools',
    'footer.role': 'Full Stack Developer',
    'footer.rights': '© 2026 Almost all rights reserved.'
  }
} as const
