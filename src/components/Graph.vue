<template>
  <div class="graph d-flex justify-content-center">

    <popup v-if="isOpened" class="graph__popup" :toggle-popup="togglePopup" :isOpened="isOpened">
      <button type="button" class="close" aria-label="Close" @click="isOpened = false">
        <span aria-hidden="true">&times;</span>
      </button>
      <div class="mb-2">
        <small class="form-text text-muted mb-1">
          Pomodoros
        </small>
        <input type="text"
               class="form-control"
               v-model.lazy.number="barValue"
        >
      </div>
      <div class="mb-2">
        <small class="form-text text-muted mb-1">
          Note
        </small>
        <input type="text"
               class="form-control"
               v-model.lazy.text="barNote"
        >
      </div>
      <div>
        <button type="button"
                name="button"
                class="btn btn-success btn-sm"
                @click="removeBar"
        >Remove</button>
        <button type="button"
                name="button"
                class="btn btn-success btn-sm ml-2"
                @click="addBar"
        >Add bar</button>
      </div>
    </popup>

    <svg class="graph__container" :viewBox="'0 0 ' + svgWidth + ' ' + svgHeight">
      <g transform="translate(0, 150) scale(1, -1)">
        <template v-for="(item, index) in statisticRanged">
          <!-- BAR -->
          <rect
            class="graph__bar"
            :width="barWidth"
            :height="item.value * barsUnit"
            :x="barsStep * (index + 1) - barWidth / 2"
            :y="bottomSpace"
            @click="activatePopup(index)"
          />
          <!-- BAR CONTROL LINE -->
          <rect
            class="graph__control-line"
            :width="barWidth"
            :height="2"
            :x="barsStep * (index + 1) - barWidth / 2"
            :y="bottomSpace + item.value * barsUnit - 2"
            v-draggable
            :data-index="index"
          />
          <g transform="scale(1, -1)">
            <text
              class="graph__counter noselect"
              :style="{'font-size': barCounterFont + 'px'}"
              :x="barsStep * (index + 1)"
              :y="-(bottomSpace + item.value * barsUnit + barCounterTextGap)"
            >
              {{ item.value }}
            </text>

            <!--
            <text
              class="graph__note noselect"
              :style="{'font-size': barCounterFont - 1 + 'px'}"
              :x="barsStep * (index + 1) + barWidth / 4"
              :y="-(bottomSpace - underlineTopGap)"
              :transform="'rotate(-60, ' + (barsStep * (index + 1) + barWidth / 4) + ', ' + ( - (bottomSpace - underlineTopGap) ) + ')'"
            >
              {{ item.note }}
            </text>
            -->
          </g>
        </template>

        <!-- LINES -->
        <line
          class="graph__average"
          :style="{'stroke-width': meanWidth + 'px'}"
          :x1="0"
          :x2="graphWidth"
          :y1="stats.mean * barsUnit + bottomSpace"
          :y2="stats.mean * barsUnit + bottomSpace"
        />
        <g transform="scale(1, -1)">
          <text
            class="noselect"
            :style="{'font-size': barCounterFont + 'px'}"
            :x="graphWidth"
            :y="- ( stats.mean * barsUnit + bottomSpace + barCounterFont )"
          >
            <tspan :x="graphWidth" :dy="barCounterFont + 'px'">
              {{ stats.mean.toFixed(2) }}
            </tspan>
            <tspan :x="graphWidth" :dy="barCounterFont + 'px'">
              {{ (stats.delta > 0 ? '+' : '') + (stats.delta).toFixed(2) }}
            </tspan>
          </text>
        </g>

        <!-- CURRENT PROGRESS -->
        <rect
          class="graph__add"
          :width="barWidth"
          :height="pomodorosTotal * barsUnit"
          :x="svgWidth - barWidth"
          :y="bottomSpace"
          @click="commitCurrent"
        />
        <g transform="scale(1, -1)">
          <text
            class="graph__add-text noselect"
            :x="svgWidth - barWidth / 2"
            :y="-(bottomSpace + pomodorosTotal * barsUnit + barCounterTextGap)"
          >
            {{ pomodorosTotal }}
          </text>
          <text
            class="graph__add-note noselect"
            :x="svgWidth - barWidth / 2"
            :y="-(bottomSpace)"
          >
            progress
          </text>
        </g>

        <!-- AXIS -->
        <line
          class="graph__axis"
          :style="{'stroke-width': axisWidth + 'px'}"
          :x1="0"
          :x2="graphWidth"
          :y1="bottomSpace - axisGap"
          :y2="bottomSpace - axisGap"
        />


        <!-- VIEW CONTROL
        <g transform="scale(1, -1)">
          <text
            class="graph__move graph__move--left noselect"
            :x="0"
            :y="-( bottomSpace + maxBarHeight / 2)"
            @click="moveLeft"
          >
            &#xf053;
          </text>
          <text
            class="graph__move graph__move--right noselect"
            :x="graphWidth"
            :y="-( bottomSpace + maxBarHeight / 2 )"
            @click="moveRight"
          >
            &#xf054;
          </text>
        </g>
         -->

        <!-- MINI BARS -->
        <template v-for="(item, index) in statistic">
          <rect
            class="graph__bar"
            :width="miniBarWidth"
            :height="item.value * miniBarsUnit"
            :x="miniBarsStep * index + (miniBarsStep / 2)"
            :y="statsSpace"
          />
        </template>

        <rect
          class="graph__scale-area"
          :width="miniBarsStep * (range[1] - range[0])"
          :height="bottomSpace - 2 * axisGap - statsSpace"
          :x="miniBarsStep * range[0]"
          :y="statsSpace"
          v-draggable-scale
        />
        <rect
          class="graph__scale-control"
          :width="2"
          :height="bottomSpace - 2 * axisGap - statsSpace"
          :x="miniBarsStep * range[0]"
          :y="statsSpace"
          v-scaleable="'left'"
        />
        <rect
          class="graph__scale-control"
          :width="2"
          :height="bottomSpace - 2 * axisGap - statsSpace"
          :x="miniBarsStep * range[1] "
          :y="statsSpace"
          @click="moveRight"
          v-scaleable="'right'"
        />

        <!-- STATS -->
        <g transform="scale(1, -1)">
          <!-- Total -->
          <text
            class="noselect"
            :style="{'font-size': barCounterFont + 'px'}"
            style=""
            :x="0"
            :y="0"
          >
              Total: {{ stats.sumNew }}
            </tspan>
          </text>
        </g>

      </g>
    </svg>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Popup from './Popup.vue';

export default {
  components: { Popup },
  data() {
    return {
      isOpened: false,
      activeBarIdx: null,

      // SIZES
      svgHeight: 150,
      svgWidth: 150,
      graphWidth: 120,

      barsSpace: 120,
      bottomSpace: 30,

      barWidth: 3,
      axisWidth: 0.5,
      meanWidth: 0.5,

      barCounterTextGap: 2,
      axisGap: 5,
      statsSpace: 5,

      barCounterFont: 5,

      // VIEW
      scale: 10,
      offset: 0
    }
  },
  computed: {
    ...mapState([
      'pomodorosTotal',
      'statistic'
    ]),
    maxBarHeight () {
      return this.barsSpace - this.barCounterFont - this.barCounterTextGap
    },
    barsStep () {
      return this.graphWidth / (this.statisticRanged.length + 1)
    },
    barsUnit () {
      let allValues = [...this.statisticRanged.map(item => item.value), this.pomodorosTotal]
      return this.maxBarHeight / Math.max(...allValues)
    },
    miniBarsUnit () {
      let allValues = [...this.statistic.map(item => item.value), this.pomodorosTotal]
      return ( this.bottomSpace - 2 * this.axisGap - this.statsSpace) / Math.max(...allValues)
    },
    miniBarWidth () {
      return this.svgWidth / (this.statistic.length) * 0.3
    },
    miniBarsStep () {
      return this.svgWidth / (this.statistic.length)
    },
    popupData () {
      return {
        text: this.statisticRanged[this.activeBarIdx].text
      }
    },
    range () {
      let end = this.statistic.length - this.offset < 0 ? 0 : this.statistic.length - this.offset;
      let start = end - this.scale < 0 ? 0 : end - this.scale
      return [ start, end]
    },
    statisticRanged () {
      return this.statistic.slice(...this.range)
    },
    offsetReversed () {
      let result = this.statistic.length - this.offset - this.scale
      return result < 0 ? 0 : result
    },
    stats () {
      let statistic = this.statistic.map(item => item.value);
      let statisticNew = [...statistic, this.pomodorosTotal];
      let sum = statistic.reduce((result, value) => result += value );
      let sumNew = statisticNew.reduce((result, value) => result += value );
      let mean = ( sum / statistic.length )
      let meanNew = ( sumNew / statisticNew.length )
      let delta = meanNew - mean
      return {
        sum, sumNew, mean, meanNew, delta
      }
    },
    pomodorosMean () {
      return (this.pomodorosSum / this.statistic.length).toFixed(2)
    },
    pomodorosAverageNew () {
      return (this.pomodorosSum / this.statistic.length).toFixed(2)
    },
    barValue: {
      get() {
        if (this.activeBarIdx !== null) {
          return this.statisticRanged[this.activeBarIdx].value
        }
        return;
      },
      set(value) {
        if (!parseInt(value)) {
          return;
        }
        this.editStatisticValue({
          index: this.activeBarIdx + this.offsetReversed,
          value: value
        })
      }
    },
    barNote: {
      get() {
        if (this.activeBarIdx !== null) {
          return this.statisticRanged[this.activeBarIdx].note
        }
        return;
      },
      set(value) {
        this.editStatisticNote({
          index: this.activeBarIdx + this.offsetReversed,
          note: value
        })
      }
    },
  },
  methods: {
    ...mapActions([
      'addStatistic',
      'editStatisticValue',
      'editStatisticNote',
      'removeStatistic'
    ]),
    commitCurrent() {
      this.addStatistic({ value: this.pomodorosTotal })
    },
    addBar() {
      this.addStatistic({ index: this.activeBarIdx + this.offsetReversed + 1, value: 0 })
      this.togglePopup()
    },
    togglePopup() {
      this.isOpened = !this.isOpened;
    },
    activatePopup(index) {
      this.activeBarIdx = index;
      this.togglePopup();
    },
    removeBar() {
      this.removeStatistic(this.activeBarIdx + this.offsetReversed)
      this.activeBar = null;
      this.isOpened = false;
    },
    moveLeft() {
      if (this.offset < this.statistic.length - this.scale) {
        this.offset++
      }
    },
    moveRight() {
      if (this.offset > 0) {
        this.offset--
      }
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
          let dp = Math.floor(dy / vnode.context.barsUnit);
          let pomodorosToSet = curPomodoros + dp < 0 ? 0 : curPomodoros + dp;
          vnode.context.editStatisticValue({
            index: curBarIdx + vnode.context.offsetReversed,
            value: pomodorosToSet
          });
          return false;
        }

        el.addEventListener('mousedown', (e) => {
          curBarIdx = parseInt(e.currentTarget.getAttribute('data-index'))
          curPomodoros = vnode.context.statisticRanged[curBarIdx].value
          canvasHeight = document.querySelector('.graph__container').clientHeight
          initY = e.clientY
          document.addEventListener('mousemove', mousemove);
          return false;
        })
      }
    },
    'draggable-scale': {
      bind(el, binding, vnode) {
        let canvasWidth, initX, initOffset;

        function mousemove(e) {
          if (e.buttons === 0) {
            document.removeEventListener('mousemove', mousemove);
            return
          };
          let dx = (initX - e.clientX) * 150 / canvasWidth;
          let dp = Math.floor(dx / vnode.context.miniBarsStep);

          if (initOffset + dp < 0) {
            vnode.context.offset = 0
          } else if (initOffset + dp >= vnode.context.statistic.length - vnode.context.scale) {
            vnode.context.offset = vnode.context.statistic.length - vnode.context.scale
          } else {
            vnode.context.offset = initOffset + dp
          }
          return false;
        }

        el.addEventListener('mousedown', (e) => {
          canvasWidth = document.querySelector('.graph__container').clientWidth;
          initX = e.clientX;
          initOffset = vnode.context.offset;
          document.addEventListener('mousemove', mousemove);
          return false;
        })
      }
    },
    'scaleable': {
      bind(el, binding, vnode) {
        let canvasWidth, initX, initScale, initOffset;

        function mousemove(e) {
          if (e.buttons === 0) {
            document.removeEventListener('mousemove', mousemove);
            return
          };
          let dx = (initX - e.clientX) * 150 / canvasWidth;
          let dp = Math.floor(dx / vnode.context.miniBarsStep);
          let newScale;
          if (binding.value === 'left') {
            newScale = initScale + dp;
            if ( newScale < 1 || newScale > vnode.context.statistic.length ) { return }
            vnode.context.scale = newScale;
          } else {
            newScale = initScale - dp;
            if (initOffset + dp < 0) { return }
            if ( newScale < 1 || newScale > vnode.context.statistic.length ) { return }
            vnode.context.scale = newScale;
            if (initOffset + dp < 0) {
              vnode.context.offset = 0
            } else if (initOffset + dp >= vnode.context.statistic.length - vnode.context.scale) {
              vnode.context.offset = vnode.context.statistic.length - vnode.context.scale
            } else {
              vnode.context.offset = initOffset + dp
            }
          }
          return false;
        }

        el.addEventListener('mousedown', (e) => {
          canvasWidth = document.querySelector('.graph__container').clientWidth;
          initX = e.clientX;
          initScale = vnode.context.scale;
          initOffset = vnode.context.offset;
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
  height: 80vh

  .graph__container
    height: 100%

svg
  rect
    fill: var(--primary)
  text
    fill: var(--dark)

  .graph__bar
    fill: var(--primary)
    opacity: 0.75
    &:hover
      fill: var(--dark)
      cursor: pointer
    &:hover + .graph__control-line
      fill: var(--super-light)

  .graph__counter
    fill: var(--dark)
    text-anchor: middle

  .graph__note
    text-anchor: end

  .graph__add
    &:hover
      fill: var(--dark)
      cursor: pointer

  .graph__add-text
    font-size: 8px
    text-anchor: middle

  .graph__add-note
    font-size: 6px
    text-anchor: middle

  .graph__move
    font-size: 6px
    font-family: FontAwesome
    &.graph__move--left
      text-anchor: end
    &.graph__move--right
      text-anchor: start
    &:hover
      fill: var(--super-dark)
      cursor: pointer

  .graph__control-line
    cursor: grab
    &:hover
      fill: var(--dark)

  .graph__axis, .graph__average
    stroke: var(--dark)

  .graph__average
    stroke-dasharray: 1.5px

  .graph__scale-area
    fill: var(--dark)
    opacity: 0.5

  .graph__scale-control
    fill: var(--super-dark)

</style>
