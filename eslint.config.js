import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      // El patrón "setLoading(true); fetch().then(...).finally(...)" dentro de
      // useEffect es el estándar para traer datos (Firebase/fetch) y es el que
      // se usa en todo el curso; esta regla nueva lo marca como error aunque
      // sea el patrón correcto.
      'react-hooks/set-state-in-effect': 'off',
      // Los archivos de Context (AuthContext, CarritoContext) exportan a
      // propósito el Provider y su hook (useAuth/useCarrito) juntos, patrón
      // estándar de Context API.
      'react-refresh/only-export-components': 'off',
    },
  },
])
