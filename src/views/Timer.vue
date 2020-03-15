<template>
  <div class="timer-container d-flex align-items-center justify-content-center">
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

  </div>
</template>

<script>
import TimerTime from '@/components/TimerTime.vue'
import TimerBar from '@/components/TimerBar.vue'
import PomodorosBar from '@/components/PomodorosBar.vue'
import PomodorosIndicator from '@/components/PomodorosIndicator.vue'
import { mapState } from 'vuex'

export default {
  name: 'timer',
  components: {
    TimerTime,
    TimerBar,
    PomodorosBar,
    PomodorosIndicator
  },
  props: {
    isSettingsMode: {
      type: Boolean
    }
  },
  computed: {
    ...mapState([
      'goalIndicatorFormat'
    ])
  }
}
</script>

<style lang="sass">
.timer-container
  position: relative
  width: 100%
  height: 100%

.settings
  position: absolute
  left: 5px
  top: 5px
  padding: 0
  z-index: 1000

</style>
