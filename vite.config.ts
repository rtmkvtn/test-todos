import react from '@vitejs/plugin-react'

import path from 'path'
import { AliasOptions } from 'vite'
import vitePluginSvgr from 'vite-plugin-svgr'
import { defineConfig } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginSvgr({
      include: '**/*.svg?react',
    }),
  ],
  test: {
    include: ['**/*.test.tsx'],
    globals: true,
    environment: 'jsdom',
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      },
    },
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@helpers': path.resolve(__dirname, './src/helpers'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@t': path.resolve(__dirname, './src/types'),
    } as AliasOptions,
  },
})
