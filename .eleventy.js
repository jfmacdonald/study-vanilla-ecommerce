const { fileURLToPath, URL } = require('node:url')
const path = require('node:path')
const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite')

module.exports = function (eleventyConfig) {
  eleventyConfig.setServerPassthroughCopyBehavior('copy')

  // Layouts
  eleventyConfig.addLayoutAlias('base', 'base.njk')

  // Copy/pass-through files
  eleventyConfig.addPassthroughCopy('public')
  eleventyConfig.addPassthroughCopy('src/css')
  eleventyConfig.addPassthroughCopy('src/js')

  eleventyConfig.addWatchTarget('./src/css/')
  eleventyConfig.addWatchTarget('./src/js/')

  // Plugins
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: '.11ty-vite', // Default name of the temp folder

    // Vite options (equal to vite.config.js inside project root)
    viteOptions: {
      publicDir: 'public',
      base: './',
      resolve: {
        alias: {
          '@': path.join(__dirname, 'src')
          // '@': fileURLToPath(new URL('./src', import.meta.url))
        }
      },
      clearScreen: false,
      server: {
        mode: 'development',
        middlewareMode: true
      },
      appType: 'custom',
      // assetsInclude: ['**/*.xml', '**/*.txt'],
      build: {
        minify: false,
        sourcemap: false,
        manifest: true,
        rollupOptions: {
          output: {
            assetFileNames: 'assets/[name].[hash].[ext]',
            chunkFileNames: 'assets/[name].[hash].js',
            entryFileNames: 'assets/[name].[hash].js'
          }
        }
      }
    }
  })

  return {
    templateFormats: ['njk', 'html'],
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      data: '_data'
    }
  }
}
