<template>
  <div class="graph d-flex justify-content-center">
    <svg
      class="graph__container"
      :viewBox="'0 0 ' + svgWidth + ' ' + svgHeight"
    >
      <g transform="translate(0, 150) scale(1, -1)">
        <template v-for="(item, index) in statisticRanged">
          <!-- BAR -->
          <rect
            class="graph__bar"
            :key="`rect_1_${index}`"
            :width="barWidth"
            :height="item.value * barsUnit"
            :x="barsStep * (index + 1) - barWidth / 2"
            :y="bottomSpace"
            @click="activateModal(index)"
            @mouseover="showTooltip(index + offsetReversed)"
            @mouseleave="isTooltipShown = false"
            @mousemove="moveTooltip"
          />
          <rect
            class="graph__control-line"
            :key="`rect_2_${index}`"
            v-draggable
            :width="barWidth"
            :height="controlLineWidth"
            :x="barsStep * (index + 1) - (1 / 2) * barWidth"
            :y="bottomSpace + item.value * barsUnit - controlLineWidth"
            :data-index="index"
          />
          <g
            v-if="statisticRanged.length < 15"
            transform="scale(1, -1)"
            :key="`g_${index}`"
          >
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
            <tspan
              :x="graphWidth"
              :dy="barCounterFont + 'px'"
            >
              {{ stats.mean.toFixed(2) }}
            </tspan>
            <tspan
              :x="graphWidth"
              :dy="barCounterFont + 'px'"
            >
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
          v-draggable="'progress'"
          class="graph__control-line"
          :width="barWidth"
          :height="controlLineWidth"
          :x="svgWidth - 4 * barWidth"
          :y="bottomSpace + pomodorosTotal * barsUnit - controlLineWidth"
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
            :key="`rect_${index}`"
            :width="miniBarWidth"
            :height="item.value * miniBarsUnit"
            :x="miniBarsStep * index + (miniBarsStep / 2) - (miniBarWidth / 2)"
            :y="statsSpace"
            @mouseover="showTooltip(index)"
            @mouseleave="isTooltipShown = false"
            @mousemove="moveTooltip"
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
          v-draggable-scale
          class="graph__scale-area"
          :width="miniBarsStep * (range[1] - range[0])"
          :height="bottomSpace - 2 * axisGap - statsSpace"
          :x="miniBarsStep * range[0]"
          :y="statsSpace"
        />
        <rect
          v-scaleable="'left'"
          class="graph__scale-control"
          :width="2"
          :height="bottomSpace - 2 * axisGap - statsSpace"
          :x="miniBarsStep * range[0]"
          :y="statsSpace"
        />
        <rect
          v-scaleable="'right'"
          class="graph__scale-control"
          :width="2"
          :height="bottomSpace - 2 * axisGap - statsSpace"
          :x="miniBarsStep * range[1] - miniBarWidth"
          :y="statsSpace"
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
          </text>
          <text
            class="noselect"
            :style="{'font-size': barCounterFont + 'px', 'text-anchor': 'middle'}"
            style=""
            :x="svgWidth / 2"
            :y="0"
          >
            Min: {{ stats.min }}
          </text>
          <text
            class="noselect"
            :style="{'font-size': barCounterFont + 'px', 'text-anchor': 'end'}"
            style=""
            :x="svgWidth"
            :y="0"
          >
            Max: {{ stats.max }}
          </text>
        </g>

      </g>
    </svg>

    <statistic-tooltip
      :is-shown="isTooltipShown"
      :item="statistic[activeBarIdx] || {}"
      :x="tooltipX"
      :y="tooltipY"
    />

    <statistic-popup
      v-model="isPopupShown"
      :total="barValue"
      :note="barNote"
      @add="addBar"
      @save="onSaveBar"
      @remove="removeBar"
    />

  </div>
</template>

<script>
import { mapState } from 'vuex';

import StatisticTooltip from '@/components/Statistic/StatisticTooltip.vue';
import StatisticPopup from '@/components/Statistic/StatisticPopup.vue';

export default {
  components: {
    StatisticTooltip,
    StatisticPopup,
  },
  data() {
    return {
      isPopupShown: false,
      isTooltipShown: false,
      tooltipX: 0,
      tooltipY: 0,
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
      offset: 0,
    };
  },
  computed: {
    ...mapState([
      'pomodorosTotal',
      'statistic',
    ]),
    maxBarHeight() {
      return this.barsSpace - this.barCounterFont - this.barCounterTextGap;
    },
    barsStep() {
      return this.graphWidth / (this.statisticRanged.length + 1);
    },
    barsUnit() {
      const allValues = [...this.statisticRanged.map((item) => item.value), this.pomodorosTotal];
      return this.maxBarHeight / Math.max(...allValues);
    },
    miniBarsUnit() {
      const allValues = [...this.statistic.map((item) => item.value), this.pomodorosTotal];
      return (this.bottomSpace - 2 * this.axisGap - this.statsSpace) / Math.max(...allValues);
    },
    miniBarWidth() {
      return (this.svgWidth / (this.statistic.length)) * 0.3;
    },
    miniBarsStep() {
      return this.svgWidth / (this.statistic.length);
    },
    modalData() {
      return {
        text: this.statisticRanged[this.activeBarIdx].text,
      };
    },
    range() {
      const end = this.statistic.length - this.offset < 0 ? 0 : this.statistic.length - this.offset;
      const start = end - this.scale < 0 ? 0 : end - this.scale;
      return [start, end];
    },
    statisticRanged() {
      return this.statistic.slice(...this.range);
    },
    offsetReversed() {
      const result = this.statistic.length - this.offset - this.scale;
      return result < 0 ? 0 : result;
    },
    stats() {
      const statistic = this.statistic.map((item) => item.value);
      const statisticNew = [...statistic, this.pomodorosTotal];
      let [sum, sumNew, mean, meanNew, delta, min, max] = [0, 0, 0, 0, 0, 0, 0];
      if (statistic.length > 0) {
        statistic.forEach((value) => {
          sum += value;
        });
        mean = (sum / statistic.length);
        min = Math.min(...statistic);
        max = Math.max(...statistic);
      }
      statisticNew.forEach((value) => {
        sumNew += value;
      });
      meanNew = (sumNew / statisticNew.length);
      delta = meanNew - mean;
      return {
        sum, sumNew, mean, meanNew, delta, min, max,
      };
    },
    // pomodorosAverageNew() {
    //   return (this.pomodorosSum / this.statistic.length).toFixed(2);
    // },
    barValue() {
      if (this.activeBarIdx !== null) {
        return this.statisticRanged[this.activeBarIdx]?.value;
      }
      return 0;
    },
    barNote() {
      if (this.activeBarIdx !== null) {
        return this.statisticRanged[this.activeBarIdx]?.note;
      }
      return '';
    },
  },
  methods: {
    onSaveBar({ total, note }) {
      this.$store.commit('EDIT_STATISTIC_ITEM', {
        index: this.activeBarIdx + this.offsetReversed,
        value: total,
        note,
      });
      this.isPopupShown = false;
    },
    commitCurrent() {
      this.$store.commit('ADD_STATISTIC', { value: this.pomodorosTotal });
    },
    addBar() {
      this.$store.commit(
        'ADD_STATISTIC',
        { index: this.activeBarIdx + this.offsetReversed + 1, value: 0 },
      );
      this.isPopupShown = false;
    },
    activateModal(index) {
      this.activeBarIdx = index;
      this.isPopupShown = true;
    },
    showTooltip(index) {
      this.isTooltipShown = true;
      this.activeBarIdx = index;
    },
    moveTooltip(event) {
      this.tooltipX = event.clientX;
      this.tooltipY = event.clientY;
    },
    removeBar() {
      this.$store.commit('REMOVE_STATISTIC', this.activeBarIdx + this.offsetReversed);
      this.activeBarIdx = null;
      this.isPopupShown = false;
    },
  },
  directives: {
    draggable: {
      bind(el, binding, vnode) {
        let canvasHeight;
        let initY;
        let curPomodoros;
        let curBarIdx;

        function mousemove(e) {
          if (e.buttons === 0) {
            document.removeEventListener('mousemove', mousemove);
            return;
          }
          const dy = ((initY - e.clientY) * 150) / canvasHeight;
          const dp = Math.floor(dy / vnode.context.barsUnit);
          const pomodorosToSet = curPomodoros + dp < 0 ? 0 : curPomodoros + dp;
          if (binding.value === 'progress') {
            vnode.context.$store.commit('SET_POMODOROS_TOTAL', pomodorosToSet);
          } else {
            vnode.context.$store.commit('EDIT_STATISTIC_ITEM', {
              index: curBarIdx + vnode.context.offsetReversed,
              value: pomodorosToSet,
            });
          }
          // return false;
        }

        el.addEventListener('mousedown', (e) => {
          if (binding.value === 'progress') {
            curPomodoros = vnode.context.pomodorosTotal;
          } else {
            curBarIdx = +e.currentTarget.getAttribute('data-index');
            curPomodoros = vnode.context.statisticRanged[curBarIdx].value;
          }
          canvasHeight = document.querySelector('.graph__container').clientHeight;
          initY = e.clientY;
          document.addEventListener('mousemove', mousemove);
          return false;
        });
      },
    },
    'draggable-scale': {
      bind(el, binding, vnode) {
        let canvasWidth; let initX; let
          initOffset;

        function mousemove(e) {
          if (e.buttons === 0) {
            document.removeEventListener('mousemove', mousemove);
            return;
          }
          const dx = ((initX - e.clientX) * 150) / canvasWidth;
          const dp = Math.floor(dx / vnode.context.miniBarsStep);

          if (initOffset + dp < 0) {
            vnode.context.offset = 0;
          } else if (initOffset + dp >= vnode.context.statistic.length - vnode.context.scale) {
            vnode.context.offset = vnode.context.statistic.length - vnode.context.scale;
          } else {
            vnode.context.offset = initOffset + dp;
          }
          // return false;
        }

        el.addEventListener('mousedown', (e) => {
          canvasWidth = document.querySelector('.graph__container').clientWidth;
          initX = e.clientX;
          initOffset = vnode.context.offset;
          document.addEventListener('mousemove', mousemove);
          return false;
        });
      },
    },
    scaleable: {
      bind(el, binding, vnode) {
        let canvasWidth; let initX; let initScale; let
          initOffset;

        function mousemove(e) {
          if (e.buttons === 0) {
            document.removeEventListener('mousemove', mousemove);
            return;
          }
          const dx = ((initX - e.clientX) * 150) / canvasWidth;
          const dp = Math.floor(dx / vnode.context.miniBarsStep);
          let newScale;
          if (binding.value === 'left') {
            newScale = initScale + dp;
            if (newScale < 1 || newScale > vnode.context.statistic.length) { return; }
            vnode.context.scale = newScale;
          } else {
            newScale = initScale - dp;
            if (initOffset + dp < 0) { return; }
            if (newScale < 1 || newScale > vnode.context.statistic.length) { return; }
            vnode.context.scale = newScale;
            if (initOffset + dp < 0) {
              vnode.context.offset = 0;
            } else if (initOffset + dp >= vnode.context.statistic.length - vnode.context.scale) {
              vnode.context.offset = vnode.context.statistic.length - vnode.context.scale;
            } else {
              vnode.context.offset = initOffset + dp;
            }
          }
          // return false;
        }

        el.addEventListener('mousedown', (e) => {
          canvasWidth = document.querySelector('.graph__container').clientWidth;
          initX = e.clientX;
          initScale = vnode.context.scale;
          initOffset = vnode.context.offset;
          document.addEventListener('mousemove', mousemove);
          return false;
        });
      },
    },
  },
};
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
