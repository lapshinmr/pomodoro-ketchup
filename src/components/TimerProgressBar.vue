<template>
  <div class="radialProgressBar">
    <svg class="svgprogress" viewBox="0 0 150 150">
      <circle class="progress_background" cx="75" cy="75" r="70" />
      <circle class="progress_bar" :style="progressValue" cx="75" cy="75" r="70" />
    </svg>
    <div class="inner">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'timer-progress-bar',
  computed: {
    ...mapState([
      'curTime',
      'initTime',
      'isReversedProgressBar'
    ]),
    progressValue () {
      let ratio = this.curTime / this.initTime
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

  .radialProgressBar
    position: relative
    width: 90vw
    height: 90vw

    @media (min-width: 576px)
      width: 80vw
      height: 80vw

    @media (min-width: 768px)
      width: 60vw
      height: 60vw

    @media (min-width: 992px)
      width: 50vw
      height: 50vw

    @media (min-width: 1200px)
      width: 40vw
      height: 40vw

    .inner
      position: absolute
      top: 50%
      left: 50%
      transform: translate(-50%, -50%)

    .svgprogress
      position: absolute
      top: 50%
      left: 50%
      width: 100%
      height: 100%
      transform: translate(-50%, -50%) rotate(-90deg)

      circle
        stroke-width: 10
        fill: transparent

        &.progress_background
          stroke: var(--primary)

        &.progress_bar
          transition: all 0.3s
          stroke: var(--dark)

</style>
