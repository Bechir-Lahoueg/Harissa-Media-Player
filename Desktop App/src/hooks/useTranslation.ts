import { createContext, useContext } from 'react'
import type { Strings } from '../lib/i18n'

export interface Translation {
  /** Resolved base language, e.g. "fr". Always one we have a dictionary for. */
  language: string
  /** The active dictionary. */
  t: Strings
  /** Fills {name} placeholders in a string from the dictionary. */
  f: (template: string, values: Record<string, string | number>) => string
  /** Singular/plural form for a count, using the active language's rules. */
  n: (count: number, one: string, other: string) => string
}

export const TranslationContext = createContext<Translation | null>(null)

export function useTranslation(): Translation {
  const value = useContext(TranslationContext)
  if (!value) {
    throw new Error('useTranslation must be used inside TranslationProvider')
  }
  return value
}
