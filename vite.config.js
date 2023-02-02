import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(() => {
  const config = {
    base: './',
    build: {
      minify: false,
      manifest: true,
      outDir: './dist',
      rollupOptions: {
        output: {
          entryFileNames: `assets/[name].js`,
          chunkFileNames: `assets/[name].js`,
          assetFileNames: `assets/[name].[ext]`
        }
      }
    }
  }
  return config
})
