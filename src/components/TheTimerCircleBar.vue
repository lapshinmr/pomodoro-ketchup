<template>
  <div class="timer-circle-bar">
    <svg
      class="timer-circle-bar__container"
      viewBox="0 0 150 150"
    >
      <circle
        class="timer-circle-bar__background"
        cx="75"
        cy="75"
        r="70"
      />
      <circle
        class="timer-circle-bar__progress"
        cx="75"
        cy="75"
        r="70"
        transform="rotate(-90 75 75)"
        :style="progressValue"
      />
      <circle
        v-draggable
        class="timer-circle-bar__line"
        cx="75"
        cy="75"
        r="70"
        transform="rotate(-90 75 75)"
        :style="line"
      />
    </svg>
    <div class="timer-circle-bar__slot">
      <slot />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'TheTimerCircleBar',
  props: ['isSettingsMode'],
  data() {
    return {
      isTransition: true,
      circleLength: 2 * Math.PI * 70,
    };
  },
  computed: {
    ...mapState([
      'timeLeft',
      'timeInit',
      'isReversedProgressBar',
    ]),
    ratio() {
      let ratio = this.timeLeft / this.timeInit;
      if (this.isReversedProgressBar) {
        ratio = (1 - ratio);
      }
      return ratio;
    },
    progressValue() {
      return {
        'stroke-dasharray': this.circleLength,
        'stroke-dashoffset': this.circleLength * this.ratio,
        transition: this.isTransition ? 'all 0.3s' : 'none',
      };
    },
    line() {
      const lineWidth = 0.0025;
      return {
        'stroke-dasharray': `${this.circleLength * lineWidth} ${this.circleLength * (1 - lineWidth)}`,
        'stroke-dashoffset': this.circleLength * this.ratio,
      };
    },
  },
  methods: {
    ...mapActions([
      'pauseTimer',
      'startTimer',
    ]),
  },
  directives: {
    draggable: {
      bind(el, binding, vnode) {
        let rootHeight;
        let rootWidth;

        function mousemove(e) {
          if (e.buttons === 0) {
            document.removeEventListener('mousemove', mousemove);
            vnode.context.isTransition = true;
            return;
          }
          const [x, y] = [
            e.clientX - rootWidth / 2,
            (e.clientY - rootHeight / 2) * -1, // rotate coordinates by 180 degree
          ];
          const [signX, signY] = [Math.sign(x), Math.sign(y)];
          let degree = (Math.atan(y / x) * 180) / Math.PI;
          if (signX < 0 && signY > 0) {
            degree += 90;
          } else if (signX < 0 && signY <= 0) {
            degree += 90;
          } else if (signX >= 0 && signY < 0) {
            degree += 270;
          } else if (signX >= 0 && signY > 0) {
            degree += 270;
          }
          let curTime = Math.floor(vnode.context.timeInit * (1 - degree / 360));
          if (curTime !== vnode.context.timeLeft && curTime % 10 === 0) {
            if (curTime === 0) {
              curTime = vnode.context.timeInit;
            }
            vnode.context.setLeftTime(curTime);
          }
        }

        el.addEventListener('mousedown', () => {
          rootWidth = document.querySelector('.root').offsetWidth;
          rootHeight = document.querySelector('.root').offsetHeight;
          vnode.context.isTransition = false;
          vnode.context.pauseTimer();
          document.addEventListener('mousemove', mousemove);
          return false;
        });
      },
    },
  },
};
</script>

<style lang="sass" scoped>
.timer-circle-bar
  position: relative
  height: 75vh
  width: 90vw

  @include md
    min-height: 95vh
    max-height: 95vh
    min-width: 95vw
    max-width: 95vw

  .timer-circle-bar__slot
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

  .timer-circle-bar__container
    height: 100%
    width: 100%

    circle
      stroke-width: 10
      fill: transparent

      &.timer-circle-bar__background
        stroke: var(--primary)

      &.timer-circle-bar__progress
        stroke: var(--dark)

      &.timer-circle-bar__line
        stroke: transparent
        transition: stroke 0.3s

        &:hover
          stroke: var(--super-light)
          cursor: grab

</style>
