<template>
  <div class="d-flex indicator"
       :style="indicatorPosition"
  >
    {{ indicatorText }}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'pomodoros-progress-bar',
  computed: {
    ...mapState([
      'pomodorosTotal',
      'pomodorosGoal',
      'goalIndicatorFormat'
    ]),
    ratio () {
      return this.pomodorosTotal / this.pomodorosGoal
    },
    indicatorPosition () {
      let fontSize = 20
      let gap = this.ratio <= 0.5 ? 5 : fontSize + 5
      if (this.isDesktop) {
        let pos = (this.ratio < 1 ? this.ratio : 1) * 100
        gap = this.ratio <= 0.5 ? gap : -gap
        return {
          'position': 'fixed',
          'left': '10px',
          'bottom': `calc(${pos}% + ${gap}px)`
        }
      } else {
        return this.ratio <= 0.5 ? {
          'position': 'absolute',
          'top': `calc(100% + ${gap}px)`
        } : {
          'position': 'absolute',
          'top': `calc(-${gap}px)`
        }
      }
    },
    isDesktop () {
      return window.innerWidth >= 768
    },
    indicatorText () {
      let formatFirst = this.pomodorosTotal + ' of ' + this.pomodorosGoal
      let formatSecond = Math.round(this.ratio * 100) + '%'
      let result = `${formatFirst} (${formatSecond})`
      if (this.goalIndicatorFormat === 0) {
        result = formatFirst
      } else if (this.goalIndicatorFormat === 1) {
        result = formatSecond
      }
      return result
    }
  },
  methods: {
    ...mapActions([
      'addPomodoro',
      'removePomodoro',
      'setPomodorosTotal'
    ])
  }
}
</script>

<style scoped lang="sass">

  .indicator
    color: var(--dark)
    font-size: 20px
    line-height: 20px
    transition: all 0.3s

</style>
