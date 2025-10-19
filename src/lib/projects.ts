import { TAGS } from './tags'
import VetSyncImage from '@/assets/img/vetsync.webp'
import CutflyImage from '@/assets/img/cutfly.webp'
import DonlyImage from '@/assets/img/donly.webp'

export const PROJECTS = [
  {
    title: 'Vet Sync - Gestión de citas veterinarias para mascotas',
    description:
      'Vet Sync es una aplicación web desarrollada con React y Tailwind CSS para gestionar clínicas veterinarias. Permite agendar citas, administrar expedientes de mascotas y controlar accesos por roles con una interfaz moderna y responsive.',
    link: 'https://vetsync.vercel.app',
    github: 'https://github.com/omancillav/vet-sync-app',
    image: VetSyncImage,
    tags: [TAGS.REACT, TAGS.TAILWIND, TAGS.SHADCN, TAGS.SUPABASE, TAGS.NODE, TAGS.EXPRESS, TAGS.JWT]
  },
  {
    title: 'Cutfly - Acortador de URLs Open Source',
    description:
      'Acortador de URLs gratuito y de código abierto construido con Next.js y TypeScript. Permite crear enlaces cortos personalizados, rastrear clicks, y gestionar todos tus enlaces desde un dashboard intuitivo.',
    link: 'https://cutfly.vercel.app',
    github: 'https://github.com/omancillav/cutfly',
    image: CutflyImage,
    tags: [TAGS.TYPESCRIPT, TAGS.NEXT, TAGS.TAILWIND, TAGS.SHADCN, TAGS.TURSO, TAGS.VERCEL]
  },
  {
    title: 'Donly - Todo List App',
    description:
      'Donly es una aplicación de lista de tareas construida con HTML, CSS y JavaScript. Permite a los usuarios crear, editar, eliminar y marcar tareas como completadas de manera sencilla, con una interfaz intuitiva y responsiva.',
    link: 'https://donly.vercel.app',
    github: 'https://github.com/omancillav/donly',
    image: DonlyImage,
    tags: [TAGS.HTML, TAGS.CSS, TAGS.JAVASCRIPT]
  }
]
