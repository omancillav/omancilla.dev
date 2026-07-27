import { ui, defaultLang, type Lang } from './ui'

export function getLangFromUrl (url: URL): Lang {
  const [, lang] = url.pathname.split('/')
  if (lang in ui) return lang as Lang
  return defaultLang
}

export function useTranslations (lang: Lang) {
  return function t (key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] ?? ui[defaultLang][key]
  }
}

export function getLocalizedPath (url: URL, lang: Lang): string {
  const currentLang = getLangFromUrl(url)
  const path = url.pathname.replace(new RegExp(`^/${currentLang}(/|$)`), '/')
  const cleanPath = path === '/' ? '' : path

  return lang === defaultLang ? `${cleanPath}${url.hash}` || '/' : `/${lang}${cleanPath}${url.hash}`
}
