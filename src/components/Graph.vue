<template>
  <div class="graph">
    <svg class="graph__container" :viewBox="'0 0 ' + svgWidth + ' ' + svgHeight">
      <g transform="translate(0, 150) scale(1, -1)">
        <template v-for="(pomodoros, index) in weeks">
          <transition name="fade">
            <rect
              class="graph__bar"
              :width="10"
              :height="pomodoros * barsUnit"
              :x="barsStep * (index + 1) - 5"
              :y="bottomGap"
              @click="weeks.splice(index, 1)"
            />
          </transition>
          <rect
            class="graph__control-line"
            :width="10"
            :height="2"
            :x="barsStep * (index + 1) - 5"
            :y="bottomGap + pomodoros * barsUnit - 2"
            v-draggable
            :data-index="index"
          />
          <g transform="scale(1, -1)">
            <text
              class="graph__text noselect"
              :x="barsStep * (index + 1)"
              :y="-(bottomGap + pomodoros * barsUnit + textGap)"
            >
              {{ pomodoros }}
            </text>
          </g>
        </template>
        <line
          class="graph__axis"
          :x1="0"
          :x2="150"
          :y1="0"
          :y2="0"
        />
      </g>
    </svg>
    <div class="settings__element" style="z-index: 10000;"@click="increase">
      +
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      test: 10,
      weeks: [58, 34, 36, 67, 43, 23, 66],
      svgHeight: 150,
      svgWidth: 150,
      maxBarHeight: 120,
      textGap: 3,
      bottomGap: 5,
      topGap: 20
    }
  },
  computed: {
    ...mapState([
      'pomodorosTotal'
    ]),
    barsStep () {
      return this.svgWidth / (this.weeks.length + 1)
    },
    barsUnit () {
      return this.maxBarHeight / Math.max(...this.weeks)
    }
  },
  methods: {
    increase() {
      console.log(this.pomodorosTotal)
      this.weeks.push(this.pomodorosTotal)
    }
  },
  directives: {
    'draggable': {
      bind(el, binding, vnode) {
        let canvasHeight, initY, curPomodoros, curBarIdx;

        function mousemove(e) {
          if (e.buttons === 0) {
            document.removeEventListener('mousemove', mousemove);
            return
          };
          let dy = (initY - e.clientY) * 150 / canvasHeight
          let dp = Math.ceil(dy / vnode.context.barsUnit)
          let pomodorosToSet = curPomodoros + dp < 0 ? 0 : curPomodoros + dp
          vnode.context.$set(vnode.context.weeks, curBarIdx, pomodorosToSet)
          return false;
        }

        el.addEventListener('mousedown', (e) => {
          curBarIdx = e.currentTarget.getAttribute('data-index')
          curPomodoros = vnode.context.weeks[curBarIdx]
          canvasHeight = document.querySelector('.graph__container').clientHeight
          initY = e.clientY
          document.addEventListener('mousemove', mousemove);
          return false;
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.graph
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

  .graph__container
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%, -50%)
    height: 100%
    width: 100%

  .graph__bar
    fill: var(--primary)
    &:hover + .graph__control-line
      fill: var(--dark)

  .graph__control-line
    fill: var(--primary)
    cursor: grab
    &:hover
      fill: var(--dark)

  .graph__axis
    stroke: var(--dark)
    stroke-width: 0.2vw

  .graph__text
    font-size: 1.2vh
    text-align: center
    fill: var(--dark)
    text-anchor: middle
</style>
