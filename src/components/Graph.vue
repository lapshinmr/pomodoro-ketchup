<template>
  <div class="graph">
    <svg class="graph__container" :viewBox="'0 0 ' + svgWidth + ' ' + svgHeight">
      <g transform="translate(0, 150) scale(1, -1)">
        <template v-for="(item, index) in statistic">
          <transition name="fade">
            <rect
              class="graph__bar"
              :width="10"
              :height="item.value * barsUnit"
              :x="barsStep * (index + 1) - 5"
              :y="bottomGap"
              @click="removeStatistic(index)"
            />
          </transition>
          <rect
            class="graph__control-line"
            :width="10"
            :height="2"
            :x="barsStep * (index + 1) - 5"
            :y="bottomGap + item.value * barsUnit - 2"
            v-draggable
            :data-index="index"
          />
          <g transform="scale(1, -1)">
            <text
              class="graph__text noselect"
              :x="barsStep * (index + 1)"
              :y="-(bottomGap + item.value * barsUnit + textGap)"
            >
              {{ item.value }}
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
    <div class="settings__element" style="z-index: 10000;"@click="commitCurrent">
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
      svgHeight: 150,
      svgWidth: 150,
      topGap: 8,
      textGap: 2,
      bottomGap: 5,
    }
  },
  computed: {
    ...mapState([
      'pomodorosTotal',
      'statistic'
    ]),
    maxBarHeight () {
      return this.svgHeight - this.bottomGap - this.topGap - this.textGap
    },
    barsStep () {
      console.log(this.statistic.length)
      return this.svgWidth / (this.statistic.length + 1)
    },
    barsUnit () {
      return this.maxBarHeight / Math.max(...this.statistic.map(item => item.value))
    }
  },
  methods: {
    ...mapActions([
      'addStatistic',
      'editStatisticValue',
      'editStatisticNote',
      'removeStatistic'
    ]),
    commitCurrent() {
      this.addStatistic(this.pomodorosTotal)
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
          let dy = (initY - e.clientY) * 150 / canvasHeight;
          let dp = Math.ceil(dy / vnode.context.barsUnit);
          let pomodorosToSet = curPomodoros + dp < 0 ? 0 : curPomodoros + dp;
          vnode.context.editStatisticValue({
            index: curBarIdx,
            value: pomodorosToSet
          });
          return false;
        }

        el.addEventListener('mousedown', (e) => {
          curBarIdx = e.currentTarget.getAttribute('data-index')
          curPomodoros = vnode.context.statistic[curBarIdx].value
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
    font-size: 8px
    text-align: center
    fill: var(--dark)
    text-anchor: middle
</style>
