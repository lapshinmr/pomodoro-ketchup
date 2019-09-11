<template>
  <div class="indicator d-flex align-items-center justify-content-center text-center" :style="indicatorPosition">
    <button class="btn btn-link pomodoro-button" @click="addPomodoro">⊕</button>
    <span class="indicator-text">{{ indicatorText }}</span>
    <button class="btn btn-link pomodoro-button" @click="removePomodoro">⊖</button>
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
    font-size: 6%
    z-index: 1000

    @media (max-height: 400px)
      font-size: 7%

    .pomodoro-button
      color: var(--dark)
      display: inline-block
      line-height: 1
      font-size: 120%
      padding: 0
      transition: all 0.3s
      cursor: pointer

      &:hover
        color: var(--super-dark)

      &:first-child
        margin: 0 0.5rem

      &:last-child
        margin: 0 0.5rem


</style>
