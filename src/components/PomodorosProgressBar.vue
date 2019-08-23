<template>
  <div class="pomodoros-progress-bar" :style="progressBarHeight">
    <div class="pomodoros-buttons d-flex justify-content-around mb-2">
      <button class="btn btn-success btn-sm" @click="addPomodoro">
        Add
      </button>
      <button class="btn btn-success btn-sm ml-2" @click="removePomodoro">
        Remove
      </button>
      <button class="btn btn-success btn-sm ml-2" @click="setPomodorosTotal(0)">
        Reset
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'pomodoros-progress-bar',
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
      'addPomodoro',
      'removePomodoro',
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

  .pomodoros-buttons
    position: absolute
    bottom: 0
    right: 5px

</style>
