module.exports = {
  // change this if you need static files from project folder
  publicPath: process.env.NODE_ENV === 'production' ? '/pomodoro-ketchup/' : '/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/assets/styles/_variables.sass"
          @import "@/assets/styles/_mixins.sass"
        `,
      },
    },
  },
  transpileDependencies: ['vuex-persist'],
};
