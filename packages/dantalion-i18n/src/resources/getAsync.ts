import i18next, { TFunction } from 'i18next';
import getLocale from '../getLocale';
import en from './en.json';
import ja from './ja.json';

/** The language that uses as a fallback. */
export const fallbackLng = 'ja';

/**
 * Build JSON for resources.
 * @param translation resources data.
 */
const wrap = (translation: Record<string, unknown>) => ({ translation });

/**
 * Create the i18n function.
 * @param language The language.
 *
 * If omitted, the language used is detected from the current environment.
 */
const createInstance = (language?: string) =>
  i18next.init({
    fallbackLng,
    lng: language ?? getLocale(),
    debug: false,
    resources: { en: wrap(en), ja: wrap(ja) },
  });

/** Cached i18n function. */
let t: TFunction;
/** Get the cached i18n function. */
export default async (): Promise<TFunction> => {
  if (!t) {
    t = await createInstance();
  }
  return t;
};
