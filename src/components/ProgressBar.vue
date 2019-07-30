<template>
  <div>
    <div class="radialProgressBar progress" :style="sector">
      <div class="overlay" >
        <div class="inner">
          <slot></slot>
        </div>
      </div>
    </div>
    <svg class="svgprogress" width="120" height="120" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="54" fill="none" stroke="#e6e6e6" stroke-width="12" />
      <circle class="progress__value" cx="60" cy="60" r="54" fill="none" stroke="#f77a52" stroke-width="12" />
    </svg>
  </div>
</template>

<script>
  export default {
    name: 'ProgressBar',
    computed: {
      sector() {
        let ratio = this.$store.getters.getTimeSeconds / this.$store.getters.getInitTimeSeconds;
        let angle = 90 + 360 * (1 - ratio);
        let color = "#98CA32";
        if (ratio < 0.5) {
          color = "#C0DF81";
          angle = 270 - 360 * ratio;
        }
        return {
          "background-image": "linear-gradient(" + angle + "deg, transparent 50%, " + color + " 50%), linear-gradient(90deg, #98CA32 50%, transparent 50%)"
        }
      }
    }
  }

</script>

<style lang="sass">

  .radialProgressBar
    border-radius: 50%
    width: 60vh
    height: 60vh
    background: $light
    z-index: 999

    .overlay
      border-radius: 50%
      width: 85%
      height: 85%
      margin: auto
      background: $super-light

      .inner
        position: absolute
        top: 50%
        left: 50%
        transform: translate(-50%, -50%)

  .svgprogress
    transform: rotate(-90deg)

  .progress__value
    stroke-dasharray: 339.292
    stroke-dashoffset: 0
    transition: all 2s

</style>

