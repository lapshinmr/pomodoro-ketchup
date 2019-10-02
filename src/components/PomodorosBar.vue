<template>
  <div class="pomodoros-progress-bar" :style="progressBarHeight"></div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'pomodoros-bar',
  computed: {
    ...mapState([
      'pomodorosTotal',
      'pomodorosGoal',
      'goalIndicatorFormat'
    ]),
    ratio () {
      return this.pomodorosTotal / this.pomodorosGoal
    },
    progressBarHeight () {
      return {
        'height': (this.ratio < 1 ? this.ratio : 1) * 100 + '%'
      }
    }
  },
  methods: {
    ...mapActions([
      'setPomodorosTotal'
    ])
  }
}
</script>

<style scoped lang="sass">
.pomodoros-progress-bar
  position: fixed
  bottom: 0
  width: 100vw
  transition: 0.3s
  background-color: var(--light)
</style>
