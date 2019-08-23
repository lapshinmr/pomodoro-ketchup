module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', // change this if you need static files from project folder
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/_variables.sass";`
      }
    }
  }
}
