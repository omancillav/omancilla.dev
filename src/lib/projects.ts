import { TAGS } from './tags'
import VetSyncImage from '@/assets/img/vetsync.webp'
import CutflyImage from '@/assets/img/cutfly.webp'
import BalooImage from '@/assets/img/fotos.webp'

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
    title: 'Baloo Fotos - Generador de Layouts para fotos infantiles',
    description:
      'Aplicación web en Next.js para generar layouts de fotos tamaño infantil (2.5cm × 3cm), con recorte, vista previa y exportación a PDF/PNG en alta calidad para impresión.',
    link: 'https://fotosbaloo.vercel.app',
    github: 'https://github.com/omancillav/foto-layout',
    image: BalooImage,
    tags: [TAGS.NEXT, TAGS.REACT, TAGS.TAILWIND, TAGS.TYPESCRIPT]
  }
]
