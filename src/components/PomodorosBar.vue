<template>
  <div class="pomodoros-progress-bar" :style="progressBarHeight">
    <transition name="fade">
      <button
        v-if="pomodorosTotal"
        class="pomodoros-progress-bar__reset-button btn btn-success"
        @click="setPomodorosTotal(0)"
      >
        <i class="fas fa-sync-alt"></i>
      </button>
    </transition>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'pomodoros-bar',
  computed: {
    ...mapState([
      'pomodorosTotal',
      'pomodorosGoal',
      'goalIndicatorFormat'
    ]),
    ratio () {
      return this.pomodorosTotal / this.pomodorosGoal
    },
    progressBarHeight () {
      return {
        'height': (this.ratio < 1 ? this.ratio : 1) * 100 + '%'
      }
    }
  },
  methods: {
    ...mapActions([
      'setPomodorosTotal'
    ])
  }
}
</script>

<style scoped lang="sass">
.pomodoros-progress-bar
  position: fixed
  bottom: 0
  width: 100vw
  transition: 0.3s
  background-color: var(--light)

  .pomodoros-progress-bar__reset-button
    position: absolute
    bottom: 5px
    right: 5px
    z-index: 1000
    font-size: 4vh
    border-radius: 50%
    display: flex
    align-items: center
    justify-content: center
    padding: 0.75rem
    color: var(--super-light)

</style>
