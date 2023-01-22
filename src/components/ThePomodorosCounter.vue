<template>
  <div class="pomodoros-counter">
    <div class="pomodoros-counter__buttons">
      <transition
        name="slide-left"
        mode="out-in"
      >
        <p-btn
          v-if="!isSettingsMode && goalIndicatorFormat !== 3"
          small
          icon
          class="pomodoros-counter__button"
          @click="REMOVE_POMODORO"
        >
          <p-icon name="minus" />
        </p-btn>
        <p-btn
          v-else-if="isSettingsMode"
          small
          icon
          class="pomodoros-counter__button"
          @click="handleGoalIndicatorFormat--"
        >
          <p-icon name="chevron-left" />
        </p-btn>
      </transition>
    </div>

    <transition name="fade">
      <div
        v-if="goalIndicatorFormat !== 3 || isSettingsMode"
        class="pomodoros-counter__text noselect"
      >
        <transition
          :name="slideIndicator"
          mode="out-in"
        >
          <div
            v-if="goalIndicatorFormat === 0"
            key="format-0"
            class="pomodoros-counter__format"
          >
            {{ pomodorosTotal }} of
            <span class="pomodoros-counter__container">
              <span
                class="pomodoros-counter__total"
                contenteditable="false"
              >
                {{ pomodorosGoal }}
              </span>
            </span>
            <span
              class="ml-2"
              style="position: relative; top: -3px;"
            >(</span>
            <span>{{ pomodorosPercentage }}</span>
            <span style="position: relative; top: -3px;">)</span>
          </div>

          <div
            v-else-if="goalIndicatorFormat === 1"
            key="format-1"
            class="pomodoros-counter__format"
          >
            {{ pomodorosTotal }} of
            <span class="pomodoros-counter__container">
              <span
                class="pomodoros-counter__total"
                contenteditable="false"
              >
                {{ pomodorosGoal }}
              </span>
            </span>
          </div>

          <div
            v-else-if="goalIndicatorFormat === 2"
            key="format-2"
            class="pomodoros-counter__format"
          >
            <span>{{ Math.round(pomodorosTotal / pomodorosGoal * 100) + '%' }}</span>
          </div>

          <div
            v-else-if="goalIndicatorFormat === 3"
            key="format-3"
            class="pomodoros-counter__format"
          >
            Off
          </div>
        </transition>
      </div>
    </transition>

    <div class="pomodoros-counter__buttons pomodoros-counter__buttons--right">
      <transition
        name="slide-right"
        mode="out-in"
      >
        <p-btn
          v-if="!isSettingsMode && goalIndicatorFormat !== 3"
          small
          icon
          class="pomodoros-counter__button"
          @click="ADD_POMODORO"
        >
          <p-icon name="plus" />
        </p-btn>
        <p-btn
          v-else-if="isSettingsMode"
          class="pomodoros-counter__button"
          @click="handleGoalIndicatorFormat++"
        >
          <p-icon name="chevron-right" />
        </p-btn>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'ThePomodorosCounter',
  props: {
    isSettingsMode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      slideIndicator: 'slide-indicator-left',
    };
  },
  computed: {
    ...mapState([
      'pomodorosTotal',
      'pomodorosGoal',
      'goalIndicatorFormat',
    ]),
    handleGoalIndicatorFormat: {
      get() {
        return this.goalIndicatorFormat;
      },
      set(value) {
        if (value > this.goalIndicatorFormat) {
          this.slideIndicator = 'slide-indicator-right';
        } else {
          this.slideIndicator = 'slide-indicator-left';
        }
        let indicatorFormatIndex = value;
        if (value < 0) {
          indicatorFormatIndex = 3;
        } else if (value > 3) {
          indicatorFormatIndex = 0;
        }
        this.$store.commit('SET_GOAL_INDICATOR_FORMAT', indicatorFormatIndex);
      },
    },
    pomodorosPercentage() {
      return `${Math.round((this.pomodorosTotal / this.pomodorosGoal) * 100)}%`;
    },
  },
  methods: {
    ...mapMutations([
      'SET_POMODOROS_GOAL',
      'ADD_POMODORO',
      'REMOVE_POMODORO',
    ]),
    handlePomodorosGoal(el) {
      if (!+el.innerText) {
        el.innerText = this.pomodorosGoal;
        return;
      }
      this.SET_POMODOROS_GOAL(el.innerText);
    },
  },
};
</script>

<style scoped lang="sass">
.pomodoros-counter
  position: relative
  display: flex
  align-items: center
  color: var(--dark)
  transition: all 0.3s
  font-size: 6%
  text-align: center

  .pomodoros-counter__buttons

  .pomodoros-counter__buttons--left

  .pomodoros-counter__buttons--right

  .pomodoros-counter__button

  .pomodoros-counter__text

  .pomodoros-counter__format

  .pomodoros-counter__total

  .pomodoros-counter__container
    position: relative

  .timer__line
    position: absolute
    bottom: 3%
    left: 0
    width: 100%
    height: 2px
    background-color: var(--dark)

  .pomodoros-counter__total--editable
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
