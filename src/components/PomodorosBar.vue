<template>
  <div
    class="pomodoros-progress-bar"
    :style="progressBarStyle"
  >
    <div
      v-draggable
      class="pomodoros-progress-bar__control-line"
    >
      <div class="control-line__padding" />
      <div class="control-line__line" />
      <div class="control-line__padding" />
    </div>
    <transition name="fade">
      <button
        v-if="pomodorosTotal"
        class="pomodoros-progress-bar__reset-button btn-round"
        @click="SET_POMODOROS_TOTAL(0)"
      >
        <i class="fas fa-sync-alt" />
      </button>
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
    ]),
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

  .pomodoros-progress-bar__reset-button
    position: absolute
    bottom: 10px
    right: 10px
    z-index: 1000

</style>
