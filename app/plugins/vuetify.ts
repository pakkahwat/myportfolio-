import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

// Palette lifted directly from the source CV so the site keeps the
// same "developer terminal / GitHub-dark + amber" identity.
const codeDark = {
  dark: true,
  colors: {
    background: '#080C10',
    surface: '#161B22',
    'surface-bright': '#1C2330',
    'surface-light': '#1C2330',
    'surface-variant': '#21262D',
    'on-surface-variant': '#8B949E',

    primary: '#F5A623', // amber
    'primary-darken-1': '#C47F0E', // amber-dim
    secondary: '#58A6FF', // blue
    'secondary-darken-1': '#388BFD',
    success: '#3FB950', // green
    info: '#58A6FF',
    warning: '#F5A623',
    error: '#F85149',

    'on-background': '#E6EDF3',
    'on-surface': '#E6EDF3',
    'on-primary': '#0D1117',
    'on-secondary': '#0D1117',
  },
  variables: {
    'border-color': '#21262D',
    'border-opacity': 1,
    'theme-line': '#21262D',
    'theme-text-muted': '#8B949E',
    'theme-text-dim': '#484F58',
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    theme: {
      defaultTheme: 'codeDark',
      themes: { codeDark },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: { mdi },
    },
    defaults: {
      VCard: {
        rounded: 'lg',
        flat: true,
      },
      VChip: {
        rounded: 'md',
      },
      VBtn: {
        rounded: 'lg',
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
