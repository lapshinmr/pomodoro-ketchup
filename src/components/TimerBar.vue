<template>
  <div class="timer-bar">
    <svg class="timer-bar__container" viewBox="0 0 150 150">
      <circle class="timer-bar__background" cx="75" cy="75" r="70" />
      <circle class="timer-bar__progress" :style="progressValue" cx="75" cy="75" r="70" transform="rotate(-90 75 75)" />
    </svg>
    <div class="timer-bar__slot d-flex justify-content-center align-items-center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'timer-bar',
  computed: {
    ...mapState([
      'timeLeft',
      'timeInit',
      'isReversedProgressBar'
    ]),
    progressValue () {
      let ratio = this.timeLeft / this.timeInit
      if (this.isReversedProgressBar) {
        ratio = (1 - ratio)
      }
      return {
        'stroke-dasharray': 2 * Math.PI * 70,
        'stroke-dashoffset': 2 * Math.PI * 70 * ratio
      }
    }
  }
}
</script>

<style lang="sass">
.timer-bar
  position: relative
  min-height: 75vh
  max-height: 75vh
  min-width: 90vw
  max-width: 90vw
  font-size: 90vw

  @media (min-aspect-ratio: 75/90)
    font-size: 75vh

  @media (max-height: 400px)
    min-height: 95vh
    max-height: 95vh
    min-width: 95vw
    max-width: 95vw
    font-size: 95vh

  .timer-bar__slot
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)

  .timer-bar__container
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    height: 100%
    width: 100%

    circle
      stroke-width: 10
      fill: transparent

      &.timer-bar__background
        stroke: var(--primary)

      &.timer-bar__progress
        transition: all 0.3s
        stroke: var(--dark)

</style>
