<template>
  <div id="app" class="container-fluid">
    <div class="row" id="navbody">
      <div id="nav" class="col-sm-8 offset-sm-2 p-4">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
        <router-link to="/settings">Settings</router-link>
      </div>
      <div class="col-sm-8 offset-sm-2">
        <router-view />
      </div>
    </div>
    <timer-title :time="time"></timer-title>
  </div>
</template>

<script>
  import TimerTitle from '@/components/TimerTitle.vue'

  export default {
    components: {
        TimerTitle
    },
    computed: {
        time() {
            return this.$store.getters.getTimeFormatted
        }
    },
    created() {
      this.$store.dispatch('setInitTime');
      this.$store.dispatch('setTime')
    }
  }
</script>

<style lang="sass">

  html
    padding: 0
    margin: 0
    height: 100%

  body
    position: relative
    padding: 0
    margin: 0
    min-height: 100%
    background-color: $super-light

  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: $super-dark
    height: 100vh

  #nav
    z-index: 999

  #nav a
    font-weight: bold
    color: $super-dark

  #nav a.router-link-exact-active
    color: $primary

  #navbody
    height: 100%

  .btn-outline-success
    color: $primary
    border-color: $primary

  .btn-outline-success:hover
    color: $super-light
    border-color: $primary
    background-color: $primary

</style>
