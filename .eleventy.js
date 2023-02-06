const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite')

module.exports = function (eleventyConfig) {
  eleventyConfig.setServerPassthroughCopyBehavior('copy')
  eleventyConfig.addPassthroughCopy('public')

  // Plugins
  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: '.11ty-vite', // Default name of the temp folder

    // Vite options (equal to vite.config.js inside project root)
    viteOptions: {
      publicDir: 'public',
      base: './',
      clearScreen: false,
      server: {
        mode: 'development',
        middlewareMode: true
      },
      appType: 'custom',
      assetsInclude: ['**/*.xml', '**/*.txt'],
      build: {
        minify: false,
        sourcemap: false,
        manifest: true,
        // This puts CSS and JS in subfolders – remove if you want all of it to be in /assets instead
        rollupOptions: {
          output: {
            assetFileNames: 'assets/[name].[ext]',
            chunkFileNames: 'assets/[name].js',
            entryFileNames: 'assets/[name].js'
          }
        }
      }
    }
  })

  // Layouts
  eleventyConfig.addLayoutAlias('base', 'base.njk')

  // Copy/pass-through files
  eleventyConfig.addPassthroughCopy('src/assets/css')
  eleventyConfig.addPassthroughCopy('src/assets/js')

  return {
    templateFormats: ['md', 'njk', 'html'],
    htmlTemplateEngine: 'njk',
    passthroughFileCopy: true,
    dir: {
      input: 'src',
      // better not use "public" as the name of the output folder (see above...)
      output: 'dist',
      includes: '_includes',
      layouts: 'layouts',
      data: '_data'
    }
  }
}
