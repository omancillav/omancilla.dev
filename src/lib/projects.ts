import { TAGS } from './tags'
import VetSyncImage from '@/assets/img/vetsync.webp'
import CutflyImage from '@/assets/img/cutfly.webp'
import BalooImage from '@/assets/img/fotos.webp'
import ReaddImage from '@/assets/img/readd.webp'

export const PROJECTS = [
  {
    title: 'Readd - Biblioteca personal para lectores',
    description:
      'Aplicación móvil fullstack desarrollada con React Native y Expo para gestionar una biblioteca personal de libros. Permite buscar o registrar lecturas, organizarlas por estado, seguir el progreso, guardar reseñas y consultar estadísticas personales.',
    link: 'https://readdapp.com',
    github: 'https://github.com/omancillav/readd',
    image: ReaddImage,
    tags: [TAGS.REACT, TAGS.EXPO, TAGS.NODE, TAGS.EXPRESS, TAGS.SUPABASE, TAGS.SUPABASE, TAGS.JWT]
  },
  {
    title: 'Vet Sync - Gestión de citas veterinarias para mascotas',
    description:
      'Vet Sync es una aplicación web desarrollada con React y Tailwind CSS para gestionar clínicas veterinarias. Permite agendar citas, administrar expedientes de mascotas y controlar accesos por roles con una interfaz moderna y responsive.',
    link: 'https://vetsyncapp.vercel.app',
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
    title: 'Baloo Fotos - Generador de layouts para impresión',
    description:
      'Aplicación web en Next.js para subir, recortar y organizar fotos en layouts listos para impresión. Incluye generador de fotos infantiles, collage automático y personalizado, vista previa en tiempo real, exportación a PDF/PNG/JPG a 300 DPI y opción de compartir archivos desde el navegador.',
    link: 'https://fotosbaloo.vercel.app',
    github: 'https://github.com/omancillav/foto-layout',
    image: BalooImage,
    tags: [TAGS.NEXT, TAGS.REACT, TAGS.TAILWIND, TAGS.TYPESCRIPT]
  }
]
