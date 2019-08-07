<template>
  <div>
    <div id="progressbar" :style="progressBarHeight">
      <div id="indicator" class="d-flex justify-content-between" :style="indicatorPosition">
        {{ indicatorText }}
      </div>
    </div>
    <div id="pomodoros-buttons" class="d-flex justify-content-around mb-2">
      <button class="btn btn-outline-success btn-sm" @click="addPomodoro">
        Add
      </button>
      <button class="btn btn-outline-success btn-sm ml-2" @click="removePomodoro">
        Remove
      </button>
      <button class="btn btn-outline-success btn-sm ml-2" @click="setPomodorosTotal(0)">
        Reset
      </button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'pomodoros-counter',
    computed: {
      ...mapState([
        'pomodorosTotal',
        'pomodorosGoal',
        'goalIndicatorFormat'
      ]),
      ratio() {
        return this.pomodorosTotal / this.pomodorosGoal;
      },
      progressBarHeight() {
        return {
            "height": (this.ratio < 1 ? this.ratio : 1) * 100  + '%',
        }
      },
      indicatorPosition() {
        return {
            'top': (this.ratio < 0.6 ? -25 : 5) + 'px'
        }
      },
      indicatorText() {
          let formatFirst = this.pomodorosTotal + ' of ' + this.pomodorosGoal;
          let formatSecond = Math.round(this.ratio * 100) + '%';
          let result = `${formatFirst} (${formatSecond})`;
          if (this.goalIndicatorFormat === 0) {
              result = formatFirst
          } else if (this.goalIndicatorFormat === 1) {
              result = formatSecond
          }
          return result
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

  #progressbar
    position: fixed
    bottom: 0
    width: 100vw
    transition: 0.3s
    background-color: $light
    z-index: -1
    opacity: 0.75

  #indicator
    position: absolute
    color: $dark
    font-size: 20px
    line-height: 20px
    margin-left: 10px
    transition: 0.3s
    width: 100%

  #pomodoros-buttons
    position: absolute
    bottom: 0
    right: 5px

</style>
