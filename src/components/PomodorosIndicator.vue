<template>
  <div class="indicator d-flex align-items-center justify-content-center text-center">
    <button class="indicator__button btn btn-link" @click="removePomodoro">⊖</button>
    <span class="indicator__text">{{ indicatorText }}</span>
    <button class="indicator__button btn btn-link" @click="addPomodoro">⊕</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'pomodoros-indicator',
  computed: {
    ...mapState([
      'pomodorosTotal',
      'pomodorosGoal',
      'goalIndicatorFormat'
    ]),
    indicatorText () {
      let formatFirst = this.pomodorosTotal + ' of ' + this.pomodorosGoal
      let formatSecond = Math.round(this.pomodorosTotal / this.pomodorosGoal * 100) + '%'
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
    ])
  }
}
</script>

<style scoped lang="sass">
.indicator
  color: var(--dark)
  transition: all 0.3s
  font-size: 6%

  .indicator__button
    color: var(--dark)
    display: inline-block
    line-height: 1
    font-size: 100%
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
