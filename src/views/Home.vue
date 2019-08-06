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


  $colorTheme: 1

  @if $colorTheme == 1

    $super-light: #F1F8E2
    $light:       #C0DF81
    $primary:     #98CA32
    $dark:        #59761E
    $super-dark:  #263409

  @else

    $super-light: #E7F3EF
    $light:       #79BEA8
    $primary:     #448D76
    $dark:        #23483C
    $super-dark:  #093426

</style>
