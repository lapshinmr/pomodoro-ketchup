<template>
  <div class="timer-bar">
    <svg class="timer-bar__container" viewBox="0 0 150 150">
      <circle class="timer-bar__background" cx="75" cy="75" r="70" />
      <circle class="timer-bar__progress" cx="75" cy="75" r="70" transform="rotate(-90 75 75)" :style="progressValue"/>
      <circle class="timer-bar__line" cx="75" cy="75" r="70" transform="rotate(-90 75 75)" :style="line" v-draggable/>
    </svg>
    <div class="timer-bar__slot d-flex justify-content-center align-items-center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'timer-bar',
  props: ['isSettingsMode'],
  data() {
    return {
      isTransition: true
    }
  },
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
        'stroke-dashoffset': 2 * Math.PI * 70 * ratio,
        transition: this.isTansition ? 'all 0.3s' : 'none'
      }
    },
    line () {
      let ratio = this.timeLeft / this.timeInit
      if (this.isReversedProgressBar) {
        ratio = (1 - ratio)
      }
      let length = 2 * Math.PI * 70;
      let lineWidth = 0.0025;
      return {
        'stroke-dasharray': length * lineWidth + ' ' + length * (1 - lineWidth),
        'stroke-dashoffset': length * ratio
      }
    },
  },
  methods: {
    ...mapActions([
      'setLeftTime',
      'pauseTimer',
      'startTimer'
    ])
  },
  directives: {
    'draggable': {
      bind(el, binding, vnode) {
        let rootHeight, rootWidth, curPomodoros;

        function mousemove(e) {
          if (e.buttons === 0) {
            document.removeEventListener('mousemove', mousemove);
            vnode.context.isTransition = true;
            return
          };
          let x = e.clientX - rootWidth / 2
          let y = (e.clientY - rootHeight / 2) * -1 // rotate coordinates by 180
          let signX = Math.sign(x)
          let signY = Math.sign(y)
          console.log(signX)
          let degree = Math.atan(y / x) * 180 / Math.PI
          switch (true) {
            case (signX <= 0 && signY > 0):
              degree = degree + 90
              break
            case (signX < 0 && signY < 0):
              degree = degree + 90
              break
            case (signX > 0 && signY < 0):
              degree = degree + 270
              break
            case (signX > 0 && signY > 0):
              degree = degree + 270
              break
          }
          let curTime = Math.ceil(vnode.context.timeInit * (1 - degree / 360))
          if (curTime !== vnode.context.timeLeft && curTime % 10 === 0) {
            vnode.context.setLeftTime(curTime)
          }
          return false;
        }

        el.addEventListener('mousedown', (e) => {
          console.log(e)
          rootWidth = document.querySelector('.root').offsetWidth;
          rootHeight = document.querySelector('.root').offsetHeight;
          vnode.context.isTransition = false;
          console.log(rootWidth, rootHeight)
          //vnode.context.isTransition = false;
          //vnode.context.pauseTimer()
          document.addEventListener('mousemove', mousemove);
          return false;
        })
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
        stroke: var(--dark)

      &.timer-bar__line
        stroke: var(--super-light)

        &:hover
          stroke: var(--super-dark)
          cursor: grab

</style>
