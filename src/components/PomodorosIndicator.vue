<template>
  <div class="indicator d-flex align-items-center justify-content-center text-center">

    <div class="indicator__buttons indicator__buttons_left">
      <transition name="slide-left" mode="out-in">
        <button
          v-if="!isSettingsMode && goalIndicatorFormat !== 3"
          class="indicator__button btn btn-link"
          @click="removePomodoro"
          key="left-1"
        >
          <i class="fas fa-minus-circle"></i>
        </button>
        <button
          v-else-if="isSettingsMode"
          class="indicator__button btn btn-link"
          @click="handleGoalIndicatorFormat--"
          key="left-2"
        >
          <i class="far fa-arrow-alt-circle-left"></i>
        </button>
      </transition>
    </div>

    <transition name="fade">
      <div v-if="goalIndicatorFormat !== 3 || isSettingsMode" class="indicator__text noselect">
        <transition :name="slideIndicator" mode="out-in">

          <div v-if="goalIndicatorFormat === 0" class="indicator__format" key="format-0">
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
            <span class="ml-2" style="position: relative; top: -2px;">(</span>
            <span>{{ Math.round(this.pomodorosTotal / this.pomodorosGoal * 100) + '%' }}</span>
            <span style="position: relative; top: -2px;">)</span>
          </div>

          <div v-else-if="goalIndicatorFormat === 1" class="indicator__format" key="format-1">
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
          </div>

          <div v-else-if="goalIndicatorFormat === 2" class="indicator__format" key="format-2">
            <span>{{ Math.round(this.pomodorosTotal / this.pomodorosGoal * 100) + '%' }}</span>
          </div>

          <div v-else-if="goalIndicatorFormat === 3" class="indicator__format" key="format-3">
            Off
          </div>

        </transition>
      </div>
    </transition>

    <div class="indicator__buttons indicator__buttons_right">
      <transition name="slide-right" mode="out-in">
        <button
          v-if="!isSettingsMode && goalIndicatorFormat !== 3"
          class="indicator__button btn btn-link"
          @click="addPomodoro"
          key="right-1"
        >
          <i class="fas fa-plus-circle"></i>
        </button>
        <button
          v-else-if="isSettingsMode"
          class="indicator__button btn btn-link"
          @click="handleGoalIndicatorFormat++"
          key="right-2"
        >
          <i class="far fa-arrow-alt-circle-right"></i>
        </button>
      </transition>
    </div>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'pomodoros-indicator',
  props: ['is-settings-mode'],
  data() {
    return {
      slideIndicator: 'slide-indicator-left'
    }
  },
  computed: {
    ...mapState([
      'pomodorosTotal',
      'pomodorosGoal',
      'goalIndicatorFormat'
    ]),
    handleGoalIndicatorFormat: {
      get() {
        return this.goalIndicatorFormat
      },
      set(value) {
        if (value > this.goalIndicatorFormat) {
          this.slideIndicator = 'slide-indicator-right'
        } else {
          this.slideIndicator = 'slide-indicator-left'
        }
        if (value < 0) {
          value = 3
        } else if (value > 3) {
          value = 0
        }
        this.setGoalIndicatorFormat(value)
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
  position: relative
  color: var(--dark)
  transition: all 0.3s
  font-size: 6%

  .indicator__buttons
    position: absolute

  .indicator__buttons_left
    left: 10%

  .indicator__buttons_right
    right: 10%

  .indicator__button
    position: relative
    top: 0.1rem
    color: var(--dark)
    display: inline-block
    font-size: 80%
    padding: 0
    transition: all 0.3s
    cursor: pointer
    border: none

  .indicator__text

  .indicator__format

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

.slide-left-enter
    opacity: 0

.slide-left-enter-active
    animation: slide-in-left .5s ease-out forwards
    transition: opacity .5s

.slide-left-leave

.slide-left-leave-active
    animation: slide-out-left .5s ease-out forwards
    transition: opacity .5s
    opacity: 0

@keyframes slide-in-left
  from
    transform: translateX(20px)
  to
    transform: translateX(0)

@keyframes slide-out-left
  from
    transform: translateX(0)
  to
    transform: translateX(-20px)

.slide-right-enter
    opacity: 0

.slide-right-enter-active
    animation: slide-in-right .5s ease-out forwards
    transition: opacity .5s

.slide-right-leave

.slide-right-leave-active
    animation: slide-out-right .5s ease-out forwards
    transition: opacity .5s
    opacity: 0

@keyframes slide-in-right
  from
    transform: translateX(-20px)
  to
    transform: translateX(0)

@keyframes slide-out-right
  from
    transform: translateX(0)
  to
    transform: translateX(20px)

.slide-indicator-left-enter
  opacity: 0

.slide-indicator-left-enter-active
    animation: slide-in-indicator-left .2s ease-out forwards
    transition: opacity .2s

.slide-indicator-left-leave

.slide-indicator-left-leave-active
    animation: slide-out-indicator-left .2s ease-out forwards
    transition: opacity .2s
    opacity: 0

@keyframes slide-in-indicator-left
  from
    transform: translateX(50px)
  to
    transform: translateX(0)

@keyframes slide-out-indicator-left
  from
    transform: translateX(0px)
  to
    transform: translateX(-50px)

.slide-indicator-right-enter
  opacity: 0

.slide-indicator-right-enter-active
    animation: slide-in-indicator-right .2s ease-out forwards
    transition: opacity .2s

.slide-indicator-right-leave

.slide-indicator-right-leave-active
    animation: slide-out-indicator-right .2s ease-out forwards
    transition: opacity .2s
    opacity: 0

@keyframes slide-in-indicator-right
  from
    transform: translateX(-50px)
  to
    transform: translateX(0)

@keyframes slide-out-indicator-right
  from
    transform: translateX(0px)
  to
    transform: translateX(50px)

</style>
