<template>
  <div>
    <pomodoros-progress-bar></pomodoros-progress-bar>
    <div class="content-container d-flex align-items-center justify-content-center">
      <div class="rounded-progress-bar d-flex align-content-center justify-content-center">
        <timer-progress-bar>
          <timer></timer>
        </timer-progress-bar>
        <pomodoros-progress-indicator></pomodoros-progress-indicator>
      </div>
    </div>
  </div>
</template>


<script>
import Timer from '@/components/Timer.vue'
import TimerProgressBar from '@/components/TimerProgressBar.vue'
import PomodorosProgressBar from '@/components/PomodorosProgressBar.vue'
import PomodorosProgressIndicator from '@/components/PomodorosProgressIndicator.vue'

export default {
  name: 'home',
  components: {
    Timer, TimerProgressBar, PomodorosProgressBar, PomodorosProgressIndicator,
  }
}
</script>


<style lang="sass" scoped>

  .content-container
    min-height: 100vh

  .rounded-progress-bar
    position: relative

</style>
