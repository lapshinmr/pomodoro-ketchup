<template>
  <div class="pomodoros-progress-bar" :style="progressBarHeight">
    <button
      v-if="pomodorosTotal"
      class="pomodoros-progress-bar__reset-button btn btn-link"
      @click="setPomodorosTotal(0)"
    >
      Reset
    </button>
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
    bottom: 0
    right: 0
    z-index: 1000
    font-size: 4vh
    color: var(--dark)
    &:hover
      color: var(--super-dark)

</style>
