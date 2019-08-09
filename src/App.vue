<template>
  <div id="app" class="blue" :style="COLORS">
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
        'isTimerTitle',
      ]),
      ...mapGetters([
        'CUR_TIME_FORMATTED',
        'COLORS'
      ]),
      title() {
        return this.isTimerTitle ? this.CUR_TIME_FORMATTED : TAB_TITLE_DEFAULT
      },
    },
    created() {
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

  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    height: 100vh
    background-color: var(--super-light)
    color: var(--super-dark)

  #nav
    height: 15%
    z-index: 999

  #content
    height: 85%

  #nav a
    font-weight: bold
    font-size: 20px
    color: var(--super-dark)

  #nav a.router-link-exact-active
    color: var(--dark)

  .btn-outline-success
    color: var(--dark)
    border-color: var(--dark)
    outline: var(--dark)

  .btn-outline-success:hover
    color: var(--super-light)
    border-color: var(--dark)
    background-color: var(--dark)

  .btn-outline-success:focus
    outline: none
    box-shadow: 0 0 0 0.2rem var(--primary)

  .btn-link
    color: var(--dark)

  .btn-link:hover
    color: var(--super-dark)
    text-decoration: none

  .btn-link:focus
    outline: none
    text-decoration: none

</style>
