<template>
  <div class="text-center indicator" :style="indicatorPosition">
    {{ indicatorText }}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'pomodoros-progress-bar',
  props: ['isHorizontal'],
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
      if (this.isHorizontal) {
        let fontSize = 20
        let gap = this.ratio <= 0.5 ? - fontSize - 5 : 5
        return {
          position: 'absolute',
          left: '10px',
          top: gap + 'px'
        }
      } else {
        return {
          position: 'absolute',
          bottom: '105%',
          width: '100%'
        }
      }
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
    line-height: 20px
    transition: all 0.3s
    font-size: 20px

    @media (max-height: 400px)
      font-size: 16px


</style>
