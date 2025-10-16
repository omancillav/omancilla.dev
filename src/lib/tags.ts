import NextJS from '@/assets/NextJS.astro'
import Tailwind from '@/assets/Tailwind.astro'
import ReactIcon from '@/assets/React.astro'
import ShadcnIcon from '@/assets/Shadcn.astro'
import SupabaseIcon from '@/assets/Supabase.astro'
import NodeIcon from '@/assets/NodeJS.astro'
import ExpressIcon from '@/assets/Express.astro'
import JWTIcon from '@/assets/JWT.astro'
import TypeScriptIcon from '@/assets/TypeScript.astro'
import VercelIcon from '@/assets/Vercel.astro'
import TursoIcon from '@/assets/Turso.astro'
import JavaScriptIcon from '@/assets/JavaScript.astro'
import Html5 from '@/assets/Html5.astro'
import CSS from '@/assets/CSS.astro'

export const TAGS = {
  NEXT: {
    name: 'Next.js',
    class: 'bg-black text-white',
    icon: NextJS
  },
  TAILWIND: {
    name: 'Tailwind CSS',
    class: 'bg-[#003159] text-white',
    icon: Tailwind
  },
  REACT: {
    name: 'React',
    class: 'bg-sky-700/90 text-slate-100',
    icon: ReactIcon
  },
  SHADCN: {
    name: 'shadcn',
    class: 'bg-black text-white',
    icon: ShadcnIcon
  },
  SUPABASE: {
    name: 'Supabase',
    class: 'bg-emerald-800 text-white',
    icon: SupabaseIcon
  },
  NODE: {
    name: 'Node.js',
    class: 'bg-teal-900 text-white',
    icon: NodeIcon
  },
  EXPRESS: {
    name: 'Express.js',
    class: 'bg-gray-800 text-white',
    icon: ExpressIcon
  },
  JWT: {
    name: 'JWT',
    class: 'bg-cyan-700 text-white',
    icon: JWTIcon
  },
  TYPESCRIPT: {
    name: 'TypeScript',
    class: 'bg-blue-900 text-white',
    icon: TypeScriptIcon
  },
  VERCEL: {
    name: 'Vercel',
    class: 'bg-black text-white',
    icon: VercelIcon
  },
  TURSO: {
    name: 'Turso',
    class: 'bg-teal-800 text-white',
    icon: TursoIcon
  },
  HTML: {
    name: 'HTML',
    class: 'bg-orange-600 text-white',
    icon: Html5
  },
  CSS: {
    name: 'CSS',
    class: 'bg-blue-800 text-white',
    icon: CSS
  },
  JAVASCRIPT: {
    name: 'JavaScript',
    class: 'bg-yellow-300 text-black',
    icon: JavaScriptIcon
  }
} as const
