import { useEffect, useMemo, useState } from 'react'
import { TranslationContext, type Translation } from '../hooks/useTranslation'
import { format, isRightToLeft, plural, resolveLanguage, stringsFor } from '../lib/i18n'

/**
 * Resolves the UI language from the Windows display language and applies it to
 * the document, including writing direction for right-to-left languages.
 */
export function TranslationProvider({ children }: { children: React.ReactNode }) {
  // navigator.language is a reasonable first paint; the main process then
  // reports the actual Windows display language, which is authoritative.
  const [language, setLanguage] = useState(() => resolveLanguage(navigator.language || 'en'))

  useEffect(() => {
    let cancelled = false
    void window.harissa
      .getLocale()
      .then((locale) => {
        if (!cancelled) setLanguage(resolveLanguage(locale))
      })
      .catch(() => {
        // Keep the navigator-derived language if the main process cannot answer.
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Drives the layout direction and the reading order assistive technology reports.
  useEffect(() => {
    document.documentElement.lang = language
    document.documentElement.dir = isRightToLeft(language) ? 'rtl' : 'ltr'
  }, [language])

  const value = useMemo<Translation>(
    () => ({
      language,
      t: stringsFor(language),
      f: format,
      n: (count, one, other) => plural(language, count, one, other),
    }),
    [language],
  )

  return <TranslationContext value={value}>{children}</TranslationContext>
}
