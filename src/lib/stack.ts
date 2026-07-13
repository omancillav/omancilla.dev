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
import ReactIcon from '@/assets/React.astro'
import AstroIcon from '@/assets/AstroIcon.astro'
import MySQLIcon from '@/assets/MySQL.astro'
import PostgreSQLIcon from '@/assets/Postgres.astro'
import MongoDBIcon from '@/assets/Mongo.astro'
import SQLiteIcon from '@/assets/SQLite.astro'
import FirebaseIcon from '@/assets/Firebase.astro'
import SupabaseIcon from '@/assets/Supabase.astro'
import GitHubIcon from '@/assets/GitHub.astro'
import EslintIcon from '@/assets/Eslint.astro'
import VercelIcon from '@/assets/Vercel.astro'
import GcloudIcon from '@/assets/Gcloud.astro'
import MoleculerIcon from '@/assets/Moleculer.astro'
import ExpoIcon from '@/assets/Expo.astro'
import TursoIcon from '@/assets/Turso.astro'
import ZodIcon from '@/assets/Zod.astro'
import CloudflareIcon from '@/assets/Cloudflare.astro'
import JenkinsIcon from '@/assets/Jenkins.astro'
import SQLIcon from '@/assets/SQL.astro'

export const FRONTEND = [
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
    name: 'React Native',
    icon: ReactIcon
  },
  {
    name: 'Next.js',
    icon: NextIcon
  },
  {
    name: 'Astro',
    icon: AstroIcon
  },
  {
    name: 'Expo',
    icon: ExpoIcon
  },
  {
    name: 'Tailwind CSS',
    icon: TailwindIcon
  }
] as const

export const BACKEND = [
  {
    name: 'Node.js',
    icon: NodeIcon
  },
  {
    name: 'Express',
    icon: ExpressIcon
  },
  {
    name: 'Moleculer',
    icon: MoleculerIcon
  },
  {
    name: 'Java',
    icon: JavaIcon
  },
  {
    name: 'Python',
    icon: PythonIcon
  },
  {
    name: 'PHP',
    icon: PHPIcon
  },
  {
    name: 'Laravel',
    icon: LaravelIcon
  },
  {
    name: 'Zod',
    icon: ZodIcon
  }
] as const

export const DATABASE = [
  {
    name: 'SQL',
    icon: SQLIcon
  },
  {
    name: 'PostgreSQL',
    icon: PostgreSQLIcon
  },
  {
    name: 'MySQL',
    icon: MySQLIcon
  },
  {
    name: 'Firebase',
    icon: FirebaseIcon
  },
  {
    name: 'Supabase',
    icon: SupabaseIcon
  },
  {
    name: 'Turso/libSQL',
    icon: TursoIcon
  },
  {
    name: 'MongoDB',
    icon: MongoDBIcon
  },
  {
    name: 'SQLite',
    icon: SQLiteIcon
  }
] as const

export const TOOLS = [
  {
    name: 'Google Cloud',
    icon: GcloudIcon
  },
  {
    name: 'Vercel',
    icon: VercelIcon
  },
  {
    name: 'Cloudflare',
    icon: CloudflareIcon
  },
  {
    name: 'EAS',
    icon: ExpoIcon
  },
  {
    name: 'Jenkins',
    icon: JenkinsIcon
  },
  {
    name: 'Git/GitHub',
    icon: GitHubIcon
  },
  {
    name: 'ESLint',
    icon: EslintIcon
  }
] as const
