<template>
  <div>
    <div id="progressbar" :style="progressbar">
      <div id="indicator" class="d-flex justify-content-between" :style="indicatorPosition">
        {{ indicatorText }}
      </div>
    </div>
    <div id="pomodoros-buttons" class="d-flex justify-content-around">
      <button class="btn btn-link btn-lg" @click="increase">
        Add
      </button>
      <button class="btn btn-link btn-lg" @click="decrease">
        Remove
      </button>
      <button class="btn btn-link btn-lg" @click="reset">
        Reset
      </button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'pomodoros-counter',
    computed: {
      pomodoros() {
        return this.$store.state.pomodoros
      },
      pomodorosGoal() {
        return this.$store.state.pomodorosGoal
      },
      progressbar() {
        let ratio = this.pomodoros / this.pomodorosGoal;
        return {
            "height": (ratio < 1 ? ratio : 1) * 100  + '%',
        }
      },
      indicatorPosition() {
        let top;
        let ratio = this.pomodoros / this.pomodorosGoal;
        if (ratio < 0.6) {
            top = -25;
        } else {
            top = 5;
        }
        return {
            'top': top + 'px',
        }
      },
      indicatorText() {
          let text;
          let format = this.getGoalIndicatorFormat();
          console.log('format', format, typeof format)
          if (format === 0) {
              text = this.pomodoros + ' of ' + this.pomodorosGoal
          } else if (format === 1) {
              text = Math.round(this.pomodoros / this.pomodorosGoal * 100) + '%'
          } else {
              text = this.pomodoros + ' of ' + this.pomodorosGoal + ' (' + Math.round(this.pomodoros / this.pomodorosGoal * 100) + '%)'
          }
          return text
      }
    },
    methods: {
      ...mapGetters([
        'getGoalIndicatorFormat'
      ]),
      increase() {
        this.$store.dispatch('addPomodoro')
      },
      decrease() {
        this.$store.dispatch('removePomodoro')
      },
      reset() {
        this.$store.dispatch('setPomodoros', 0)
      }
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
