import type { Preset } from 'unocss'
import {
  defineConfig,
  presetAttributify,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import presetTheme from 'unocss-preset-theme'
import { themeConfig } from './src/config'

const { light, dark } = themeConfig.color

export default defineConfig({
  transformers: [
    transformerDirectives(),     // ← هذا هو المهم لدعم --at-apply
    transformerVariantGroup(),
  ],

  safelist: [
    'text-7',
    'text-6',
    'text-5',
    'text-4.5',
    'text-4',
    'c-primary',
    'c-secondary',
    'bg-secondary/5',
    'border-secondary/25',
  ],

  presets: [
    presetWind3(),
    presetAttributify(),
    presetTheme({
      theme: {
        dark: {
          colors: {
            ...dark,
            note: 'oklch(70.7% 0.165 254.624 / 0.8)',
            tip: 'oklch(76.5% 0.177 163.223 / 0.8)',
            important: 'oklch(71.4% 0.203 305.504 / 0.8)',
            warning: 'oklch(82.8% 0.189 84.429 / 0.8)',
            caution: 'oklch(70.4% 0.191 22.216 / 0.8)',
          },
        },
      },
    }) as Preset<object>,
  ],

  theme: {
    colors: {
      ...light,
      note: 'oklch(48.8% 0.243 264.376 / 0.8)',
      tip: 'oklch(50.8% 0.118 165.612 / 0.8)',
      important: 'oklch(49.6% 0.265 301.924 / 0.8)',
      warning: 'oklch(55.5% 0.163 48.998 / 0.8)',
      caution: 'oklch(50.5% 0.213 27.518 / 0.8)',
    },
    fontFamily: {
      title: ['Snell-Black', 'EarlySummer-Subset', 'EarlySummer', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      navbar: ['STIX-Italic', 'EarlySummer-Subset', 'EarlySummer', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
      time: ['Inter', 'sans-serif'],
      serif: ['STIX', 'EarlySummer', 'ui-serif', 'Georgia', 'Cambria', 'Times New Roman', 'Times', 'serif'],
    },
  },

  rules: [
    ['scrollbar-hidden', {
      'scrollbar-width': 'none',
      '-ms-overflow-style': 'none',
    }],
  ],

  shortcuts: {
    'uno-desktop-column': 'fixed right-[max(5rem,calc(50vw-35rem))] w-14rem',
    'uno-decorative-line': 'mb-4.5 h-0.25 w-10 bg-secondary/25 lg:(mb-6 w-11)',
    'uno-round-border': 'border border-secondary/5 rounded border-solid',
  },

  variants: [
    (matcher) => {
      if (!matcher.startsWith('cjk:')) return matcher

      return {
        matcher: matcher.slice(4),
        selector: s => `${s}:is(:lang(zh), :lang(ja), :lang(ko))`,
      }
    },
  ],
})
