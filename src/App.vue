<template>
  <div class="container-fluid root" :style="COLORS">
    <div class="row">
      <div class="col-12 fill-screen-height">
        <timer-title :title="title"></timer-title>

        <github-link></github-link>

        <div class="navigation d-flex">
          <router-link to="/" v-if="$router.currentRoute.path !== '/'" class="btn-round">
            <i class="far fa-clock"></i>
          </router-link>
          <router-link to="/statistic" v-else class="btn-round">
            <i class="far fa-chart-bar"></i>
          </router-link>

          <!-- SETTINGS -->
          <button class="btn-round" @click="isSettingsMode = !isSettingsMode">
            <i v-if="!isSettingsMode" class="fas fa-cog"></i>
            <i v-else class="fas fa-times"></i>
          </button>
          <transition name="slide">
            <div v-if="isSettingsMode" class="settings__elements d-flex ml-2">
              <component
                v-for="item in components"
                :is="item + '-settings'"
                :key="item"
                class="list-item"
                :is-settings-mode="isSettingsMode"
              ></component>
            </div>
          </transition>
        </div>

        <transition name="fade" mode="out-in">
          <router-view :isSettingsMode="isSettingsMode"/>
        </transition>

      </div>
    </div>
  </div>
</template>

<script>
import TimerTitle from '@/components/TimerTitle.vue';
import GithubLink from '@/components/GithubLink.vue';
import ColorSettings from '@/components/settings/ColorSettings.vue'
import SoundSettings from '@/components/settings/SoundSettings.vue'
import ProgressSettings from '@/components/settings/ProgressSettings.vue'
import TitleSettings from '@/components/settings/TitleSettings.vue'
import NotificationSettings from '@/components/settings/NotificationSettings.vue'
import SyncSettings from '@/components/settings/SyncSettings.vue'
import { mapState, mapGetters, mapActions } from 'vuex';
import { TAB_TITLE_DEFAULT } from './constants';

export default {
  components: {
    TimerTitle,
    GithubLink,
    ColorSettings,
    SoundSettings,
    ProgressSettings,
    TitleSettings,
    NotificationSettings,
    SyncSettings,
  },
  data() {
    return {
      isSettingsMode: false,
      components: ['color', 'sound', 'progress', 'title', 'notification', 'sync']
    }
  },
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
body
  font-family: Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  margin: 0
  padding: 0

.root
  color: var(--super-dark)
  background-color: var(--super-light)

.navigation
  position: absolute
  left: 5px
  top: 5px
  padding: 0
  z-index: 1000

// COMMON TOOLS
.fill-screen-height
  height: 100vh

.fill-screen-width
  width: 100vw

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

.btn-round
  position: relative
  display: flex
  justify-content: center
  align-items: center
  width: 6vh
  height: 6vh
  font-size: 3.5vh
  margin-left: 3px
  border: none
  border-radius: 50%
  cursor: pointer
  transition: all 0.15s
  color: var(--super-light)
  background-color: var(--dark)
  &:hover
    background-color: var(--primary)
    color: var(--super-light)
    text-decoration: none
  &:first-child
    margin-left: 0
  &:focus
    outline: none

.btn-large
  width: 8vh
  height: 8vh


.noselect
  -webkit-touch-callout: none
  -webkit-user-select: none
  -khtml-user-select: none
  -moz-user-select: none
  -ms-user-select: none
  user-select: none


// TRANSITIONS
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
