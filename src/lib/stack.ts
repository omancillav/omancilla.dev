import NodeIcon from '@/assets/NodeJS.astro'
import NextIcon from '@/assets/NextJS.astro'
import TailwindIcon from '@/assets/Tailwind.astro'
import ExpressIcon from '@/assets/Express.astro'
import LaravelIcon from '@/assets/Laravel.astro'
import JavaIcon from '@/assets/Java.astro'
import PHPIcon from '@/assets/Php.astro'
import JavaScriptIcon from '@/assets/JavaScript.astro'
import TypeScriptIcon from '@/assets/TypeScript.astro'
import PythonIcon from '@/assets/Python.astro'
import HTMLIcon from '@/assets/Html5.astro'
import CSSIcon from '@/assets/CSS.astro'
import ReactIcon from '@/assets/React.astro'
import AstroIcon from '@/assets/AstroIcon.astro'
import MySQLIcon from '@/assets/MySQL.astro'
import PostgreSQLIcon from '@/assets/Postgres.astro'
import MongoDBIcon from '@/assets/Mongo.astro'
import SQLiteIcon from '@/assets/SQLite.astro'
import FirebaseIcon from '@/assets/Firebase.astro'
import SupabaseIcon from '@/assets/Supabase.astro'
import GitIcon from '@/assets/Git.astro'
import GitHubIcon from '@/assets/GitHub.astro'
import EslintIcon from '@/assets/Eslint.astro'
import PostmanIcon from '@/assets/Postman.astro'
import NpmIcon from '@/assets/Npm.astro'
import VercelIcon from '@/assets/Vercel.astro'

export const BACKEND = [
  {
    name: 'Node.js',
    icon: NodeIcon
  },
  {
    name: 'Express.js',
    icon: ExpressIcon
  },
  {
    name: 'Laravel',
    icon: LaravelIcon
  },
  {
    name: 'PHP',
    icon: PHPIcon
  },
  {
    name: 'Java',
    icon: JavaIcon
  },
  {
    name: 'Python',
    icon: PythonIcon
  }
] as const

export const FRONTEND = [
  {
    name: 'HTML5',
    icon: HTMLIcon
  },
  {
    name: 'CSS3',
    icon: CSSIcon
  },
  {
    name: 'Tailwind CSS',
    icon: TailwindIcon
  },
  {
    name: 'JavaScript',
    icon: JavaScriptIcon
  },
  {
    name: 'TypeScript',
    icon: TypeScriptIcon
  },
  {
    name: 'React',
    icon: ReactIcon
  },
  {
    name: 'Next.js',
    icon: NextIcon
  },
  {
    name: 'Astro',
    icon: AstroIcon
  }
] as const

export const DATABASE = [
  {
    name: 'MySQL',
    icon: MySQLIcon
  },
  {
    name: 'PostgreSQL',
    icon: PostgreSQLIcon
  },
  {
    name: 'MongoDB',
    icon: MongoDBIcon
  },
  {
    name: 'SQLite',
    icon: SQLiteIcon
  },
  {
    name: 'Firebase',
    icon: FirebaseIcon
  },
  {
    name: 'Supabase',
    icon: SupabaseIcon
  }
] as const

export const TOOLS = [
  {
    name: 'Git',
    icon: GitIcon
  },
  {
    name: 'GitHub',
    icon: GitHubIcon
  },
  {
    name: 'npm',
    icon: NpmIcon
  },
  {
    name: 'Eslint',
    icon: EslintIcon
  },
  {
    name: 'Postman',
    icon: PostmanIcon
  },
  {
    name: 'Vercel',
    icon: VercelIcon
  }
] as const
