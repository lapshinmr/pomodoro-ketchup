<template>
  <div class="indicator d-flex align-items-center justify-content-center text-center">
    <button
      v-if="!isSettingsMode && goalIndicatorFormat !== 3"
      class="indicator__button btn btn-link"
      @click="removePomodoro"
    >⊖</button>
    <button
      v-else-if="isSettingsMode"
      class="indicator__button btn btn-link"
      @click="goalIndicatorFormat--"
    >
      <i class="far fa-arrow-alt-circle-left"></i>
    </button>

    <span v-if="goalIndicatorFormat !== 3 || isSettingsMode" class="indicator__text">{{ indicatorText }}</span>

    <button
      v-if="!isSettingsMode && goalIndicatorFormat !== 3"
      class="indicator__button btn btn-link"
      @click="addPomodoro">⊕</button>
    <button
      v-else-if="isSettingsMode"
      class="indicator__button btn btn-link"
      @click="goalIndicatorFormat++"
    >
      <i class="far fa-arrow-alt-circle-right"></i>
    </button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'pomodoros-indicator',
  props: ['is-settings-mode'],
  data() {
    return {

    }
  },
  computed: {
    ...mapState([
      'pomodorosTotal',
      'pomodorosGoal',
      'goalIndicatorFormat'
    ]),
    indicatorText () {
      let first = this.pomodorosTotal + ' of ' + this.pomodorosGoal;
      let second = Math.round(this.pomodorosTotal / this.pomodorosGoal * 100) + '%';
      let formats = [
        first, second, `${first} (${second})`, 'Off'
      ];
      return formats[this.goalIndicatorFormat]
    },
    goalIndicatorFormat: {
      get() {
        return this.$store.state.goalIndicatorFormat
      },
      set(goalIndicatorFormat) {
        if (goalIndicatorFormat < 0) {
          goalIndicatorFormat = 3
        } else if (goalIndicatorFormat > 3) {
          goalIndicatorFormat = 0
        }
        this.setGoalIndicatorFormat(goalIndicatorFormat)
      }
    }
  },
  methods: {
    ...mapActions([
      'addPomodoro',
      'removePomodoro',
      'setGoalIndicatorFormat'
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
