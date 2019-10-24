<template>
  <div class="content-container d-flex align-items-center justify-content-center">
    <pomodoros-bar></pomodoros-bar>
    <timer-bar>
      <timer-time>
        <pomodoros-indicator></pomodoros-indicator>
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
      <i class="fas fa-cog"></i>
    </button>
    <theme-colors
      v-if="isSettingsMode"
      class="theme-settings"
    ></theme-colors>
  </div>
</template>

<script>
import TimerTime from '@/components/TimerTime.vue'
import TimerBar from '@/components/TimerBar.vue'
import PomodorosBar from '@/components/PomodorosBar.vue'
import PomodorosIndicator from '@/components/PomodorosIndicator.vue'
import ThemeColors from '@/components/settings/ThemeColors.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  components: {
    TimerTime, TimerBar, PomodorosBar, PomodorosIndicator, ThemeColors
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
  top: 0
  left: 0
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

.theme-settings
  position: absolute
  top: 60px
  left: 15px

</style>
