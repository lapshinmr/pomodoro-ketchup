<template>
  <div class="content-container d-flex align-items-center justify-content-center">
    <pomodoros-bar></pomodoros-bar>
    <timer-bar>
      <timer-time :is-settings-mode="isSettingsMode">
        <pomodoros-settings v-if="isSettingsMode"></pomodoros-settings>
        <pomodoros-indicator :is-settings-mode="isSettingsMode"></pomodoros-indicator>
      </timer-time>
      <progress-settings slot="progress-settings" class="progress-settings"></progress-settings>
    </timer-bar>
    <button
      v-if="pomodorosTotal"
      class="pomodoros-reset-button btn btn-link"
      @click="setPomodorosTotal(0)"
    >
      Reset
    </button>
    <div class="d-flex align-items-start settings">
      <button class="settings__button btn btn-link" @click="isSettingsMode = !isSettingsMode">
        <i v-if="!isSettingsMode" class="fas fa-cog"></i>
        <i v-else class="fas fa-check"></i>
      </button>
      <div v-if="isSettingsMode" class="d-flex">
        <color-settings></color-settings>
        <sound-settings></sound-settings>
        <progress-settings></progress-settings>
        <title-settings></title-settings>
      </div>
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
import PomodorosSettings from '@/components/settings/PomodorosSettings.vue'
import ProgressSettings from '@/components/settings/ProgressSettings.vue'
import TitleSettings from '@/components/settings/TitleSettings.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    TimerTime, TimerBar, PomodorosBar, PomodorosIndicator, ColorSettings, SoundSettings,
    PomodorosSettings, ProgressSettings, TitleSettings
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

.settings
  position: absolute
  left: 0
  top: 0
  padding: 0
  z-index: 1000

  .settings__button
    font-size: 6vh
    color: var(--primary)
    &:hover
      color: var(--dark)

.pomodoros-reset-button
  position: absolute
  bottom: 0
  right: 0
  z-index: 1000
  font-size: 4vh
  color: var(--dark)
  &:hover
    color: var(--super-dark)

</style>
