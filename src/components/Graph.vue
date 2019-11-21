<template>
  <div class="graph d-flex justify-content-center">

    <modal v-if="isOpened" class="graph__modal" :toggle-modal="toggleModal" :isOpened="isOpened">
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
    </modal>

    <transition name="fade">
      <popup v-if="isOpenedPopup" :coordinates="{x: popupX, y: popupY}">
        <div class="" slot="note">
          {{ statistic[activeBarIdx].note }}
        </div>
        <div class="" slot="count">
          {{ statistic[activeBarIdx].value }}
          pomodoro{{ statistic[activeBarIdx].value > 1 ? 's' : '' }}
        </div>
      </popup>
    </transition>

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
            @click="activateModal(index)"
            @mouseover="popupOpen(index + offsetReversed)"
            @mouseleave="isOpenedPopup = false"
            @mousemove="popupMove"
          />
          <rect
            class="graph__control-line"
            :width="barWidth"
            :height="controlLineWidth"
            :x="barsStep * (index + 1) - (1 / 2) * barWidth"
            :y="bottomSpace + item.value * barsUnit - controlLineWidth"
            v-draggable
            :data-index="index"
          />
          <g v-if="statisticRanged.length < 15" transform="scale(1, -1)">
            <text
              class="graph__counter noselect"
              :style="{'font-size': barCounterFont + 'px'}"
              :x="barsStep * (index + 1)"
              :y="-(bottomSpace + item.value * barsUnit + barCounterTextGap)"
            >
              {{ item.value }}
            </text>
          </g>
        </template>

        <!-- AVERAGE -->
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
            :style="{'font-size': barCounterFont - 1 + 'px'}"
            :x="graphWidth"
            :y="- ( stats.mean * barsUnit + bottomSpace + 2 * barCounterFont )"
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
          class="graph__bar graph__add"
          :width="barWidth"
          :height="pomodorosTotal * barsUnit"
          :x="svgWidth - 4* barWidth"
          :y="bottomSpace"
        />
        <rect
          class="graph__control-line"
          :width="barWidth"
          :height="controlLineWidth"
          :x="svgWidth - 4 * barWidth"
          :y="bottomSpace + pomodorosTotal * barsUnit - controlLineWidth"
          v-draggable="'progress'"
        />
        <g transform="scale(1, -1)">
          <text
            class="graph__add-counter noselect"
            :style="{'font-size': barCounterFont + 'px', 'text-anchor': 'middle'}"
            :x="svgWidth - ( 3 + 1/2 ) * barWidth"
            :y="-(bottomSpace + pomodorosTotal * barsUnit + barCounterTextGap)"
          >
            {{ pomodorosTotal }}
          </text>
          <text
            class="graph__add-button noselect"
            :style="{'font-size': barCounterFont + 1 + 'px', 'text-anchor': 'middle'}"
            :x="svgWidth - ( 3 + 1/2 ) * barWidth"
            :y="-(bottomSpace - ( 1 + 1/2 ) * axisGap)"
            @click="commitCurrent"
          >
            commit
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

        <!-- MINI BARS -->
        <template v-for="(item, index) in statistic">
          <rect
            class="graph__bar"
            :width="miniBarWidth"
            :height="item.value * miniBarsUnit"
            :x="miniBarsStep * index + (miniBarsStep / 2) - (miniBarWidth / 2)"
            :y="statsSpace"
            @mouseover="popupOpen(index)"
            @mouseleave="isOpenedPopup = false"
            @mousemove="popupMove"
          />
        </template>

        <line
          class="graph__average"
          :style="{'stroke-width': meanWidth + 'px'}"
          :x1="0"
          :x2="svgWidth"
          :y1="stats.mean * miniBarsUnit + statsSpace"
          :y2="stats.mean * miniBarsUnit + statsSpace"
        />

        <!-- SCALE CONTROL -->
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
          :x="miniBarsStep * range[1] - miniBarWidth"
          :y="statsSpace"
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
          <text
            class="noselect"
            :style="{'font-size': barCounterFont + 'px', 'text-anchor': 'middle'}"
            style=""
            :x="svgWidth / 2"
            :y="0"
          >
              Min: {{ stats.min }}
            </tspan>
          </text>
          <text
            class="noselect"
            :style="{'font-size': barCounterFont + 'px', 'text-anchor': 'end'}"
            style=""
            :x="svgWidth"
            :y="0"
          >
              Max: {{ stats.max }}
            </tspan>
          </text>
        </g>

      </g>
    </svg>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Modal from './Modal.vue';
import Popup from './Popup.vue';

export default {
  components: { Modal, Popup },
  data() {
    return {
      isOpened: false,
      isOpenedPopup: false,
      popupX: 0,
      popupY: 0,
      activeBarIdx: null,

      // SIZES
      svgHeight: 150,
      svgWidth: 150,
      graphWidth: 120,

      barsSpace: 120,
      bottomSpace: 30,

      barWidth: 3,
      controlLineWidth: 1,
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
    modalData () {
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
      let [ sum, sumNew, mean, meanNew, delta, min, max ] = [0, , 0, , , 0, 0];
      if (statistic.length > 0) {
        sum = statistic.reduce((result, value) => result += value );
        mean = ( sum / statistic.length )
        min = Math.min(...statistic)
        max = Math.max(...statistic)
      }
      sumNew = statisticNew.reduce((result, value) => result += value );
      meanNew = ( sumNew / statisticNew.length )
      delta = meanNew - mean
      return {
        sum, sumNew, mean, meanNew, delta, min, max
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
      'removeStatistic',
      'setPomodorosTotal'
    ]),
    commitCurrent() {
      this.addStatistic({ value: this.pomodorosTotal })
    },
    addBar() {
      this.addStatistic({ index: this.activeBarIdx + this.offsetReversed + 1, value: 0 })
      this.toggleModal()
    },
    toggleModal() {
      this.isOpened = !this.isOpened;
    },
    activateModal(index) {
      this.activeBarIdx = index;
      this.toggleModal();
    },
    popupOpen(index) {
      this.isOpenedPopup = true;
      this.activeBarIdx = index;

    },
    popupMove() {
      this.popupX = event.clientX;
      this.popupY = event.clientY;
    },
    removeBar() {
      this.removeStatistic(this.activeBarIdx + this.offsetReversed)
      this.activeBar = null;
      this.isOpened = false;
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
          if (binding.value === 'progress') {
            vnode.context.setPomodorosTotal(pomodorosToSet)
          } else {
            vnode.context.editStatisticValue({
              index: curBarIdx + vnode.context.offsetReversed,
              value: pomodorosToSet
            });
          }
          return false;
        }

        el.addEventListener('mousedown', (e) => {
          if (binding.value === 'progress') {
            curPomodoros = vnode.context.pomodorosTotal;
          } else {
            curBarIdx = parseInt(e.currentTarget.getAttribute('data-index'))
            curPomodoros = vnode.context.statisticRanged[curBarIdx].value
          }
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
svg
  rect
    fill: var(--primary)
  text
    fill: var(--dark)
  line
    stroke: var(--dark)

.graph
  height: 80vh

  .graph__container
    height: 100%

  .graph__bar
    fill: var(--primary)
    opacity: 0.75
    transition: all 0.15s
    &:hover
      fill: var(--dark)
      cursor: pointer
    &:hover + .graph__control-line
      fill: var(--super-dark)

  .graph__control-line
    cursor: row-resize
    fill: transparent
    &:hover
      fill: var(--dark)

  .graph__counter
    text-anchor: middle

  .graph__add
    opacity: 1

  .graph__add-counter
  .graph__add-button
    cursor: pointer
    transition: all .15s
    &:hover
      fill: var(--primary)

  .graph__axis
  .graph__average
    stroke-dasharray: 1.5px

  .graph__scale-area
    fill: var(--dark)
    opacity: 0.5
    cursor: grab
    transition: all .15s
    &:hover ~ .graph__scale-control
      fill: var(--super-dark)

  .graph__scale-control
    fill: transparent
    transition: all .15s
    cursor: col-resize
    opacity: 0.5
    &:hover
      fill: var(--super-dark)

</style>
