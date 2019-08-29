<template>
  <div class="content-container d-flex align-items-center justify-content-center">
    <pomodoros-progress-bar>
        <pomodoros-progress-indicator v-if="isHorizontal()" :is-horizontal="isHorizontal()">
        </pomodoros-progress-indicator>
    </pomodoros-progress-bar>
    <timer-progress-bar>
      <timer>
        <pomodoros-progress-indicator v-if="!isHorizontal()" :is-horizontal="isHorizontal()">
        </pomodoros-progress-indicator>
      </timer>
    </timer-progress-bar>
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
    Timer, TimerProgressBar, PomodorosProgressBar, PomodorosProgressIndicator
  },
  methods: {
    isHorizontal () {
      return window.innerWidth / window.innerHeight > 1 && window.innerWidth > 768
    }
  }
}
</script>

<style lang="sass" scoped>

  .content-container
    position: relative
    width: 100%
    height: 100%

</style>
