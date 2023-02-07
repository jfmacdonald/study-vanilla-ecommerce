const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite')

module.exports = function (eleventyConfig) {
  eleventyConfig.setServerPassthroughCopyBehavior('copy')

  // Layouts
  eleventyConfig.addLayoutAlias('base', 'base.njk')

  // Copy/pass-through files
  eleventyConfig.addPassthroughCopy('public')
  eleventyConfig.addPassthroughCopy('src/css')
  eleventyConfig.addPassthroughCopy('src/js')

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
      // assetsInclude: ['**/*.xml', '**/*.txt'],
      build: {
        minify: false,
        sourcemap: false,
        manifest: true
        // // This puts CSS and JS in subfolders – remove if you want all of it to be in /assets instead
        // rollupOptions: {
        //   output: {
        //     assetFileNames: 'assets/[name].[ext]',
        //     chunkFileNames: 'assets/[name].js',
        //     entryFileNames: 'assets/[name].js'
        //   }
        // }
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
