<template>
  <div>
    <pomodoros-counter></pomodoros-counter>
    <div class="d-flex align-content-center justify-content-center">
      <progress-bar>
        <timer></timer>
      </progress-bar>
    </div>
  </div>
</template>


<script>
import Timer from '@/components/Timer.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import PomodorosCounter from '@/components/PomodorosCounter.vue'

export default {
  name: 'home',
  components: {
    Timer, ProgressBar, PomodorosCounter,
  }
}
</script>


<style lang="sass" scoped>

</style>
