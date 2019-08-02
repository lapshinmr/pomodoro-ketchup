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
  import { mapGetters } from 'vuex';

  export default {
    name: 'ProgressBar',
    computed: {
      ...mapGetters([
        'getProgressBar'
      ]),
      progressValue() {
        let ratio = this.$store.getters.getTimeSeconds / this.$store.getters.getInitTimeSeconds;
        if (this.getProgressBar) {
          ratio = (1 - ratio);
        }
        return {
          "stroke-dasharray": 2 * Math.PI * 70,
          "stroke-dashoffset": 2 * Math.PI * 70 * ratio
        }
      }
    }
  }

</script>

<style lang="sass">

  .radialProgressBar
    position: relative
    width: 80vw
    height: 80vw

    @media (min-width: 576px)
      width: 70vw
      height: 70vw

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
      z-index: 999

    .svgprogress
      position: absolute
      top: 50%
      left: 50%
      width: 100%
      height: 100%
      transform: translate(-50%, -50%) rotate(-90deg)
      z-index: 1

      circle
        stroke-width: 10
        fill: transparent

        &.progress_background
          stroke: $primary

        &.progress_bar
          transition: all 0.3s
          stroke: $dark



</style>

