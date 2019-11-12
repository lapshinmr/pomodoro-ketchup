<template>
  <div class="indicator d-flex align-items-center justify-content-center text-center">
    <transition name="fade" mode="out-in">
      <button
        v-if="!isSettingsMode && goalIndicatorFormat !== 3"
        class="indicator__button btn btn-link"
        @click="removePomodoro"
      >
        <i class="fas fa-minus-circle"></i>
      </button>
      <button
        v-else-if="isSettingsMode"
        class="indicator__button btn btn-link"
        @click="goalIndicatorFormat--"
      >
        <i class="far fa-arrow-alt-circle-left"></i>
      </button>
    </transition>

    <span v-if="goalIndicatorFormat !== 3 || isSettingsMode" class="indicator__text">
      <span v-if="goalIndicatorFormat === 0 || goalIndicatorFormat === 2">
        {{ pomodorosTotal }} of
        <span class="indicator__container">
          <span v-if="!isSettingsMode"
              class="indicator__total"
              contenteditable="false"
          >{{ pomodorosGoal }}</span>
          <span v-if="isSettingsMode"
              class="indicator__total"
              :class="{'indicator__total_editable': isSettingsMode}"
              contenteditable="true"
              v-set-editable="handlePomodorosGoal"
          >{{ pomodorosGoal }}</span>
          <transition name="line">
            <span class="timer__line" v-if="isSettingsMode"></span>
          </transition>
        </span>
      </span>
      <span v-if="goalIndicatorFormat === 1 || goalIndicatorFormat === 2">
        <span v-if="goalIndicatorFormat === 2" class="ml-2">(</span>
        <span>{{ Math.round(this.pomodorosTotal / this.pomodorosGoal * 100) + '%' }}</span>
        <span v-if="goalIndicatorFormat === 2">)</span>
      </span>
      <span v-if="goalIndicatorFormat === 3">
        Off
      </span>
    </span>
    <button
      v-if="!isSettingsMode && goalIndicatorFormat !== 3"
      class="indicator__button btn btn-link"
      @click="addPomodoro">
        <i class="fas fa-plus-circle fa-1x"></i>
      </button>
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
    },
  },
  methods: {
    ...mapActions([
      'addPomodoro',
      'removePomodoro',
      'setGoalIndicatorFormat',
      'setPomodorosGoal'
    ]),
    handlePomodorosGoal(el) {
      if (!parseInt(el.innerText)) {
        el.innerText = this.pomodorosGoal
        return
      }
      this.setPomodorosGoal(el.innerText)
    }
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
    font-size: 80%
    padding: 0
    transition: all 0.3s
    cursor: pointer

    &:hover
      color: var(--super-dark)

    &:first-child
      margin: 0 0.5rem

    &:last-child
      margin: 0 0.5rem

  .indicator__text

  .indicator__total

  .indicator__container
    position: relative

  .timer__line
    position: absolute
    bottom: 3%
    left: 0
    width: 100%
    height: 2px
    background-color: var(--dark)

  .indicator__total_editable
    color: var(--dark)
    outline: none

</style>
