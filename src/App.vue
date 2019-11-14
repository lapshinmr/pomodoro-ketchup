<template>
  <div class="root" :style="COLORS">
    <timer-title :title="title"></timer-title>
    <github-link></github-link>


    <!--
    <div class="navigation">
      <router-link to="/">
        <i class="fas fa-chevron-circle-left"></i>
      </router-link> |
      <router-link to="/statistic" class="settings__element ">
        <i class="far fa-chart-bar"></i>
      </router-link>
    </div>
    -->

    <transition name="slide">
      <router-view />
    </transition>
  </div>
</template>

<script>
import TimerTitle from '@/components/TimerTitle.vue';
import GithubLink from '@/components/GithubLink.vue';
import { mapState, mapGetters, mapActions } from 'vuex';
import { TAB_TITLE_DEFAULT } from './constants';

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
    this.startTimer()

  },
  methods: {
    ...mapActions([
      'startTimer',
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

.navigation, .github-corner
  @media (max-height: 400px)
    display: none

.navigation
  position: absolute
  left: 5px
  top: 5px

  a
    font-weight: bold
    font-size: 20px
    color: var(--super-dark)
    text-decoration: none

    &.router-link-exact-active
      color: var(--dark)

.btn-success
  color: var(--super-light)
  border-color: var(--dark)
  background-color: var(--dark)

  &:hover
    color: var(--super-light)
    border-color: var(--super-dark)
    background-color: var(--super-dark)

  &:focus, &.focus
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

  &:hover
    color: var(--super-dark)!important
    text-decoration: none

  &:focus
    outline: none
    text-decoration: none

.noselect
  -webkit-touch-callout: none
  -webkit-user-select: none
  -khtml-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none

.fade-enter
  opacity: 0

.fade-enter-active
  transition: opacity 0.3s

.fade-leave

.fade-leave-active
  opacity: 0
  transition: opacity 0.3s

.slide-enter
    opacity: 0

.slide-enter-active
    animation: slide-in .3s ease-out forwards
    transition: opacity .3s

.slide-leave

.slide-leave-active
    animation: slide-out .3s ease-out forwards
    transition: opacity .3s
    opacity: 0

@keyframes slide-in
  from
    transform: translateX(-30px)
  to
    transform: translateX(0)

@keyframes slide-out
  from
    transform: translateX(0px)
  to
    transform: translateX(-30px)

.line-enter
  width: 0%!important

.line-enter-active
  transition: all 0.3s

.line-leave

.line-leave-active
  width: 0%!important
  transition: all 0.3s
</style>
