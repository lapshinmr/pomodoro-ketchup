<template>
  <div class="content-container d-flex align-items-center justify-content-center">
    <!-- POMODOROS PROGRESS BAR -->
    <transition name="fade">
      <pomodoros-bar v-if="goalIndicatorFormat !== 3"></pomodoros-bar>
    </transition>

    <!-- TIMER WITH PROGRESS BAR -->
    <timer-bar>
      <timer-time :is-settings-mode="isSettingsMode">
        <pomodoros-indicator :is-settings-mode="isSettingsMode"></pomodoros-indicator>
      </timer-time>
      <progress-settings slot="progress-settings" class="progress-settings"></progress-settings>
    </timer-bar>

    <!-- SETTINGS -->
    <div class="settings d-flex align-items-start">
      <div class="settings__element settings__button" @click="isSettingsMode = !isSettingsMode">
        <i v-if="!isSettingsMode" class="fas fa-cog"></i>
        <i v-else class="fas fa-times"></i>
      </div>
      <transition name="slide">
        <div v-if="isSettingsMode" class="settings__elements d-flex">
          <component
            v-for="item in components"
            :is="item + '-settings'"
            :key="item"
            class="list-item"
          ></component>
        </div>
      </transition>
    </div>

  </div>
</template>

<script>
import TimerTime from '@/components/TimerTime.vue'
import TimerBar from '@/components/TimerBar.vue'
import PomodorosBar from '@/components/PomodorosBar.vue'
import PomodorosIndicator from '@/components/PomodorosIndicator.vue'
import ColorSettings from '@/components/settings/ColorSettings.vue'
import SoundSettings from '@/components/settings/SoundSettings.vue'
import ProgressSettings from '@/components/settings/ProgressSettings.vue'
import TitleSettings from '@/components/settings/TitleSettings.vue'
import NotificationSettings from '@/components/settings/NotificationSettings.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    TimerTime, TimerBar, PomodorosBar, PomodorosIndicator, ColorSettings, SoundSettings,
    ProgressSettings, TitleSettings, NotificationSettings
  },
  data() {
    return {
      isSettingsMode: false,
      components: ['color', 'sound', 'progress', 'title', 'notification']
    }
  },
  computed: {
    ...mapState([
      'pomodorosTotal',
      'goalIndicatorFormat'
    ])
  }
}
</script>

<style lang="sass">
.content-container
  position: relative
  width: 100%
  height: 100%

.settings
  position: absolute
  left: 5px
  top: 5px
  padding: 0
  z-index: 1000

  .settings__button
    margin-right: 10px

  .settings__element
    position: relative
    display: flex
    justify-content: center
    align-items: center
    height: 6vh
    width: 6vh
    font-size: 3.5vh
    margin-left: 3px
    border-radius: 50%
    cursor: pointer
    transition: all 0.15s
    color: var(--super-light)
    background-color: var(--primary)
    &:hover
      background-color: var(--dark)

</style>
