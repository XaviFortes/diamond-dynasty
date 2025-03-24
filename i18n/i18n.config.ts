import type { LocaleObject } from '@nuxtjs/i18n'

// i18n.config.ts

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    defaultLocale: 'en',
    fallbackLocale: 'en',
    locales: [
        {
            code: 'en',
            name: 'English',
            file: 'en.json'
        },
        {
            code: 'es',
            name: 'Español',
            file: 'es.json'
        }
        // Add more locales as needed
    ],
    lazy: true,
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
        useCookie: true,
        cookieKey: 'i18n_locale',
        redirectOn: 'root',
    }
}))