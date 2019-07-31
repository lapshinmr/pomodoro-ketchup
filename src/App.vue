<template>
  <div id="app">
    <div id="nav" class="p-4">
      <router-link to="/">Home</router-link> |
      <!--
      <router-link to="/about">About</router-link> |
      -->
      <router-link to="/settings">Settings</router-link>
    </div>
    <div id="content">
      <router-view />
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
      this.$store.dispatch('setPomodorosGoal');
      this.$store.dispatch('setTime');
      this.$store.dispatch('loadPomodoros');
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
    height: 15vh
    z-index: 999

  #content
    height: 85vh

  #nav a
    font-weight: bold
    font-size: 20px
    color: $super-dark
    z-index: 999

  #nav a.router-link-exact-active
    color: $dark

  .btn-outline-success
    color: $dark
    border-color: $dark
    outline: $dark

  .btn-outline-success:hover
    color: $super-light
    border-color: $dark
    background-color: $dark

  .btn-outline-success:focus
    outline: none
    box-shadow: 0 0 0 0.2rem $primary

  .btn-link
    color: $dark

  .btn-link:hover
    color: $super-dark
    text-decoration: none

  .btn-link:focus
    outline: none
    text-decoration: none

</style>
