<template>
  <div class="graph">
    <popup v-if="isOpened" :toggle-popup="togglePopup" :isOpened="isOpened">
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
        <template v-for="(item, index) in statistic">
          <transition name="fade">
            <rect
              class="graph__bar"
              :width="barWidth"
              :height="item.value * barsUnit"
              :x="barsStep * (index + 1) - barWidth / 2"
              :y="barStart"
              @click="activatePopup(index)"
            />
          </transition>
          <rect
            class="graph__control-line"
            :width="barWidth"
            :height="2"
            :x="barsStep * (index + 1) - barWidth / 2"
            :y="barStart + item.value * barsUnit - 2"
            v-draggable
            :data-index="index"
          />
          <g transform="scale(1, -1)">
            <text
              class="graph__text noselect"
              :x="barsStep * (index + 1)"
              :y="-(barStart + item.value * barsUnit + textGap)"
            >
              {{ item.value }}
            </text>
          </g>
          <g transform="scale(1, -1)">
            <text
              class="graph__note noselect"
              :x="barsStep * (index + 1) + barWidth / 4"
              :y="-(underlineSpace - underlineTopGap)"
              :transform="'rotate(-45, ' + (barsStep * (index + 1) + barWidth / 4) + ', ' + ( - (underlineSpace - underlineTopGap) ) + ')'"
            >
              {{ item.note }}
            </text>
          </g>
        </template>

        <line
          class="graph__axis"
          :x1="0"
          :x2="graphWidth"
          :y1="underlineSpace"
          :y2="underlineSpace"
        />

        <rect
          class="graph__add"
          :width="barWidth"
          :height="pomodorosTotal * barsUnit"
          :x="svgWidth - barWidth"
          :y="barStart"
          @click="commitCurrent"
        />
        <g transform="scale(1, -1)">
          <text
            class="graph__add-text noselect"
            :x="svgWidth - barWidth / 2"
            :y="-(barStart + pomodorosTotal * barsUnit + textGap)"
          >
            {{ pomodorosTotal }}
          </text>
          <text
            class="graph__add-note noselect"
            :x="svgWidth - barWidth / 2"
            :y="-(underlineSpace - underlineTopGap)"
          >
            progress
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
      svgHeight: 150,
      svgWidth: 150,
      graphWidth: 120,
      barWidth: 10,
      topBarGap: 8,
      bottomBarGap: 5,
      textGap: 2,
      underlineSpace: 35,
      underlineTopGap: 5
    }
  },
  computed: {
    ...mapState([
      'pomodorosTotal',
      'statistic'
    ]),
    maxBarHeight () {
      return this.svgHeight - this.barStart - this.topBarGap - this.textGap
    },
    barStart () {
      return this.bottomBarGap + this.underlineSpace
    },
    barsStep () {
      return this.graphWidth / (this.statistic.length + 1)
    },
    barsUnit () {
      let allValues = [...this.statistic.map(item => item.value), this.pomodorosTotal]
      return this.maxBarHeight / Math.max(...allValues)
    },
    popupData () {
      return {
        text: this.statistic[this.activeBarIdx].text
      }
    },
    barValue: {
      get() {
        if (this.activeBarIdx !== null) {
          return this.statistic[this.activeBarIdx].value
        }
        return;
      },
      set(value) {
        if (!parseInt(value)) {
          return;
        }
        this.editStatisticValue({
          index: this.activeBarIdx,
          value: value
        })
      }
    },
    barNote: {
      get() {
        if (this.activeBarIdx !== null) {
          return this.statistic[this.activeBarIdx].note
        }
        return;
      },
      set(value) {
        this.editStatisticNote({
          index: this.activeBarIdx,
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
      this.addStatistic({ index: this.activeBarIdx + 1, value: 10 })
    },
    togglePopup() {
      this.isOpened = !this.isOpened;
    },
    activatePopup(index) {
      this.activeBarIdx = index;
      this.togglePopup();
    },
    removeBar() {
      this.removeStatistic(this.activeBarIdx)
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
    &:hover
      fill: var(--dark)
      cursor: pointer
    &:hover + .graph__control-line
      fill: var(--super-light)

  .graph__text
    font-size: 8px
    fill: var(--dark)
    text-anchor: middle

  .graph__note
    font-size: 5px
    fill: var(--dark)
    text-anchor: end

  .graph__add
    fill: var(--primary)
    &:hover
      fill: var(--dark)
      cursor: pointer

  .graph__add-text
    font-size: 8px
    fill: var(--dark)
    text-anchor: middle

  .graph__add-note
    font-size: 6px
    fill: var(--dark)
    text-anchor: middle

  .graph__control-line
    fill: var(--primary)
    cursor: grab
    &:hover
      fill: var(--dark)

  .graph__axis
    stroke: var(--dark)
    stroke-width: 0.2vw
</style>
