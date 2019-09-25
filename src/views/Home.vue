<template>
  <div class="content-container d-flex align-items-center justify-content-center">
    <pomodoros-progress-bar></pomodoros-progress-bar>
    <timer-progress-bar>
      <timer>
        <pomodoros-progress-indicator></pomodoros-progress-indicator>
      </timer>
    </timer-progress-bar>
    <button
      v-if="pomodorosTotal"
      class="reset-button btn btn-link"
      @click="setPomodorosTotal(0)"
    >
      Reset
    </button>
  </div>
</template>

<script>
import Timer from '@/components/Timer.vue'
import TimerProgressBar from '@/components/TimerProgressBar.vue'
import PomodorosProgressBar from '@/components/PomodorosProgressBar.vue'
import PomodorosProgressIndicator from '@/components/PomodorosProgressIndicator.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',
  components: {
    Timer, TimerProgressBar, PomodorosProgressBar, PomodorosProgressIndicator
  },
  computed: {
    ...mapState([
      'pomodorosTotal',
    ]),
  }
}
</script>

<style lang="sass" scoped>

  .content-container
    position: relative
    width: 100%
    height: 100%

  .reset-button
    position: absolute
    bottom: 0
    right: 0
    z-index: 1000
    font-size: 4vh
    color: var(--dark)
    &:hover
      color: var(--super-dark)

</style>
