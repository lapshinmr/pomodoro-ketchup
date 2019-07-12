<template>
  <div>
    <timer></timer>
    <timer-title :time="time"></timer-title>
    <pomodoros-counter></pomodoros-counter>
  </div>
</template>

<script>
// @ is an alias to /src
import Timer from '@/components/Timer.vue'
import TimerTitle from '@/components/TimerTitle.vue'
import PomodorosCounter from '@/components/PomodorosCounter.vue'

export default {
  name: 'home',
  components: {
    Timer, TimerTitle, PomodorosCounter
  },
  computed: {
    time() {
      return this.$store.getters.getTimeFormatted
    }
  }
}

</script>
