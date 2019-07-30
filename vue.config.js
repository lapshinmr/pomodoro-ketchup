module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/pomodoro-ketchup/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/styles/_variables.sass";`
      }
    }
  }

};
