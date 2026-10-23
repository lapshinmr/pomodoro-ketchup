<template>
  <div
    class="pomodoros-progress-bar"
    :style="progressBarStyle"
  >
    <transition-group
      name="fade"
      tag="div"
    >
      <div
        v-for="(split, index) in pomodorosSplits"
        :key="index"
        v-draggable-split="index"
        class="pomodoros-progress-bar__split d-flex align-items-center"
        :style="splitStyle(split)"
      >
        <span class="split__label noselect">+{{ splitDiff(split) }}</span>
        <div class="split__tick">
          <span class="split__total noselect">{{ split }}</span>
        </div>
      </div>
    </transition-group>
    <div
      v-draggable
      class="pomodoros-progress-bar__control-line"
    >
      <div class="control-line__padding" />
      <div class="control-line__line" />
      <div class="control-line__padding" />
    </div>
    <transition name="fade">
      <div
        v-if="pomodorosTotal"
        class="pomodoros-progress-bar__buttons d-flex"
      >
        <button
          class="btn-round"
          title="Mark current pomodoros"
          @click="ADD_POMODOROS_SPLIT"
        >
          <i class="fas fa-flag" />
        </button>
        <button
          class="btn-round"
          @click="resetPomodoros"
        >
          <i class="fas fa-sync-alt" />
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'PomodorosBar',
  data() {
    return {
      isTransition: true,
    };
  },
  computed: {
    ...mapState([
      'pomodorosTotal',
      'pomodorosSplits',
      'pomodorosGoal',
      'goalIndicatorFormat',
    ]),
    ratio() {
      return this.pomodorosTotal / this.pomodorosGoal;
    },
    progressBarStyle() {
      return {
        height: `${(this.ratio < 1 ? this.ratio : 1) * 100}%`,
        transition: this.isTransition ? 'all 0.3s' : 'none',
      };
    },
  },
  methods: {
    ...mapMutations([
      'SET_POMODOROS_TOTAL',
      'ADD_POMODOROS_SPLIT',
      'SET_POMODOROS_SPLITS',
    ]),
    splitStyle(split) {
      return {
        bottom: `${(split / this.pomodorosGoal) * 100}%`,
      };
    },
    splitDiff(split) {
      return split - Math.max(0, ...this.pomodorosSplits.filter((s) => s < split));
    },
    resetPomodoros() {
      this.SET_POMODOROS_TOTAL(0);
      this.SET_POMODOROS_SPLITS([]);
    },
  },
  directives: {
    draggable: {
      bind(el, binding, vnode) {
        let rootHeight;
        let curPomodoros;

        function mousemove(e) {
          if (e.buttons === 0) {
            document.removeEventListener('mousemove', mousemove);
            vnode.context.isTransition = true;
            return;
          }
          curPomodoros = Math.floor(((rootHeight - e.clientY) / rootHeight) * vnode.context.pomodorosGoal);
          if (curPomodoros !== vnode.context.pomodorosTotal) {
            if (curPomodoros < 0) {
              curPomodoros = 0;
            } else if (curPomodoros > vnode.context.pomodorosGoal) {
              curPomodoros = vnode.context.pomodorosGoal;
            }
            vnode.context.$store.commit('SET_POMODOROS_TOTAL', curPomodoros);
          }
          el.click(); // fixes bug in the chromium
        }

        el.addEventListener('mousedown', () => {
          rootHeight = document.querySelector('.root').offsetHeight;
          vnode.context.isTransition = false;
          document.addEventListener('mousemove', mousemove);
          return false;
        });
      },
    },
    draggableSplit: {
      bind(el, binding, vnode) {
        let rootHeight;
        let minSplit;
        let maxSplit;

        function mousemove(e) {
          if (e.buttons === 0) {
            document.removeEventListener('mousemove', mousemove);
            return;
          }
          let curSplit = Math.round(((rootHeight - e.clientY) / rootHeight) * vnode.context.pomodorosGoal);
          curSplit = Math.min(Math.max(curSplit, minSplit), maxSplit);
          if (curSplit !== vnode.context.pomodorosSplits[binding.value]) {
            vnode.context.$store.commit('SET_POMODOROS_SPLIT', { index: binding.value, value: curSplit });
          }
        }

        el.addEventListener('mousedown', () => {
          const { pomodorosGoal, pomodorosSplits } = vnode.context;
          const split = pomodorosSplits[binding.value];
          // the line can't pass over the neighbouring splits
          minSplit = Math.max(1, ...pomodorosSplits.filter((s) => s < split).map((s) => s + 1));
          maxSplit = Math.min(pomodorosGoal, ...pomodorosSplits.filter((s) => s > split).map((s) => s - 1));
          rootHeight = document.querySelector('.root').offsetHeight;
          document.addEventListener('mousemove', mousemove);
          return false;
        });
      },
    },
  },
};
</script>

<style scoped lang="sass">
.pomodoros-progress-bar
  position: fixed
  bottom: 0
  width: 100vw
  background-color: var(--light)

  .pomodoros-progress-bar__control-line
    position: absolute
    top: -2.5vh
    left: 0
    right: 0
    height: 3vh
    cursor: grab

    &:hover > .control-line__line
      background-color: var(--dark)

    .control-line__padding
      background-color: transparent
      height: 2vh
      width: 100%

    .control-line__line
      height: 1vh
      width: 100%
      background-color: var(--primary)

  .pomodoros-progress-bar__split
    position: fixed
    right: 0
    height: 2vh
    margin-bottom: -1vh
    cursor: grab

    &:hover > .split__tick
      background-color: var(--super-dark)

    .split__tick
      position: relative
      width: 3vh
      height: 1.5px
      background-color: var(--dark)

    .split__total
      position: absolute
      right: 0.5vh
      bottom: 0.5vh
      font-size: 1.5vh
      line-height: 1
      color: var(--dark)

    .split__label
      margin-left: 0.5vh
      margin-right: 0.5vh
      font-size: 2vh
      line-height: 1
      color: var(--dark)

  .pomodoros-progress-bar__buttons
    position: absolute
    bottom: 10px
    right: 10px
    z-index: 1000

</style>
