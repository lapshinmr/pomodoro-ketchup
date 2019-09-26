<template>
  <div class="root" :style="COLORS">
    <timer-title :title="title"></timer-title>
    <github-link></github-link>
    <div class="navigation text-center">
      <router-link to="/">Home</router-link> |
      <router-link to="/settings">Settings</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import TimerTitle from '@/components/TimerTitle.vue'
import GithubLink from '@/components/GithubLink.vue'
import { mapState, mapGetters, mapActions } from 'vuex'
import { TAB_TITLE_DEFAULT } from './constants'

export default {
  components: { TimerTitle, GithubLink },
  computed: {
    ...mapState([
      'isTimerTitle'
    ]),
    ...mapGetters([
      'CUR_TIME_FORMATTED',
      'COLORS'
    ]),
    title () {
      return this.isTimerTitle ? this.CUR_TIME_FORMATTED : TAB_TITLE_DEFAULT
    }
  },
  created () {
    this.loadVars()
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
    height: 100vh
    width: 100vw

  body
    position: relative
    padding: 0
    margin: 0
    height: 100%
    width: 100%
    line-height: 1

  .root
    height: 100%
    width: 100%
    font-family: Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    background-color: var(--super-light)
    color: var(--super-dark)

  .navigation
    position: absolute
    left: 0
    right: 0
    top: 3vh
    z-index: 500

  .navigation, .github-corner
    @media (max-height: 400px)
      display: none


  .navigation a
    font-weight: bold
    font-size: 20px
    color: var(--super-dark)

  .navigation a.router-link-exact-active
    color: var(--dark)

  .btn-success
    color: var(--super-light)
    border-color: var(--dark)
    background-color: var(--dark)

  .btn-success:hover
    color: var(--super-light)
    border-color: var(--super-dark)
    background-color: var(--super-dark)

  .btn-success:focus, .btn-success.focus
    box-shadow: none

  .btn-success:not(:disabled):not(.disabled):active,
  .btn-success:not(:disabled):not(.disabled).active,
  .show > .btn-success.dropdown-toggle
      color: var(--super-light)
      background-color: var(--dark)
      border-color: var(--dark)

  .btn-success:not(:disabled):not(.disabled):active:focus,
  .btn-success:not(:disabled):not(.disabled).active:focus,
  .show > .btn-success.dropdown-toggle:focus
    box-shadow: none

  .btn-link
    color: var(--dark)

  .btn-link:hover
    color: var(--super-dark)
    text-decoration: none

  .btn-link:focus
    outline: none
    text-decoration: none
</style>
