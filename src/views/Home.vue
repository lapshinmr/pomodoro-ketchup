<template>
  <div class="row d-flex align-content-between" id="timerpomodoros">
    <pomodoros-counter></pomodoros-counter>
    <div class="col-sm-12 d-flex align-content-center justify-content-center">
      <progress-bar>
        <timer></timer>
      </progress-bar>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
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

<style lang="sass">
  #timerpomodoros
    height: 100%

</style>
