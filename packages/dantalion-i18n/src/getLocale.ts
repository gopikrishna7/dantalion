import semverGte from 'semver/functions/gte';

/**
 * Get the locale information from the Intl API.
 *
 * If the environment is on NodeJS and does not have Full-ICU,
 * it may get the default results.
 * @returns The locale string e.g. `en-US`.
 */
const getLocaleFromIntlApi = () =>
  Intl?.DateTimeFormat?.()?.resolvedOptions?.()?.locale;

/**
 * Get the locale information from the environment variables.
 *
 * If the environment variables did not found, it gets via Intl API.
 * @returns The locale string e.g. `en-US`.
 */
const getLocaleFromEnv = () => {
  const { env } = process;
  return (
    env.LC_ALL ||
    env.LC_MESSAGES ||
    env.LANG ||
    env.LANGUAGE ||
    getLocaleFromIntlApi()
  );
};

/**
 * Detect the current environment is on the NodeJS v12._1_.x or upper.
 *
 * In NodeJS v12 or later, it can get correct locale information from
 * Intl API. But also, v12._0_.x has a problem in Intl API.
 */
const isAvailableDefaultNodeICU = () => semverGte(process.version, '12.1.0');

/** Detect the current environment is on the browser. */
const isBrowser = () =>
  // eslint-disable-next-line @typescript-eslint/no-implied-eval
  !!new Function(
    'try { return this === window; } catch (e) { return false; }'
  )();

/**
 * It provides the appropriate locale information acquisition function
 * according to the current environment.
 * @returns The locale string e.g. `en-US`.
 */
export default isBrowser() || isAvailableDefaultNodeICU()
  ? getLocaleFromIntlApi
  : getLocaleFromEnv;
