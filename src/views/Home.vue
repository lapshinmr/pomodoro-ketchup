<template>
  <div class="content-container d-flex align-items-center justify-content-center">
    <pomodoros-bar></pomodoros-bar>
    <timer-bar>
      <timer-time :is-settings-mode="isSettingsMode">
        <pomodoros-indicator v-if="!isSettingsMode"></pomodoros-indicator>
        <pomodoros-settings v-else></pomodoros-settings>
      </timer-time>
    </timer-bar>
    <button
      v-if="pomodorosTotal"
      class="pomodoros-reset-button btn btn-link"
      @click="setPomodorosTotal(0)"
    >
      Reset
    </button>
    <button
      class="settings-button btn btn-link"
      @click="isSettingsMode = !isSettingsMode"
    >
      <i v-if="!isSettingsMode" class="fas fa-cog"></i>
      <i v-else class="fas fa-check"></i>
    </button>
    <color-settings v-if="isSettingsMode" class="color-settings"></color-settings>
    <sound-settings v-if="isSettingsMode" class="sound-settings"></sound-settings>
  </div>
</template>

<script>
import TimerTime from '@/components/TimerTime.vue'
import TimerBar from '@/components/TimerBar.vue'
import PomodorosBar from '@/components/PomodorosBar.vue'
import PomodorosIndicator from '@/components/PomodorosIndicator.vue'
import ColorSettings from '@/components/settings/ColorSettings.vue'
import SoundSettings from '@/components/settings/SoundSettings.vue'
import PomodorosSettings from '@/components/settings/PomodorosSettings.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    TimerTime, TimerBar, PomodorosBar, PomodorosIndicator, ColorSettings, SoundSettings,
    PomodorosSettings
  },
  data() {
    return {
      isSettingsMode: false
    }
  },
  computed: {
    ...mapState([
      'pomodorosTotal'
    ])
  },
  methods: {
    ...mapActions([
      'setPomodorosTotal'
    ])
  }
}
</script>

<style lang="sass" scoped>
.content-container
  position: relative
  width: 100%
  height: 100%

.settings-button
  position: absolute
  top: 1vh
  left: 2vh
  padding: 0
  z-index: 1000
  font-size: 6vh
  color: var(--dark)
  &:hover
    color: var(--super-dark)

.pomodoros-reset-button
  position: absolute
  bottom: 0
  right: 0
  z-index: 1000
  font-size: 4vh
  color: var(--dark)
  &:hover
    color: var(--super-dark)

.color-settings
  position: absolute
  top: 10vh
  left: 2.5vh

.sound-settings
  position: absolute
  top: 2.75vh
  left: 9vh

</style>
