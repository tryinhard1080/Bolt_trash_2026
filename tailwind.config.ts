import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'Times New Roman', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        // Fluid display scale — one definition, no media-query gymnastics
        'display-4': ['clamp(2.85rem, 7.4vw, 6rem)', { lineHeight: '0.92', letterSpacing: '-0.035em' }],
        'display-3': ['clamp(2.15rem, 4.6vw, 3.5rem)', { lineHeight: '0.98', letterSpacing: '-0.028em' }],
        'display-2': ['clamp(1.65rem, 3vw, 2.35rem)', { lineHeight: '1.04', letterSpacing: '-0.022em' }],
        'display-1': ['clamp(1.25rem, 1.9vw, 1.6rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        lead: ['clamp(1rem, 1.35vw, 1.1875rem)', { lineHeight: '1.6' }],
        plate: ['0.6875rem', { lineHeight: '1.45', letterSpacing: '0.14em' }],
        micro: ['0.625rem', { lineHeight: '1.4', letterSpacing: '0.16em' }],
      },
      letterSpacing: {
        plate: '0.14em',
        micro: '0.18em',
        tightest: '-0.04em',
      },
      lineHeight: {
        dense: '1.18',
        measure: '1.65',
      },
      spacing: {
        gutter: 'clamp(1.15rem, 4vw, 2.75rem)',
        stack: 'clamp(3.5rem, 8vw, 7rem)',
        rule: '0.5px',
      },
      maxWidth: {
        '8xl': '88rem',
        measure: '42rem',
        '2xs': '16rem',
      },
      screens: {
        xs: '480px',
      },
      transitionDuration: {
        '600': '600ms',
        '900': '900ms',
        '1200': '1200ms',
        '2200': '2200ms',
        '2600': '2600ms',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      opacity: Object.fromEntries(
        Array.from({ length: 19 }, (_, i) => [String((i + 1) * 5), String(((i + 1) * 5) / 100)])
      ),
      minHeight: {
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
        '11': '2.75rem',
        '12': '3rem',
        '14': '3.5rem',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        plate: '2px',
      },
      colors: {
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        // Editorial additions
        ink: {
          DEFAULT: 'hsl(var(--ink) / <alpha-value>)',
          soft: 'hsl(var(--ink-soft) / <alpha-value>)',
        },
        paper: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          deep: 'hsl(var(--paper-deep) / <alpha-value>)',
        },
        rule: 'hsl(var(--rule) / <alpha-value>)',
        scrim: 'hsl(var(--scrim) / <alpha-value>)',
        lime: 'hsl(var(--lime) / <alpha-value>)',
        survey: 'hsl(var(--survey) / <alpha-value>)',
        rust: 'hsl(var(--rust) / <alpha-value>)',
        ok: 'hsl(var(--ok) / <alpha-value>)',
      },
      boxShadow: {
        paper: '0 1px 2px hsl(var(--shadow-color) / 0.05), 0 6px 18px hsl(var(--shadow-color) / 0.06)',
        lifted: '0 2px 4px hsl(var(--shadow-color) / 0.06), 0 14px 34px hsl(var(--shadow-color) / 0.1)',
        deep: '0 4px 10px hsl(var(--shadow-color) / 0.08), 0 26px 60px hsl(var(--shadow-color) / 0.16)',
        plate: 'inset 0 0 0 0.5px hsl(var(--rule))',
        glow: '0 0 0 1px hsl(var(--lime) / 0.35), 0 8px 32px -6px hsl(var(--lime) / 0.45)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
        'line-rise': {
          from: { transform: 'translateY(115%) rotate(1.5deg)' },
          to: { transform: 'translateY(0) rotate(0deg)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1.06) translate3d(0, 0, 0)' },
          '100%': { transform: 'scale(1.16) translate3d(-1.6%, -1.8%, 0)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        drift: {
          '0%': { backgroundPosition: '0 0, 0 0, 0 0' },
          '100%': { backgroundPosition: '640px 420px, -520px 300px, 200px -180px' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
        sheen: {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)' },
          '100%': { transform: 'translateX(240%) skewX(-18deg)' },
        },
        'draw-in': {
          from: { strokeDashoffset: '1' },
          to: { strokeDashoffset: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        'scroll-cue': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '35%': { opacity: '1' },
          '100%': { transform: 'translateY(180%)', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up': 'fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
        'fade-in': 'fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
        'scale-in': 'scale-in 0.45s cubic-bezier(0.16, 1, 0.3, 1) both',
        'line-rise': 'line-rise 1s cubic-bezier(0.16, 1, 0.3, 1) both',
        kenburns: 'kenburns 26s ease-in-out infinite alternate',
        marquee: 'marquee 42s linear infinite',
        drift: 'drift 90s linear infinite alternate',
        blink: 'blink 2.4s ease-in-out infinite',
        sheen: 'sheen 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 40s linear infinite',
        'scroll-cue': 'scroll-cue 2.6s cubic-bezier(0.65, 0, 0.35, 1) infinite',
      },
      transitionTimingFunction: {
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
        spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        plate: 'cubic-bezier(0.22, 0.61, 0.36, 1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
