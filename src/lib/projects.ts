import { TAGS } from './tags'
import VetSyncImage from '@/assets/img/vetsync.webp'
import CutflyImage from '@/assets/img/cutfly.webp'
import BalooImage from '@/assets/img/fotos.webp'
import ReaddImage from '@/assets/img/readd.webp'

export const PROJECTS = [
  {
    title: {
      es: 'Readd - Biblioteca personal para lectores',
      en: 'Readd - Personal library for readers'
    },
    description: {
      es: 'Aplicación móvil fullstack desarrollada con React Native y Expo para gestionar una biblioteca personal de libros. Permite buscar o registrar lecturas, organizarlas por estado, seguir el progreso, guardar reseñas y consultar estadísticas personales.',
      en: 'Fullstack mobile app built with React Native and Expo to manage a personal book library. It lets you search or log books, organize them by status, track progress, save reviews, and check personal statistics.'
    },
    link: 'https://readdapp.com',
    github: 'https://github.com/omancillav/readd',
    image: ReaddImage,
    tags: [TAGS.REACT_NATIVE, TAGS.EXPO, TAGS.NODE, TAGS.EXPRESS, TAGS.SUPABASE, TAGS.SUPABASE, TAGS.JWT]
  },
  {
    title: {
      es: 'Cutfly - Acortador de URLs Open Source',
      en: 'Cutfly - Open Source URL shortener'
    },
    description: {
      es: 'Acortador de URLs gratuito y de código abierto construido con Next.js y TypeScript. Permite crear enlaces cortos personalizados, rastrear clicks, y gestionar todos tus enlaces desde un dashboard intuitivo.',
      en: 'Free, open-source URL shortener built with Next.js and TypeScript. It lets you create custom short links, track clicks, and manage all your links from an intuitive dashboard.'
    },
    link: 'https://cutfly.vercel.app',
    github: 'https://github.com/omancillav/cutfly',
    image: CutflyImage,
    tags: [TAGS.TYPESCRIPT, TAGS.NEXT, TAGS.TAILWIND, TAGS.SHADCN, TAGS.TURSO, TAGS.VERCEL]
  },
  {
    title: {
      es: 'Vet Sync - Gestión de citas veterinarias para mascotas',
      en: 'Vet Sync - Veterinary appointment management for pets'
    },
    description: {
      es: 'Vet Sync es una aplicación web desarrollada con React y Tailwind CSS para gestionar clínicas veterinarias. Permite agendar citas, administrar expedientes de mascotas y controlar accesos por roles con una interfaz moderna y responsive.',
      en: 'Vet Sync is a web app built with React and Tailwind CSS to manage veterinary clinics. It allows scheduling appointments, managing pet records, and controlling role-based access with a modern, responsive interface.'
    },
    link: 'https://vetsyncapp.vercel.app',
    github: 'https://github.com/omancillav/vet-sync-app',
    image: VetSyncImage,
    tags: [TAGS.REACT, TAGS.TAILWIND, TAGS.SHADCN, TAGS.SUPABASE, TAGS.NODE, TAGS.EXPRESS, TAGS.JWT]
  },
  {
    title: {
      es: 'Baloo Fotos - Generador de layouts para impresión',
      en: 'Baloo Fotos - Print layout generator'
    },
    description: {
      es: 'Aplicación web en Next.js para subir, recortar y organizar fotos en layouts listos para impresión. Incluye generador de fotos infantiles, collage automático y personalizado, vista previa en tiempo real, exportación a PDF/PNG/JPG a 300 DPI y opción de compartir archivos desde el navegador.',
      en: 'Next.js web app to upload, crop, and arrange photos into print-ready layouts. It includes a kids photo generator, automatic and custom collage, real-time preview, PDF/PNG/JPG export at 300 DPI, and the option to share files directly from the browser.'
    },
    link: 'https://fotosbaloo.vercel.app',
    github: 'https://github.com/omancillav/foto-layout',
    image: BalooImage,
    tags: [TAGS.NEXT, TAGS.REACT, TAGS.TAILWIND, TAGS.TYPESCRIPT]
  }
]
