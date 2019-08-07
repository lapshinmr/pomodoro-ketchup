<template>
  <div id="app" class="blue">
    <div id="nav" class="text-center p-4">
      <router-link to="/">Home</router-link> |
      <!--
      <router-link to="/about">About</router-link> |
      -->
      <router-link to="/settings">Settings</router-link>
    </div>
    <div id="content">
      <router-view />
    </div>
    <timer-title :title="title"></timer-title>
  </div>
</template>

<script>
  import TimerTitle from '@/components/TimerTitle.vue';
  import { mapState, mapGetters, mapActions } from 'vuex';
  import { TAB_TITLE_DEFAULT } from './constants'

  export default {
    components: { TimerTitle },
    computed: {
      ...mapState([
        'isTimerTitle'
      ]),
      ...mapGetters([
        'CUR_TIME_FORMATTED'
      ]),
      title() {
        return this.isTimerTitle ? this.CUR_TIME_FORMATTED : TAB_TITLE_DEFAULT
      }
    },
    created() {
      this.setPomodorosGoal();
      this.setTime();
      this.loadVars();
    },
    methods: {
      ...mapActions([
        'setPomodorosGoal',
        'setTime',
        'loadVars'
      ])
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
